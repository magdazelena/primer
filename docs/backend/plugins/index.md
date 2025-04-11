# Plugins

The backend includes several custom plugins that extend Strapi's functionality. This document provides an overview of each plugin and how to use them.

## Table of Contents

1. [Status Manager](./status-manager.md)
   - [Overview](./status-manager.md#overview)
   - [Installation](./status-manager.md#installation)
   - [Configuration](./status-manager.md#configuration)
   - [Usage](./status-manager.md#usage)
   - [API Reference](./status-manager.md#api-reference)

2. [Product Actions](./product-actions.md)
   - [Overview](./product-actions.md#overview)
   - [Installation](./product-actions.md#installation)
   - [Configuration](./product-actions.md#configuration)
   - [Usage](./product-actions.md#usage)
   - [API Reference](./product-actions.md#api-reference)

## Creating Custom Plugins

To create a new plugin, use the Strapi CLI:

```bash
npm run strapi generate:plugin my-plugin
```

This will create a new plugin structure in `src/plugins/my-plugin/`.

## Plugin Structure

A typical plugin has the following structure:

```
src/plugins/my-plugin/
├── admin/               # Admin panel customizations
├── server/             # Server-side code
│   ├── config/        # Plugin configuration
│   ├── controllers/   # Plugin controllers
│   ├── services/      # Plugin services
│   ├── routes/        # Plugin routes
│   ├── policies/      # Plugin policies
│   ├── middlewares/   # Plugin middlewares
│   └── content-types/ # Plugin content types
├── strapi-admin.js    # Admin panel entry point
└── strapi-server.js   # Server entry point
```

## Best Practices

1. **Code Organization**
   - Keep plugin code modular
   - Follow the established structure
   - Document plugin functionality

2. **Configuration**
   - Use environment variables
   - Provide default configurations
   - Document configuration options

3. **Testing**
   - Write unit tests
   - Test plugin integration
   - Document test cases

4. **Documentation**
   - Document plugin purpose
   - Provide usage examples
   - Include API reference 