using './main.bicep'

// The resources are named as shown below.
// {resourceAbbreviation}-{appName}-{suffix}
// Check: https://learn.microsoft.com/ja-jp/azure/cloud-adoption-framework/ready/azure-best-practices/resource-naming

param appName = empty(readEnvironmentVariable('APP_NAME', '')) ? 'healthcare' : readEnvironmentVariable('APP_NAME', '')
param environment = empty(readEnvironmentVariable('APP_ENVIRONMENT', '')) ? null : readEnvironmentVariable('APP_ENVIRONMENT', '')
param suffix = empty(readEnvironmentVariable('SUFFIX', '')) ? null : readEnvironmentVariable('SUFFIX', '')

param containersEnvironmentVar = [
  // Frontend
  []
  // Backend
  [
    {
      name: 'DJANGO_SECRET_KEY'
      value: readEnvironmentVariable('DJANGO_SECRET_KEY', '')
    }
    {
      name: 'DJANGO_ALLOWED_HOSTS'
      value: readEnvironmentVariable('DJANGO_ALLOWED_HOSTS', '')
    }
    {
      name: 'DJANGO_CSRF_TRUSTED_ORIGINS'
      value: readEnvironmentVariable('DJANGO_CSRF_TRUSTED_ORIGINS', '')
    }
    {
      name: 'DJANGO_SUPERUSER_USERNAME'
      value: readEnvironmentVariable('DJANGO_SUPERUSER_USERNAME', '')
    }
    {
      name: 'DJANGO_SUPERUSER_PASSWORD'
      value: readEnvironmentVariable('DJANGO_SUPERUSER_PASSWORD', '')
    }
    {
      name: 'DJANGO_SUPERUSER_EMAIL'
      value: readEnvironmentVariable('DJANGO_SUPERUSER_EMAIL', '')
    }
    {
      name: 'TRUSTED_ORIGINS'
      value: readEnvironmentVariable('TRUSTED_ORIGINS', '')
    }
    {
      name: 'POSTGRES_VERSION'
      value: readEnvironmentVariable('POSTGRES_VERSION', '')
    }
    {
      name: 'POSTGRES_USER'
      value: readEnvironmentVariable('POSTGRES_USER', '')
    }
    {
      name: 'POSTGRES_PASSWORD'
      value: readEnvironmentVariable('POSTGRES_PASSWORD', '')
    }
    {
      name: 'POSTGRES_HOST'
      value: readEnvironmentVariable('POSTGRES_HOST', '')
    }
    {
      name: 'CONTAINER_NAME'
      value: readEnvironmentVariable('CONTAINER_NAME', '')
    }
  ]
  // Database
  [
    {
      name: 'POSTGRES_USER'
      value: readEnvironmentVariable('POSTGRES_USER', '')
    }
    {
      name: 'POSTGRES_PASSWORD'
      value: readEnvironmentVariable('POSTGRES_PASSWORD', '')
    }
  ]
]
