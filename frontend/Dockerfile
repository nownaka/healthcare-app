# Image
FROM node:18-alpine AS base


# Deps
FROM base AS deps

# ディレクトリ変更
WORKDIR /app

# パッケージインストール
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi


# Build
FROM base AS builder

# ツールインストール
RUN \
  apk --no-cache add \
  bash \
  curl

# ディレクトリ変更
WORKDIR /app

# deps の node_modules をコピー
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# ビルド
RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# 公開ポート
EXPOSE 3000

# 起動コマンド
CMD ["npm", "run", "start"]