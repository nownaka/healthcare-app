using './main.bicep'

// The resources are named as shown below.
// {resourceAbbreviation}-{appName}-{suffix}
// Check: https://learn.microsoft.com/ja-jp/azure/cloud-adoption-framework/ready/azure-best-practices/resource-naming

param appName = empty(readEnvironmentVariable('APP_NAME', '')) ? 'healthcare' : readEnvironmentVariable('appName', '')
param environment = empty(readEnvironmentVariable('APP_ENVIRONMENT', '')) ? null : readEnvironmentVariable('environment', '')
param suffix = empty(readEnvironmentVariable('SUFFIX', '')) ? null : readEnvironmentVariable('suffix', '')
