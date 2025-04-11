# Frontend Project Structure

## Overview

The frontend project follows a modular and scalable architecture designed for Next.js 14 applications. The structure is organized to promote code reusability, maintainability, and clear separation of concerns.

## Directory Structure

```
apps/frontend/
├── src/
│   ├── app/                    # Next.js 14 app directory
│   │   ├── (auth)/            # Authentication routes
│   │   ├── (dashboard)/       # Dashboard routes
│   │   ├── api/               # API routes
│   │   └── layout.tsx         # Root layout
│   ├── components/            # Reusable components
│   │   ├── common/           # Shared components
│   │   ├── forms/            # Form components
│   │   └── layout/           # Layout components
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility functions and configurations
│   ├── styles/               # Global styles and theme
│   ├── types/                # TypeScript type definitions
│   └── utils/                # Helper functions
├── public/                   # Static assets
└── tests/                    # Test files
```

## Key Directories

### `src/app`

The app directory follows Next.js 14's App Router convention:
- Route groups are denoted by parentheses (e.g., `(auth)`, `(dashboard)`)
- Each route has its own directory with `page.tsx` and optional `layout.tsx`
- API routes are handled in the `api` directory

### `src/components`

Components are organized by functionality:
- `common`: Shared UI components (buttons, inputs, etc.)
- `forms`: Form-related components and validation
- `layout`: Page layout components

### `src/hooks`

Custom React hooks for:
- Data fetching
- State management
- UI interactions
- Authentication

### `src/lib`

Core application configurations:
- API client setup
- Authentication configuration
- Environment variables
- Feature flags

### `src/styles`

Styling approach:
- Tailwind CSS configuration
- Global styles
- Theme variables
- Responsive design utilities

## Best Practices

1. **Component Organization**
   - Keep components small and focused
   - Use consistent naming conventions
   - Document component props and usage

2. **State Management**
   - Use React Context for global state
   - Implement proper state initialization
   - Handle loading and error states

3. **Code Splitting**
   - Implement dynamic imports
   - Optimize bundle size
   - Use proper loading states

4. **Type Safety**
   - Define proper TypeScript interfaces
   - Use strict type checking
   - Document type definitions

## Example Component Structure

```typescript
// components/common/Button.tsx
import { ButtonProps } from '@/types/components';

export const Button = ({
  variant = 'primary',
  size = 'medium',
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`button button--${variant} button--${size}`}
      {...props}
    >
      {children}
    </button>
  );
};
```

## Development Guidelines

1. **File Naming**
   - Use PascalCase for components
   - Use camelCase for utilities and hooks
   - Use kebab-case for CSS files

2. **Import Order**
   - React and Next.js imports
   - Third-party libraries
   - Local components
   - Styles and types

3. **Component Structure**
   - Props interface
   - Component definition
   - Helper functions
   - Return statement

4. **Documentation**
   - Component purpose
   - Prop descriptions
   - Usage examples
   - Type definitions 