#!/usr/bin/env node

// Test script to demonstrate debugging functionality
// Run with: NODE_ENV=development DEBUG=true node test-debug.js

console.log('Testing Status Manager Plugin Debug Tools...\n');

// Simulate the debug utilities
const isDevelopment = process.env.NODE_ENV === 'development';
const isDebug = process.env.DEBUG === 'true' || isDevelopment;


class DebugLogger {
  private context: string;
  private options: any;

  constructor(context: string, options:any = {}
  ) {
    this.context = context;
    this.options = {
      showTimestamp: true,
      showLocation: true,
      showStack: false,
      level: 'log',
      ...options,
    };
  }

  private formatMessage(message, data) {
    const parts: any[] = [];
    
    if (this.options.showTimestamp) {
      parts.push(`[${new Date().toISOString()}]`);
    }
    
    parts.push(`[${this.context}]`);
    parts.push(message);
    
    return parts.join(' ');
  }

  private getLocation() {
    if (!this.options.showLocation) return '';
    
    try {
      const stack = new Error().stack;
      if (stack) {
        const lines = stack.split('\n');
        const callerLine = lines.find(line => 
          line.includes('at ') && 
          !line.includes('test-debug.js') && 
          !line.includes('DebugLogger')
        );
        if (callerLine) {
          return ` at ${callerLine.trim()}`;
        }
      }
    } catch (e) {
      // Ignore errors in location detection
    }
    
    return '';
  }

  log(message, data = {}) {
    if (!isDebug) return;
    
    const formattedMessage = this.formatMessage(message, data);
    const location = this.getLocation();
    
    console.log(formattedMessage + location);
    if (data !== undefined) {
      console.log('Data:', data);
    }
  }

  performance(label, fn) {
    if (!isDebug) return fn();
    
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    
    this.log(`Performance [${label}]: ${(end - start).toFixed(2)}ms`);
    return result;
  }

  async performanceAsync(label, fn) {
    if (!isDebug) return fn();
    
    const start = performance.now();
    const result = await fn();
    const end = performance.now();
    
    this.log(`Performance [${label}]: ${(end - start).toFixed(2)}ms`);
    return result;
  }
}

// Test the debugging functionality
const logger = new DebugLogger('TestRunner');

logger.log('Starting debug test');

// Test performance measurement
const result = logger.performance('Test Function', () => {
  // Simulate some work
  let sum = 0;
  for (let i = 0; i < 1000000; i++) {
    sum += i;
  }
  return sum;
});

logger.log('Performance test result', { result: result > 0 ? 'Success' : 'Failed' });

// Test async performance measurement
logger.performanceAsync('Async Test', async () => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return 'Async operation completed';
}).then(() => {
  logger.log('All tests completed');
});

console.log('\nDebug test completed. Check the logs above for debugging information.');
console.log('To see more detailed logs, run with: NODE_ENV=development DEBUG=true node test-debug.js');
