# Project Structure

The frontend project follows a well-organized structure that promotes maintainability and scalability.

## Directory Overview

```
apps/frontend/
├── app/                    # Next.js app directory (routes)
│   ├── api/               # API routes
│   ├── (auth)/           # Authentication routes
│   ├── (dashboard)/      # Dashboard routes
│   └── layout.tsx        # Root layout
├── components/            # Reusable UI components
│   ├── ui/               # Basic UI components
│   ├── forms/            # Form components
│   └── layout/           # Layout components
├── hooks/                # Custom React hooks
│   ├── api/              # API-related hooks
│   └── ui/               # UI-related hooks
├── types/                # TypeScript type definitions
│   ├── api/              # API types
│   └── components/       # Component props types
├── utils/                # Utility functions
│   ├── api/              # API utilities
│   └── helpers/          # Helper functions
├── public/               # Static assets
│   ├── images/           # Image assets
│   └── fonts/            # Font files
└── styles/               # Global styles
    ├── globals.css       # Global CSS
    └── tailwind.config.js # Tailwind configuration
```

## Key Directories Explained

### `app/` Directory
The `app` directory uses Next.js 14's App Router for file-based routing. Each subdirectory represents a route, and special directories are wrapped in parentheses to indicate route groups.

- **`api/`**: Contains API route handlers
- **`(auth)/`**: Authentication-related routes
- **`(dashboard)/`**: Dashboard-related routes
- **`layout.tsx`**: Root layout component

### `components/` Directory
Organized by feature and type, the components directory follows the atomic design pattern:

- **`ui/`**: Basic UI components (atoms)
- **`forms/`**: Form-related components
- **`layout/`**: Layout components

### `hooks/` Directory
Custom React hooks are organized by their purpose:

- **`api/`**: Hooks for API interactions
- **`ui/`**: Hooks for UI-related functionality

### `types/` Directory
TypeScript type definitions are organized by domain:

- **`api/`**: API response and request types
- **`components/`**: Component prop types

### `utils/` Directory
Utility functions are organized by their purpose:

- **`api/`**: API-related utilities
- **`helpers/`**: General helper functions

## File Naming Conventions

- **Components**: PascalCase (e.g., `Button.tsx`)
- **Hooks**: camelCase with 'use' prefix (e.g., `useAuth.ts`)
- **Utils**: camelCase (e.g., `formatDate.ts`)
- **Types**: PascalCase with 'Type' suffix (e.g., `UserType.ts`)

## Best Practices

1. **Component Organization**
   - Keep components small and focused
   - Use index files for cleaner imports
   - Follow the single responsibility principle

2. **File Structure**
   - Group related files together
   - Use clear, descriptive names
   - Maintain consistent naming conventions

3. **Code Splitting**
   - Use dynamic imports for large components
   - Split routes for better performance
   - Lazy load non-critical components 