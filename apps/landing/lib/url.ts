const URL_BACKEND = "https://127.0.0.1:7443";
//export const URL_BACKEND = "https://cuda.ai-generated.fr:7443";
// export const URL_AUTH = `${URL_BACKEND}/cookie`;
// export const URL_SSE = `${URL_BACKEND}/sse`;
// export const URL_PROCESS_TASK = `${URL_BACKEND}/api/command/process`;
// export const URL_KILL_TASK = `${URL_BACKEND}/api/command/kill`;
// export const URL_START_MODEL = `${URL_BACKEND}/api/command/spawn`;

export const url = {
  process: `${URL_BACKEND}/api/command/process`,
  kill: `${URL_BACKEND}/api/command/kill`,
  spawn: `${URL_BACKEND}/api/command/spawn`,
  sse: `${URL_BACKEND}/sse`,
  auth: `${URL_BACKEND}/`,
};
