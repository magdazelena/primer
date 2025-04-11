# Status Manager Plugin

## Overview

The Status Manager plugin provides a centralized system for managing and tracking the status of various entities within the application. It offers a flexible and extensible way to define, update, and query status information.

## Installation

The plugin is already included in the backend. To enable it, ensure it's properly configured in your Strapi application.

## Configuration

The plugin can be configured through environment variables or the Strapi admin panel. Key configuration options include:

```javascript
// config/plugins.js
module.exports = {
  'status-manager': {
    enabled: true,
    config: {
      // Plugin configuration options
    }
  }
}
```

## Usage

### Basic Usage

1. **Registering Status Types**
   ```javascript
   // Example: Registering a new status type
   const statusManager = strapi.plugin('status-manager').service('statusManager');
   await statusManager.registerStatusType('order', ['pending', 'processing', 'completed']);
   ```

2. **Updating Status**
   ```javascript
   // Example: Updating an entity's status
   await statusManager.updateStatus('order', orderId, 'processing');
   ```

3. **Querying Status**
   ```javascript
   // Example: Getting current status
   const status = await statusManager.getStatus('order', orderId);
   ```

### API Endpoints

The plugin provides the following REST endpoints:

- `GET /api/status-manager/types` - List all registered status types
- `GET /api/status-manager/status/:type/:id` - Get current status
- `POST /api/status-manager/status/:type/:id` - Update status
- `GET /api/status-manager/history/:type/:id` - Get status history

## API Reference

### StatusManager Service

The main service interface provides the following methods:

```typescript
interface StatusManager {
  // Register a new status type with allowed states
  registerStatusType(type: string, states: string[]): Promise<void>;
  
  // Update an entity's status
  updateStatus(type: string, id: string, state: string): Promise<void>;
  
  // Get current status
  getStatus(type: string, id: string): Promise<string>;
  
  // Get status history
  getStatusHistory(type: string, id: string): Promise<StatusHistory[]>;
  
  // Validate status transition
  validateTransition(type: string, from: string, to: string): boolean;
}
```

### Status History

Each status change is recorded with the following information:
- Timestamp
- Previous status
- New status
- User who made the change
- Optional metadata

## Best Practices

1. **Status Types**
   - Define clear, meaningful status types
   - Keep the number of states manageable
   - Document valid transitions

2. **Status Updates**
   - Validate transitions before applying
   - Log all status changes
   - Include relevant metadata

3. **Error Handling**
   - Handle invalid transitions gracefully
   - Provide clear error messages
   - Implement rollback mechanisms

4. **Performance**
   - Cache frequently accessed statuses
   - Optimize status history queries
   - Use appropriate indexes

## Example Implementation

```javascript
// Example: Order status management
const orderStatusManager = {
  async processOrder(orderId) {
    const statusManager = strapi.plugin('status-manager').service('statusManager');
    
    // Validate transition
    const currentStatus = await statusManager.getStatus('order', orderId);
    if (!statusManager.validateTransition('order', currentStatus, 'processing')) {
      throw new Error('Invalid status transition');
    }
    
    // Update status
    await statusManager.updateStatus('order', orderId, 'processing', {
      processedBy: ctx.state.user.id,
      timestamp: new Date()
    });
    
    // Get status history
    const history = await statusManager.getStatusHistory('order', orderId);
    return history;
  }
};
``` 