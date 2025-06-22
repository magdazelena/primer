# Status Manager Plugin Development Guide

## 🚀 Quick Start

### 1. Build the Plugin
```bash
npm run build
```

### 2. Test the Build
```bash
node test-build.js
```

### 3. Restart Strapi
```bash
# In your Strapi directory
npm run dev
```

### 4. Test Endpoints
```bash
node debug-plugin.js
```

## 🔧 Development Workflow

### For Admin Changes (Frontend)
```bash
npm run dev
```
- ✅ Hot reload enabled
- ✅ Changes appear immediately
- ✅ No Strapi restart needed

### For Server Changes (Backend)
```bash
# Terminal 1: Watch for server changes
npm run dev:server

# Terminal 2: Watch for admin changes  
npm run dev

# After making server changes:
# 1. Build completes automatically
# 2. Restart Strapi manually
```

### Using the Development Script
```bash
# Build once
./dev-workflow.sh build

# Watch mode (admin only)
./dev-workflow.sh watch

# Server watch mode
./dev-workflow.sh server-watch

# Full build and test
./dev-workflow.sh test
```

## 🐛 Debugging

### 1. Check Plugin Loading
Look for these logs in Strapi console:
```
🔌 ========================================
🔌 Status Manager Server Plugin Registration
🔌 Plugin ID: primer-status-manager
✅ Plugin registration successful
🔌 ========================================

🚀 ========================================
🚀 Status Manager Server Plugin Bootstrap
✅ Bootstrap phase completed
🚀 ========================================

🔧 ========================================
🔧 Status Manager Plugin: Loading server components...
✅ Server components loaded successfully
📦 Controllers: ['status']
📦 Services: ['status']
📦 Routes: { type: 'admin', routes: [...] }
🔧 ========================================
```

### 2. Check Controller Execution
When making API calls, look for:
```
🎯 ========================================
🎯 Status controller: find method called
🎯 Request URL: /admin/primer-status-manager/statuses
🎯 Request method: GET
🎯 Status controller: found statuses: [...]
🎯 ========================================
```

### 3. Test Routes
Use the debug script to test endpoints:
```bash
node debug-plugin.js
```

Expected output:
```
Testing: GET /admin/test-plugin
✅ Success: 200 - {"message":"Plugin is working!","timestamp":"..."}

Testing: GET /admin/primer-status-manager/statuses
✅ Success: 200 - [...]
```

## 📁 File Structure

```
src/
├── admin/                 # Frontend components (hot reload)
│   ├── components/
│   └── index.ts
├── server/               # Backend components (requires restart)
│   ├── controllers/
│   ├── services/
│   ├── routes/
│   ├── content-types/
│   └── index.ts
└── pluginId.ts           # Plugin identifier

dist/                     # Built files
├── admin/
│   ├── index.js
│   └── index.cjs
└── server/
    ├── index.js
    └── index.cjs
```

## 🔄 Build Process

### TypeScript Compilation
- Compiles `src/` to `dist/`
- Handles server-side code
- Generates `.js` and `.cjs` files

### Strapi Plugin Build
- Builds admin components
- Handles frontend bundling
- Overwrites some TypeScript output

### Final Result
- `dist/server/` - Backend code
- `dist/admin/` - Frontend code
- No main `index.js` needed (Strapi 5 uses exports)

## 🚨 Common Issues

### 1. No Controller Logs
**Problem**: Server changes not reflected
**Solution**: 
- Run `npm run build`
- Restart Strapi
- Check for build errors

### 2. 404/405 Errors
**Problem**: Routes not registered
**Solution**:
- Verify plugin is loaded (check logs)
- Check route paths match controller
- Ensure authentication is correct

### 3. HTML Instead of JSON
**Problem**: Route not found, falling back to admin panel
**Solution**:
- Check if plugin is properly registered
- Verify route paths
- Check Strapi console for errors

### 4. Build Errors
**Problem**: TypeScript compilation fails
**Solution**:
- Check `tsconfig.json` configuration
- Verify all imports are correct
- Check for syntax errors

## 🧪 Testing

### Manual Testing
1. Build plugin: `npm run build`
2. Restart Strapi
3. Test endpoints: `node debug-plugin.js`
4. Check admin panel functionality

### Automated Testing
```bash
# Test build
node test-build.js

# Test endpoints
node debug-plugin.js

# Full test workflow
./dev-workflow.sh test
```

## 📝 Logging

### Server-Side Logging
```javascript
// In controllers/services
console.log('🎯 Controller method called');
strapi.log.info('Plugin method called');
```

### Admin-Side Logging
```javascript
// In React components
console.log('Admin component rendered');
```

### Debug Routes
- `/admin/test-plugin` - Test if plugin is working
- `/admin/primer-status-manager/statuses` - Main status endpoint

## 🔧 Configuration

### Plugin Registration
```javascript
// apps/backend/config/plugins.ts
'primer-status-manager': {
  enabled: true,
}
```

### Route Configuration
```javascript
// src/server/routes/admin-api.ts
{
  method: 'GET',
  path: '/admin/primer-status-manager/statuses',
  handler: 'status.find',
  config: {
    auth: { type: 'admin' }
  }
}
```

## 🚀 Production

### Build for Production
```bash
npm run build
npm run prepublishOnly
```

### Deploy
1. Build the plugin
2. Copy `dist/` folder to production
3. Ensure plugin is registered in production Strapi
4. Restart production Strapi

## 📚 Resources

- [Strapi Plugin Development](https://docs.strapi.io/dev-docs/plugins-development)
- [Strapi Admin API](https://docs.strapi.io/dev-docs/admin-panel-api)
- [Strapi Server API](https://docs.strapi.io/dev-docs/api/rest) 