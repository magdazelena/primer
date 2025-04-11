# Backend development guide

## Testing

### Running Tests

The backend includes several test scripts:

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Structure

Tests are organized in the following structure:
```
apps/backend/
├── src/
│   ├── __tests__/
│   │   ├── unit/         # Unit tests
│   │   ├── integration/  # Integration tests
│   │   └── e2e/          # End-to-end tests
│   └── plugins/
│       └── plugin-name/
│           └── __tests__/ # Plugin-specific tests
```

### Writing Tests

1. **Unit Tests**
   - Test individual functions and components
   - Mock external dependencies
   - Focus on specific functionality

2. **Integration Tests**
   - Test interactions between components
   - Use test database
   - Verify data flow

3. **End-to-End Tests**
   - Test complete workflows
   - Use production-like environment
   - Verify user interactions

### Test Utilities

The project includes several test utilities:

```javascript
// Example test setup
import { setupStrapi } from './helpers/strapi';

describe('My Test Suite', () => {
  beforeAll(async () => {
    await setupStrapi();
  });

  it('should do something', async () => {
    // Test implementation
  });
});
```

## Mock Instance

### Overview

The mock instance is a lightweight version of Strapi used for testing and development. It provides:
- Simulated database
- Mocked services
- Test environment configuration

### Usage

1. **Starting Mock Instance**
   ```bash
   npm run strapi develop --watch-admin
   ```

2. **Configuration**
   ```javascript
   // config/test.js
   module.exports = {
     env: 'test',
     database: {
       client: 'sqlite',
       connection: {
         filename: '.tmp/test.db'
       }
     }
   };
   ```

3. **Mocking Services**
   ```javascript
   // Example service mock
   jest.mock('../../services/my-service', () => ({
     myFunction: jest.fn().mockResolvedValue({ success: true })
   }));
   ```

### Best Practices

1. **Environment Setup**
   - Use separate database for testing
   - Configure appropriate middleware
   - Set up test-specific plugins

2. **Data Management**
   - Use fixtures for test data
   - Clean up after tests
   - Maintain test data consistency

3. **Performance**
   - Mock expensive operations
   - Use in-memory database
   - Optimize test execution

4. **Maintenance**
   - Keep mocks up to date
   - Document mock behavior
   - Review mock coverage 