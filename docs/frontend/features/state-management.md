# State Management

## Overview

The frontend application uses a combination of React Context and React Query for state management. This approach provides a balance between global state management and server state synchronization.

## React Context

### Creating a Context

```typescript
// contexts/AuthContext.tsx
import { createContext, useContext, useState } from 'react';

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Implementation
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

### Using Context

```typescript
// components/LoginForm.tsx
import { useAuth } from '@/contexts/AuthContext';

export const LoginForm = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
};
```

## React Query

### Query Configuration

```typescript
// lib/queryClient.ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
    },
  },
});
```

### Data Fetching

```typescript
// hooks/useProducts.ts
import { useQuery } from '@tanstack/react-query';

const fetchProducts = async () => {
  const response = await fetch('/api/products');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });
};
```

### Mutations

```typescript
// hooks/useCreateProduct.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';

const createProduct = async (product: Product) => {
  const response = await fetch('/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};
```

## Combining Context and React Query

### Example Implementation

```typescript
// contexts/ProductsContext.tsx
import { createContext, useContext } from 'react';
import { useProducts, useCreateProduct } from '@/hooks';

type ProductsContextType = {
  products: Product[];
  isLoading: boolean;
  error: Error | null;
  createProduct: (product: Product) => Promise<void>;
};

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: products, isLoading, error } = useProducts();
  const { mutateAsync: createProduct } = useCreateProduct();

  return (
    <ProductsContext.Provider
      value={{
        products: products || [],
        isLoading,
        error,
        createProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProductsContext must be used within a ProductsProvider');
  }
  return context;
};
```

## Best Practices

1. **Context Usage**
   - Use context for truly global state
   - Keep context providers at the root level
   - Split contexts by domain

2. **React Query**
   - Use query keys consistently
   - Implement proper error handling
   - Configure appropriate stale times

3. **Performance**
   - Implement proper memoization
   - Use optimistic updates
   - Handle loading states

4. **Type Safety**
   - Define proper types for all state
   - Use TypeScript generics
   - Implement proper error types

## Example Implementation

```typescript
// pages/products/index.tsx
import { ProductsProvider } from '@/contexts/ProductsContext';
import { ProductList } from '@/components/ProductList';
import { CreateProductForm } from '@/components/CreateProductForm';

export default function ProductsPage() {
  return (
    <ProductsProvider>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Products</h1>
        <CreateProductForm />
        <ProductList />
      </div>
    </ProductsProvider>
  );
}
``` 