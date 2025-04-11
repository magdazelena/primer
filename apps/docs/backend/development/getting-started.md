# Getting Started with Backend Development

This guide will help you set up and start developing with the Strapi backend.

## Prerequisites

- Node.js >= 20.0.0
- npm >= 10.8.2
- PostgreSQL >= 14

## Environment Setup

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd primer
   ```

2. **Install Dependencies**
   ```bash
   npm run install
   ```

3. **Environment Configuration**
   Create a `.env` file in the `apps/backend` directory:
   ```env
   HOST=localhost
   PORT=1337
   APP_KEYS="toBeModified1,toBeModified2"
   API_TOKEN_SALT=tobemodified
   ADMIN_JWT_SECRET=tobemodified
   JWT_SECRET=tobemodified
   TRANSFER_TOKEN_SALT=tobemodified
   DATABASE_CLIENT=postgres
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_NAME=strapi
   DATABASE_USERNAME=postgres
   DATABASE_PASSWORD=postgres
   ```

## Development Workflow

### Starting the Development Server

```bash
# From the root directory
npm run dev

# Or specifically for backend
npm run backend
```

### Creating New Content Types

1. **Using the Admin Panel**
   - Navigate to Content-Type Builder
   - Click "Create new collection type"
   - Define fields and relationships
   - Save the content type

2. **Using the CLI**
   ```bash
   npm run strapi generate:api article
   ```

### Creating Custom Controllers

1. **Generate Controller**
   ```bash
   npm run strapi generate:controller article
   ```

2. **Implement Controller Logic**
   ```javascript
   // src/api/article/controllers/article.js
   'use strict';

   module.exports = {
     async find(ctx) {
       const { query } = ctx;
       const entity = await strapi.service('api::article.article').find(query);
       return entity;
     },
     
     async findOne(ctx) {
       const { id } = ctx.params;
       const { query } = ctx;
       const entity = await strapi.service('api::article.article').findOne(id, query);
       return entity;
     },
   };
   ```

### Creating Custom Services

1. **Generate Service**
   ```bash
   npm run strapi generate:service article
   ```

2. **Implement Service Logic**
   ```javascript
   // src/api/article/services/article.js
   'use strict';

   module.exports = {
     async find(query) {
       return strapi.entityService.findMany('api::article.article', query);
     },
     
     async findOne(id, query) {
       return strapi.entityService.findOne('api::article.article', id, query);
     },
   };
   ```

### Creating Custom Middleware

1. **Create Middleware File**
   ```javascript
   // src/middlewares/custom-middleware.js
   module.exports = (config, { strapi }) => {
     return async (ctx, next) => {
       // Middleware logic
       await next();
     };
   };
   ```

2. **Register Middleware**
   ```javascript
   // config/middlewares.js
   module.exports = [
     'strapi::errors',
     {
       name: 'custom-middleware',
       config: {
         // Middleware configuration
       },
     },
     'strapi::security',
     // ... other middlewares
   ];
   ```

## Testing

### Running Tests

```bash
# Run all tests
npm run test

# Run specific test file
npm run test src/api/article/controllers/article.test.js

# Run tests in watch mode
npm run test:watch
```

### Writing Tests

```javascript
// src/api/article/controllers/article.test.js
'use strict';

const { createTestApp } = require('@strapi/test-utils');

describe('Article Controller', () => {
  let app;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await app.destroy();
  });

  test('should return articles', async () => {
    const response = await app.request('/api/articles');
    expect(response.status).toBe(200);
  });
});
```

## Debugging

### Using VS Code

1. **Configure Launch Settings**
   ```json
   {
     "version": "0.2.0",
     "configurations": [
       {
         "type": "node",
         "request": "launch",
         "name": "Debug Strapi",
         "program": "${workspaceFolder}/apps/backend/node_modules/.bin/strapi",
         "args": ["develop"],
         "env": {
           "NODE_ENV": "development"
         }
       }
     ]
   }
   ```

2. **Set Breakpoints**
   - Open the file you want to debug
   - Click the left margin to set breakpoints
   - Start debugging with F5

## Best Practices

1. **Code Organization**
   - Follow the established directory structure
   - Keep related files together
   - Use clear, descriptive names

2. **Error Handling**
   - Use try-catch blocks
   - Implement proper error responses
   - Log errors appropriately

3. **Performance**
   - Optimize database queries
   - Use caching where appropriate
   - Implement proper indexing

4. **Security**
   - Validate user input
   - Implement proper authentication
   - Use environment variables for sensitive data

## Troubleshooting

### Common Issues

1. **Database Connection**
   - Check database credentials
   - Verify database is running
   - Check network connectivity

2. **API Errors**
   - Check request format
   - Verify authentication
   - Check server logs

3. **Build Errors**
   - Clear node_modules
   - Check dependency versions
   - Verify TypeScript configuration

### Getting Help

- Check the [Strapi Documentation](https://docs.strapi.io)
- Review the [Strapi GitHub Issues](https://github.com/strapi/strapi/issues)
- Open an issue in the repository 