export type LogLevelT = "DEBUG" | "WARN" | "ERROR";

export const logger = (level: LogLevelT, label: String, log: any) => {
  switch (level) {
    case "DEBUG":
      return console.log(label, JSON.stringify(log, null, 2));
    case "WARN":
      return console.warn(label, JSON.stringify(log, null, 2));
    case "ERROR":
      return console.error(label, JSON.stringify(log, null, 2));
  }
};
