const checkEnvValue = (envName: string): string => {
  const value = process.env[envName];
  if (!value) {
    console.error(`環境変数 ${envName} が正しく設定されていません。`);
    process.exit();
  }
  return value as string;
};

const backendAPIhostName =
  process.env.REACT_APP_BACKEND_API_HOST_NAME || "localhost";
const backendAPIPort = process.env.REACT_APP_BACKEND_API_PORT || "8000";
const backendAPIBaseUrl = `http://${backendAPIhostName}:${backendAPIPort}`;

export const config = {
  backendAPIhostName,
  backendAPIPort,
  backendAPIBaseUrl,
};
