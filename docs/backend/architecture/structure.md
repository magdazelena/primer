# Project Structure

The backend follows Strapi's recommended project structure with some customizations for our specific needs.

## Directory Overview

```
apps/backend/
├── config/                # Configuration files
│   ├── admin.js          # Admin panel configuration
│   ├── api.js            # API configuration
│   ├── database.js       # Database configuration
│   ├── functions/        # Bootstrap and cron functions
│   ├── middlewares.js    # Middleware configuration
│   ├── plugins.js        # Plugin configuration
│   └── server.js         # Server configuration
├── src/                  # Source code
│   ├── admin/           # Admin panel customizations
│   ├── api/             # API endpoints and controllers
│   ├── components/      # Reusable components
│   ├── extensions/      # Strapi extensions
│   ├── plugins/         # Custom plugins
│   └── test/            # Test files
├── database/            # Database migrations and seeds
├── public/              # Public assets
├── scripts/             # Utility scripts
└── test/                # Test configuration
```

## Key Directories Explained

### `config/` Directory
Contains all configuration files for the Strapi application:

- **`admin.js`**: Admin panel configuration
  - Customize admin panel appearance
  - Configure admin panel features
  - Set up custom admin pages

- **`api.js`**: API configuration
  - Configure API endpoints
  - Set up API security
  - Define API rate limits

- **`database.js`**: Database configuration
  - Database connection settings
  - Migration settings
  - Seeding configuration

- **`functions/`**: Bootstrap and cron functions
  - `bootstrap.js`: Application startup logic
  - `cron.js`: Scheduled tasks

- **`middlewares.js`**: Middleware configuration
  - Global middleware setup
  - Route-specific middleware
  - Error handling middleware

- **`plugins.js`**: Plugin configuration
  - Plugin settings
  - Plugin dependencies
  - Plugin initialization

- **`server.js`**: Server configuration
  - Server settings
  - Port configuration
  - SSL settings

### `src/` Directory
Contains the main application code:

- **`admin/`**: Admin panel customizations
  - Custom admin pages
  - Admin panel extensions
  - Admin panel components

- **`api/`**: API implementation
  - Content type definitions
  - Controllers
  - Services
  - Routes
  - Policies

- **`components/`**: Reusable components
  - Shared business logic
  - Common utilities
  - Helper functions

- **`extensions/`**: Strapi extensions
  - Custom controllers
  - Custom services
  - Custom middlewares

- **`plugins/`**: Custom plugins
  - Plugin implementations
  - Plugin configurations
  - Plugin hooks

### `database/` Directory
Contains database-related files:

- **Migrations**: Database schema changes
- **Seeds**: Initial data population
- **Backups**: Database backups

### `public/` Directory
Contains public assets:

- **Uploads**: User-uploaded files
- **Static files**: Public static assets
- **Media**: Public media files

## File Naming Conventions

- **Controllers**: `*.controller.js`
- **Services**: `*.service.js`
- **Models**: `*.model.js`
- **Policies**: `*.policy.js`
- **Middlewares**: `*.middleware.js`
- **Configurations**: `*.config.js`

## Best Practices

1. **Code Organization**
   - Keep related files together
   - Use clear, descriptive names
   - Follow the established structure

2. **Configuration**
   - Use environment variables
   - Keep sensitive data secure
   - Document configuration options

3. **Extensions**
   - Keep extensions modular
   - Document extension points
   - Test extensions thoroughly

4. **Database**
   - Use migrations for schema changes
   - Keep seeds up to date
   - Regular backups

## Example Structure

### API Structure
```
src/api/
├── article/
│   ├── controllers/
│   │   └── article.js
│   ├── routes/
│   │   └── article.js
│   ├── services/
│   │   └── article.js
│   └── content-types/
│       └── article/
│           ├── schema.json
│           └── lifecycles.js
└── category/
    └── ...
```

### Component Structure
```
src/components/
├── seo/
│   ├── config/
│   │   └── index.js
│   ├── services/
│   │   └── seo.js
│   └── lifecycles.js
└── navigation/
    └── ...
``` 