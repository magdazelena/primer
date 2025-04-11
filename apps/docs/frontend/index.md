# Frontend Documentation

The frontend is built with Next.js 14, TypeScript, and Tailwind CSS, providing a modern, type-safe, and responsive web application.

## Table of Contents

1. [Architecture](./architecture/index.md)
   - [Project Structure](./architecture/structure.md)
   - [Key Technologies](./architecture/technologies.md)

2. [Features](./features/index.md)
   - [Dynamic Routing](./features/routing.md)
   - [Data Fetching](./features/data-fetching.md)
   - [UI Components](./features/components.md)
   - [Performance](./features/performance.md)

3. [Development Guide](./development/index.md)
   - [Getting Started](./development/getting-started.md)
   - [Creating New Features](./development/new-features.md)
   - [Best Practices](./development/best-practices.md)

4. [Testing](./testing/index.md)
   - [Running Tests](./testing/running-tests.md)
   - [Test Structure](./testing/test-structure.md)

5. [Deployment](./deployment/index.md)
   - [Production Build](./deployment/production-build.md)
   - [Deployment Checklist](./deployment/checklist.md)

6. [Troubleshooting](./troubleshooting/index.md)
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
NEXT_PUBLIC_STRAPI_API_TOKEN=your-api-token
NEXT_PUBLIC_PAGE_LIMIT=6
NEXT_PUBLIC_STRAPI_FORM_SUBMISSION_TOKEN=your-form-submission-token
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
``` 