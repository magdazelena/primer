# Debugging Guide for Status Manager Plugin

This guide explains how to debug the Status Manager Plugin with full access to source code, logs, and debugging tools.

## Quick Start

### 1. Development Mode
```bash
# Build in development mode (preserves debugging info)
npm run build:dev

# Watch mode with development config
npm run dev

# Debug mode with environment variables
npm run debug
```

### 2. Environment Variables
```bash
# Enable debugging
export NODE_ENV=development
export DEBUG=true

# Or set them when running commands
NODE_ENV=development DEBUG=true npm run dev
```

## Debugging Features

### Source Maps
- **Development builds** include full source maps
- **Original TypeScript locations** are preserved in stack traces
- **VS Code debugging** works with original source files

### Enhanced Logging
The plugin includes a comprehensive logging system:

```typescript
import { defaultLogger, debugLog, debugPerformance } from './utils/debug';

// Use the default logger
defaultLogger.log('Plugin initialized', { version: '1.0.0' });

// Quick debug logging
debugLog('MyComponent', 'Component rendered', { props });

// Performance debugging
const result = debugPerformance('Database Query', () => {
  return database.query('SELECT * FROM users');
});

// Async performance debugging
const result = await debugPerformanceAsync('API Call', async () => {
  return await fetch('/api/users');
});
```

### Logger Options
```typescript
import { DebugLogger } from './utils/debug';

const logger = new DebugLogger('CustomContext', {
  showTimestamp: true,    // Show timestamps
  showLocation: true,     // Show source location
  showStack: false,       // Show stack traces
  level: 'log'            // Log level
});
```

## VS Code Debugging

### 1. Launch Configuration
Use the provided `.vscode/launch.json` configurations:

- **Debug Status Manager Plugin (Server)**: Launch and debug the server-side code
- **Debug Status Manager Plugin (Attach)**: Attach to a running Node.js process
- **Debug Status Manager Plugin (Admin)**: Debug the admin panel frontend

### 2. Setting Breakpoints
1. Open your TypeScript source files
2. Set breakpoints in the original code
3. Use `npm run debug` to build with source maps
4. Start debugging with VS Code

### 3. Debug Console
- View variables and expressions
- Execute code in the debug context
- See call stack with original source locations

## Node.js Inspector

### 1. Start with Inspector
```bash
# Start Node.js with inspector enabled
node --inspect --require ./dist/server/index.js your-strapi-app.js

# Break on first line
node --inspect-brk --require ./dist/server/index.js your-strapi-app.js
```

### 2. Connect Debugger
- Open Chrome DevTools
- Navigate to `chrome://inspect`
- Click "Open dedicated DevTools for Node"
- Set breakpoints in your TypeScript source

## Rollup Configuration Differences

### Development vs Production

| Feature | Development | Production |
|---------|-------------|------------|
| Source Maps | Full source maps | Basic source maps |
| Tree Shaking | Disabled | Enabled |
| Minification | Disabled | Enabled |
| Class Names | Preserved | May be mangled |
| Function Names | Preserved | May be mangled |
| Variable Names | Preserved | May be mangled |

### Development Config Features
- `treeshake: false` - Keeps all code for debugging
- `keepClassNames: true` - Preserves class names
- `keepFunctionNames: true` - Preserves function names
- `keepVariableNames: true` - Preserves variable names
- `sourcemapExcludeSources: false` - Includes source content

## Troubleshooting

### Source Maps Not Working
1. Ensure you're using `npm run build:dev` or `npm run dev`
2. Check that `sourcemap: true` is set in Rollup output
3. Verify `sourcemapExcludeSources: false` is set
4. Clear browser/Node.js cache

### Breakpoints Not Hitting
1. Verify source maps are generated correctly
2. Check that the correct build is running
3. Ensure VS Code is using the right configuration
4. Restart the debugging session

### Performance Issues
1. Use `debugPerformance` for timing measurements
2. Monitor build times with `npm run build:dev`
3. Check Rollup watch mode performance
4. Consider using `--inspect` for Node.js profiling

## Best Practices

### 1. Development Workflow
```bash
# Start development mode
npm run dev

# In another terminal, start your Strapi app
cd ../../apps/backend
npm run develop
```

### 2. Debugging Strategy
1. Use `debugLog` for quick debugging
2. Use `DebugLogger` for structured logging
3. Use `debugPerformance` for performance issues
4. Set breakpoints in VS Code for complex debugging

### 3. Environment Management
```bash
# Create a .env.development file
NODE_ENV=development
DEBUG=true
STRAPI_LOG_LEVEL=debug
```

### 4. Source Control
- Commit `rollup.config.dev.mjs`
- Commit `.vscode/launch.json`
- Don't commit development builds (`dist/`)

## Advanced Debugging

### Custom Rollup Plugins
You can add custom Rollup plugins for additional debugging:

```javascript
// rollup.config.dev.mjs
import sourcemaps from 'rollup-plugin-sourcemaps';

const basePlugins = () => [
  // ... existing plugins
  sourcemaps(), // Better source map handling
];
```

### Conditional Compilation
```typescript
// Use environment variables for conditional compilation
if (process.env.NODE_ENV === 'development') {
  console.log('Development mode enabled');
  // Development-specific code
}
```

### Hot Reloading
For even faster development, consider adding hot reloading:

```bash
npm install --save-dev rollup-plugin-livereload
```

This setup gives you full debugging capabilities while maintaining the benefits of Rollup bundling. You can now debug your original TypeScript code, see detailed logs, and use all standard debugging tools.
