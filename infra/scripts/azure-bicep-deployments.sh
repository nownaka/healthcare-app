# Azure Login
az login --service-principal \
    -u $AZURE_CLIENT_ID \
    -p $AZURE_CLIENT_SECRET \
    --tenant $AZURE_TENANT_ID

# Deploy
az deployment group create \
    --name Deploy-${APP_NAME}_$(date +'%Y%m%d%H%M%S') \
    --resource-group ${AZURE_RESOURCE_GROUP_NAME} \
    --template-file main.bicep \
    --parameters main.local.bicepparam