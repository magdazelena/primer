import { isDebug } from "./config/dev";

export interface DebugOptions {
  showTimestamp?: boolean;
  showLocation?: boolean;
  showStack?: boolean;
  level?: "log" | "warn" | "error" | "debug";
}

export class DebugLogger {
  private context: string;
  private options: DebugOptions;

  constructor(context: string, options: DebugOptions = {}) {
    this.context = context;
    this.options = {
      showTimestamp: true,
      showLocation: true,
      showStack: false,
      level: "log",
      ...options,
    };
  }

  private formatMessage(message: string, data: any = {}): string {
    const parts: string[] = [];

    if (this.options.showTimestamp) {
      parts.push(`[${new Date().toISOString()}]`);
    }

    parts.push(`[${this.context}]`);
    parts.push(message);

    if (data.length > 0) {
      parts.push(" Data: ");
      parts.push(JSON.stringify(data));
    }

    return parts.join(" ");
  }

  private getLocation(): string {
    if (!this.options.showLocation) return "";

    try {
      const stack = new Error().stack;
      if (stack) {
        const lines = stack.split("\n");
        // Find the first line that's not from this debug utility
        const callerLine = lines.find(
          (line) =>
            line.includes("at ") &&
            !line.includes("debug.ts") &&
            !line.includes("DebugLogger"),
        );
        if (callerLine) {
          return ` at ${callerLine.trim()}`;
        }
      }
    } catch (e) {
      // Ignore errors in location detection
    }

    return "";
  }

  log(message: string, data?: any): void {
    if (!isDebug) return;

    const formattedMessage = this.formatMessage(message);
    const location = this.getLocation();

    console.log(formattedMessage + location);
    if (data !== undefined) {
      console.log("Data:", data);
    }

    if (this.options.showStack) {
      console.trace("Stack trace:");
    }
  }

  warn(message: string, data?: any): void {
    if (!isDebug) return;

    const formattedMessage = this.formatMessage(message);
    const location = this.getLocation();

    console.warn(formattedMessage + location);
    if (data !== undefined) {
      console.warn("Data:", data);
    }
  }

  error(message: string, error?: any): void {
    if (!isDebug) return;

    const formattedMessage = this.formatMessage(message, error);
    const location = this.getLocation();

    console.error(formattedMessage + location);
    if (error) {
      console.error("Error details:", error);
      if (error.stack) {
        console.error("Error stack:", error.stack);
      }
    }
  }

  debug(message: string, data?: any): void {
    if (!isDebug) return;

    const formattedMessage = this.formatMessage(message, data);
    const location = this.getLocation();

    console.debug(formattedMessage + location);
    if (data !== undefined) {
      console.debug("Data:", data);
    }
  }

  performance(label: string, fn: () => any): any {
    if (!isDebug) return fn();

    const start = performance.now();
    const result = fn();
    const end = performance.now();

    this.log(`Performance [${label}]: ${(end - start).toFixed(2)}ms`);
    return result;
  }

  async performanceAsync(label: string, fn: () => Promise<any>): Promise<any> {
    if (!isDebug) return fn();

    const start = performance.now();
    const result = await fn();
    const end = performance.now();

    this.log(`Performance [${label}]: ${(end - start).toFixed(2)}ms`);
    return result;
  }
}

// Convenience function for quick debugging
export function debugLog(context: string, message: string, data?: any): void {
  if (!isDebug) return;

  const logger = new DebugLogger(context);
  logger.log(message, data);
}

// Convenience function for performance debugging
export function debugPerformance<T>(label: string, fn: () => T): T {
  const logger = new DebugLogger("Performance");
  return logger.performance(label, fn);
}

// Convenience function for async performance debugging
export function debugPerformanceAsync<T>(
  label: string,
  fn: () => Promise<T>,
): Promise<T> {
  const logger = new DebugLogger("Performance");
  return logger.performanceAsync(label, fn);
}

// Export a default logger instance
export const defaultLogger = new DebugLogger("StatusManager");
