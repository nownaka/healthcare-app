using './main.bicep'

// The resources are named as shown below.
// {resourceAbbreviation}-{appName}-{suffix}
// Check: https://learn.microsoft.com/ja-jp/azure/cloud-adoption-framework/ready/azure-best-practices/resource-naming

param appName = empty(readEnvironmentVariable('APP_NAME', '')) ? 'healthcare' : readEnvironmentVariable('APP_NAME', '')
param environment = empty(readEnvironmentVariable('APP_ENVIRONMENT', '')) ? null : readEnvironmentVariable('APP_ENVIRONMENT', '')
param suffix = empty(readEnvironmentVariable('SUFFIX', '')) ? null : readEnvironmentVariable('SUFFIX', '')
