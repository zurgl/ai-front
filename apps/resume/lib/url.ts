const env = process.env.NEXT_PUBLIC_ENV;
export const PORT = env == "development" ? "7443" : "8080";

export const URL_BACKEND =
  env == "development"
    ? `https://localhost:${PORT}`
    : `https://www.ai-generated.fr:${PORT}`;

export const URL_AUTH = `${URL_BACKEND}/cookie`;
export const URL_SSE = `${URL_BACKEND}/sse`;
export const URL_PROCESS_TASK = `${URL_BACKEND}/api/command/process`;
export const URL_KILL_TASK = `${URL_BACKEND}/api/command/kill`;
export const URL_START_MODEL = `${URL_BACKEND}/api/command/spawn`;
