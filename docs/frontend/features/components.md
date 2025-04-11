# UI Components

## Overview

The frontend application uses a component-based architecture with a focus on reusability, accessibility, and performance. Components are built using React and styled with Tailwind CSS.

## Component Structure

### Atomic Design

Components follow the Atomic Design methodology:

```
components/
├── atoms/              # Basic building blocks
│   ├── Button.tsx
│   ├── Input.tsx
│   └── Typography.tsx
├── molecules/          # Groups of atoms
│   ├── SearchBar.tsx
│   └── ProductCard.tsx
├── organisms/          # Complex UI sections
│   ├── Header.tsx
│   └── ProductGrid.tsx
└── templates/          # Page layouts
    ├── Default.tsx
    └── Dashboard.tsx
```

## Common Components

### Button Component

```typescript
// components/atoms/Button.tsx
import { ButtonProps } from '@/types/components';

export const Button = ({
  variant = 'primary',
  size = 'medium',
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`
        rounded-md px-4 py-2
        ${variant === 'primary' ? 'bg-blue-500 text-white' : ''}
        ${variant === 'secondary' ? 'bg-gray-500 text-white' : ''}
        ${size === 'small' ? 'text-sm' : ''}
        ${size === 'large' ? 'text-lg' : ''}
      `}
      {...props}
    >
      {children}
    </button>
  );
};
```

### Input Component

```typescript
// components/atoms/Input.tsx
import { InputProps } from '@/types/components';

export const Input = ({
  label,
  error,
  ...props
}: InputProps) => {
  return (
    <div>
      {label && <label className="block text-sm font-medium">{label}</label>}
      <input
        className={`
          mt-1 block w-full rounded-md border
          ${error ? 'border-red-500' : 'border-gray-300'}
          shadow-sm focus:border-blue-500 focus:ring-blue-500
        `}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};
```

## Form Components

### Form Component

```typescript
// components/molecules/Form.tsx
import { FormProps } from '@/types/components';

export const Form = ({
  onSubmit,
  children,
  ...props
}: FormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4"
      {...props}
    >
      {children}
    </form>
  );
};
```

### Form Field Component

```typescript
// components/molecules/FormField.tsx
import { FormFieldProps } from '@/types/components';

export const FormField = ({
  label,
  name,
  error,
  children,
}: FormFieldProps) => {
  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium"
        >
          {label}
        </label>
      )}
      {children}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};
```

## Layout Components

### Header Component

```typescript
// components/organisms/Header.tsx
import Link from 'next/link';

export const Header = () => {
  return (
    <header className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              Logo
            </Link>
          </div>
          <nav className="flex space-x-4">
            <Link href="/products">Products</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
```

### Footer Component

```typescript
// components/organisms/Footer.tsx
export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-semibold">Company</h3>
            <ul className="mt-2 space-y-2">
              <li>About Us</li>
              <li>Careers</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Legal</h3>
            <ul className="mt-2 space-y-2">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
```

## Best Practices

1. **Component Design**
   - Keep components small and focused
   - Use proper prop types
   - Implement proper error handling

2. **Styling**
   - Use Tailwind CSS classes
   - Follow consistent naming
   - Implement responsive design

3. **Accessibility**
   - Use semantic HTML
   - Implement ARIA attributes
   - Ensure keyboard navigation

4. **Performance**
   - Use proper memoization
   - Implement lazy loading
   - Optimize renders

## Example Implementation

```typescript
// components/templates/Default.tsx
import { Header } from '@/components/organisms/Header';
import { Footer } from '@/components/organisms/Footer';

export const Default = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};
``` 