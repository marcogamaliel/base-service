export interface Logger {
  error: LeveledLogMethod
  warn: LeveledLogMethod
  info: LeveledLogMethod
  verbose: LeveledLogMethod
  debug: LeveledLogMethod
  silly: LeveledLogMethod
}

interface LeveledLogMethod {
  (message: string, callback: LogCallback): Logger;
  (message: string, meta: any, callback: LogCallback): Logger;
  (message: string, ...meta: any[]): Logger;
  (message: any): Logger;
  (infoObject: object): Logger;
}

type LogCallback = (
  error?: any,
  level?: string,
  message?: string,
  meta?: any
) => void;