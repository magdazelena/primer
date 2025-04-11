# Backend Documentation

The backend is built with Strapi, a headless CMS that provides a powerful API and admin interface for managing content.

## Table of Contents

1. [Architecture](./architecture/index.md)
   - [Project Structure](./architecture/structure.md)
   - [Key Technologies](./architecture/technologies.md)

2. [Features](./features/index.md)
   - [Content Types](./features/content-types.md)
   - [Authentication & Authorization](./features/auth.md)
   - [API Features](./features/api.md)
   - [Extensibility](./features/extensibility.md)

3. [Development Guide](./development/index.md)
   - [Getting Started](./development/getting-started.md)
   - [Creating New Features](./development/new-features.md)
   - [Best Practices](./development/best-practices.md)

4. [API Documentation](./api/index.md)
   - [REST API](./api/rest.md)
   - [GraphQL API](./api/graphql.md)

5. [Content Management](./content/index.md)
   - [Admin Panel](./content/admin-panel.md)
   - [Data Migration](./content/migration.md)

6. [Deployment](./deployment/index.md)
   - [Production Setup](./deployment/production.md)
   - [Deployment Checklist](./deployment/checklist.md)

7. [Troubleshooting](./troubleshooting/index.md)
   - [Common Issues](./troubleshooting/common-issues.md)
   - [Getting Help](./troubleshooting/getting-help.md)

## Quick Start

```bash
# Install dependencies
yarn install

# Start development server
yarn dev
```

## Required Environment Variables

```env
HOST=localhost
PORT=1337
APP_KEYS="toBeModified1,toBeModified2"
API_TOKEN_SALT=tobemodified
ADMIN_JWT_SECRET=tobemodified
JWT_SECRET=tobemodified
TRANSFER_TOKEN_SALT=tobemodified
``` 