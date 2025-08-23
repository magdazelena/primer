export const devConfig = {
  debug: true,
  logLevel: "verbose",
  enableSourceMaps: true,
  preserveStackTraces: true,
  enableConsoleLogs: true,
  enablePerformanceLogs: true,
};

export const isDevelopment = process.env.NODE_ENV === "development";
export const isDebug = process.env.DEBUG === "true" || isDevelopment;
