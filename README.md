# healthcare-app-infra

なんかつくろうの会で制作中の健康管理アプリのインフラを構築するリポジトリ

## To-Do

1. リポジトリのフォーク
2. リソースグループ作成
3. アプリの登録とサービスプリンシパルの作成
4. ロールの割り当て
5. フェデレーション資格情報の設定
6. GitHub にシークレットを登録

## 手順

コマンドは Azure CloudShell または、Azure CLI がインストールされた PC で実行すす。

### 1. リポジトリのフォーク

下記手順に従って本リポジトリをフォークする。

[リポジトリをフォークする](https://docs.github.com/ja/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo)

### 2. リソースグループ作成

```bash
# リソースグループ名
resourceGroupName='{your resource group name}'
# リソースグループのリージョン
location='{your resource group location}'

# Azure ログイン
az login

# リソースグループの作成
resourceGroupId=$(az group create --location $location --name $resourceGroupName --query id --output tsv)

```

### 3. アプリの登録とサービスプリンシパルの作成

下記ロールが付与されたアカウントで作業する。

- Entra ロール: **アプリケーション管理者**

```bash
# アプリの名前
appName='{your app name for gihub action}'

# アプリの登録
appId=$(az ad app create --display-name $appName --query appId --output tsv)

# サービスプリンシパルの作成
spObjectId=$(az ad sp create --id $appId --query id --output tsv)

```

### 4. ロールの割り当て

下記ロールが付与されたアカウントで作業する。

- Azure ロール: 1.で作成したリソースグループスコープでの**所有者**もしくは**ユーザーアクセス管理者**

サービスプリンシパルには、**共同作成者**を割り当てる。

```bash
# ロール：
roleNameOrId=b24988ac-6180-42a0-ab88-20f7382dd24c
# スコープ：作成したリソースグループ
scope=$resourceGroupId
# 割り当て先：作成したサービスプリンシパル
assignee=$spObjectId

# ロール割り当て
az role assignment create --role $roleNameOrId --assignee $assignee --scope $scope

```

### 5. フェデレーション資格情報の設定

```bash
# GitHubアカウント名
githubAccountName='{your github account name}'
# リポジトリ名
githubRepositoryName='{your fork destination repository name}'
# フェデレーション資格情報を設定する対象
id=$appId

# フェデレーション資格情報の定義
federation='{
    "name": "github_federation_for_{githubRepositoryName}",
    "issuer": "<https://token.actions.githubusercontent.com>",
    "subject": "repo:{githubAccountName}/{githubRepositoryName}:ref:refs/heads/main",
    "audiences": ["api://AzureADTokenExchange"]
}'
federation=${federation//'{githubAccountName}'/$githubAccountName}
federation=${federation//'{githubRepositoryName}'/$githubRepositoryName}

# フェデレーション資格情報の設定
az ad app federated-credential create --id $id --parameters $federation

```

### 6. GitHub にシークレットを登録

下記を GitHub リポジトリのシークレットとして登録する。

| No  | シークレット              | 説明                                     |
| --- | ------------------------- | ---------------------------------------- |
| 1   | AZURE_TENANT_ID           | Entra ID のテナント GUID                 |
| 2   | AZURE_SUBSCRIPTION_ID     | Azure サブスクリプション ID              |
| 3   | AZURE_CLIENT_ID           | クライアント ID。アプリ登録の際に生成。  |
| 4   | AZURE_RESOURCE_GROUP_NAME | リソースをデプロイするリソースグループ名 |

各値は下記コマンドで取得する。

```bash
# AZURE_TENANT_ID
az account show --query tenantId -o tsv
# AZURE_SUBSCRIPTION_ID
az account show --query id -o tsv
# AZURE_CLIENT_ID
echo $appId
# AZURE_RESOURCE_GROUP_NAME(この手順で新しく作成した場合)
echo $resourceGroupName

```
