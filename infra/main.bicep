//
// Bicep template to create Container Apps on Azure.
// Created by nownaka.
//

// --------------------------------------------------------------------------------
// Params
// --------------------------------------------------------------------------------
@description('Deployment time.')
param timestamp string = utcNow('yyyyMMdd-HHmmss')

@description('Resource deployment region.')
param location string = resourceGroup().location

@description('Application name.')
param appName string
@description('Environment name.')
param environment string?
param suffix string?
@description('Base name of the resource. Used if there is no specification for each resource name.')
param resourceBaseName string = join(split(join(concat([appName], empty(environment) ? [] : [environment], empty(suffix) ? [timestamp] : [suffix]), '-'), '-'), '-')

@description('Resource name of Log Analytics Workspace.')
param workspaceName string = 'log-${resourceBaseName}'
@description('Resource name of Azure Container Registry.')
param registryName string = 'cr${replace(resourceBaseName, '-', '')}'
@description('Resource name of Azure Container Apps Environment.')
param containerAppsEnvironmentName string = 'cae-${resourceBaseName}'
@description('Resource name of User Assigned Managed Identity.')
param userAssignedIdentityName string = 'id-${resourceBaseName}'
@description('Resource name of Azure Container Apps.')
param containerAppNames string[] = [
  join(split(join(concat(['ca', appName, 'front'], empty(environment) ? [] : [environment], empty(suffix) ? [timestamp] : [suffix]), '-'), '-'), '-')
  join(split(join(concat(['ca', appName, 'back'], empty(environment) ? [] : [environment], empty(suffix) ? [timestamp] : [suffix]), '-'), '-'), '-')
  join(split(join(concat(['ca', appName, 'db'], empty(environment) ? [] : [environment], empty(suffix) ? [timestamp] : [suffix]), '-'), '-'), '-')

]

@description('Role definition to assign.')
param roleDefinitions { name: string, id: string }[] = [
  {
    name: 'AcrPull'
    id: '7f951dda-4ed3-4680-a7ca-43fe172d538d'
  }
  {
    name: 'AcrPush'
    id: '8311e382-0749-4cb8-b61a-304f252e45ec'
  }
  {
    name: 'ContainerAppsContributor'
    id: '358470bc-b998-42bd-ab17-a7e34c199c0f'
  }
]

// --------------------------------------------------------------------------------
// Resources
// --------------------------------------------------------------------------------

/* Log Analytics Workspace */
@description('Log Analytics Workspace')
module logAnalyticsworkspace './modules/workspaces.bicep' = {
  name: 'Deploy-LogAnalyticsWorkspace'
  params: {
    workspaceLocation: location
    workspaceName: workspaceName
  }
}

/* Azure Container Registry */
@description('Azure Container Registry')
module containerRegistry './modules/registries.bicep' = {
  name: 'Deploy-ContainerRegistry'
  params: {
    registryLocation: location
    registryName: registryName
  }
}

/* Azure Container Apps Environment */
@description('Azure Container Apps Environment')
module containerAppsEnvironment './modules/environment.bicep' = {
  name: 'Deploy-ContainerAppsEnvironment'
  params: {
    environmentLocation: location
    environmentName: containerAppsEnvironmentName
    workspaceName: logAnalyticsworkspace.outputs.workspaceName
  }
}

/* User Assigned Managed Identity */
@description('User Assigned Managed Identity')
module userAssignedIdentity './modules/userAssignedIdentities.bicep' = {
  name: 'Deploy-UserAssignedIdentity'
  params: {
    userAssignedIdentityName: userAssignedIdentityName
    userAssignedIdentityLocation: location
  }
}

/* Role Assignment */
@description('Role Assignment')
module roleAssignment_containerRegistry './modules/roleAssignmentsFromArm.bicep' = [ for (roleDefinition , index) in roleDefinitions: if( index <= 1){
  name: 'RoleAssignment-${roleDefinition.name}'
  params: {
    roleName: roleDefinition.name
    roleDefinitionId: roleDefinition.id
    principalId: userAssignedIdentity.outputs.principalId
    resourceId: containerRegistry.outputs.resourceId
  }
}]

module roleAssignment_containerApp './modules/roleAssignments.bicep' = {
  name: 'RoleAssignment-${roleDefinitions[2].name}'
  params: {
    roleDefinitionId: roleDefinitions[2].id
    principalId: userAssignedIdentity.outputs.principalId
  }
  scope: resourceGroup()
}

/* Azure Container Apps */
var _managedIdentity = {
  type: 'UserAssigned'
  userAssignedIdentities: { '${userAssignedIdentity.outputs.resourceId}' : {}}
}
var _registryServer = containerRegistry.outputs.loginServer
var _registries = [
  {
    identity: userAssignedIdentity.outputs.resourceId
    server: _registryServer
}]
var _ingress = [
  {
    // frontend
    external: true
    targetPort: 3000
  }
  {
    // backend
    external: true
    targetPort: 8000
  }
  {
    // backend
    external: false
    targetPort: 5432
    transport: 'Tcp'
  }
]
var _containerAppsConfigs = [for (name, index) in containerAppNames: {
  name: name
  template: {
    containers: [
      {
        name: name
        image: 'mcr.microsoft.com/k8se/quickstart:latest'  
        command: []
        args: []
        resources: {
            cpu: '0.25'
            memory: '.5Gi'
        }
      }
    ]
    scale: {
      minReplicas: 1
    }
  }
  ingress: _ingress[index]
}]

@description('Azure Container App')
module containerApps './modules/containerapps.bicep' = [for (config, index) in _containerAppsConfigs: {
  name: 'Deploy-ContainerApp-${guid(resourceGroup().id, config.name)}'
  params: {
    containerAppLocation: location
    containerAppName: config.name
    environmentId: containerAppsEnvironment.outputs.resourceId
    registryServer: _registryServer
    managedIdentity: _managedIdentity
    template: config.template
    registries: _registries
    ingress: config.ingress
  }
}]

// --------------------------------------------------------------------------------
// Outputs
// --------------------------------------------------------------------------------
@description('Deployment time.')
output TIMESTAMP string = timestamp

@description('The Client App Id of User Assigned Managed Identity.')
output AZURE_CLIENT_ID string = userAssignedIdentity.outputs.clientId
@description('The Tenant Id.')
output AZURE_TENANT_ID string = tenant().tenantId
@description('The Subscription Id.')
output AZURE_SUBSCRIPTION_ID string = subscription().subscriptionId
@description('The Resouce Group name.')
output AZURE_RESOURCE_GROUP_NAME string = resourceGroup().name
@description('Domain name of Azure Container Registry.')
output AZURE_CONTAINER_REGISTRY_NAME string = containerRegistry.outputs.name
@description('Resource names of Azure Container App.')
output AZURE_CONTAINER_APP_NAME string[] = [for (name, index) in containerAppNames: containerApps[index].outputs.name]
