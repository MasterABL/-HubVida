// URL do Worker proxy — nunca expõe a API key real
export const HUBBOT_PROXY_URL = import.meta.env.VITE_HUBBOT_PROXY_URL
  || 'https://hubbot-proxy.abimaelbalbino12.workers.dev';
