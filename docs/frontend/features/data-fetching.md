# Data Fetching

## Overview

The frontend application uses a combination of Next.js 14's built-in data fetching methods and React Query for efficient data management. This provides server-side rendering, static generation, and client-side data fetching capabilities.

## Server Components

### Server-side Data Fetching

```typescript
// app/products/page.tsx
async function getProducts() {
  const res = await fetch('https://api.example.com/products');
  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();
  
  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

### Static Generation

```typescript
// app/products/[id]/page.tsx
export async function generateStaticParams() {
  const products = await getProducts();
  
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);
  
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
    </div>
  );
}
```

## Client Components

### React Query

```typescript
'use client';

import { useQuery } from '@tanstack/react-query';

export default function ProductList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetch('/api/products').then((res) => res.json()),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

### Mutations

```typescript
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function AddProduct() {
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: (newProduct) => {
      return fetch('/api/products', {
        method: 'POST',
        body: JSON.stringify(newProduct),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  return (
    <button
      onClick={() => {
        mutation.mutate({
          name: 'New Product',
          price: 99.99,
        });
      }}
    >
      Add Product
    </button>
  );
}
```

## API Routes

### Creating API Endpoints

```typescript
// app/api/products/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const products = await getProducts();
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const body = await request.json();
  const product = await createProduct(body);
  return NextResponse.json(product);
}
```

### Route Handlers

```typescript
// app/api/products/[id]/route.ts
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const product = await getProduct(params.id);
  return NextResponse.json(product);
}
```

## Data Fetching Patterns

### Parallel Data Fetching

```typescript
export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const [product, reviews] = await Promise.all([
    getProduct(params.id),
    getReviews(params.id),
  ]);

  return (
    <div>
      <h1>{product.name}</h1>
      <div>
        {reviews.map((review) => (
          <div key={review.id}>{review.text}</div>
        ))}
      </div>
    </div>
  );
}
```

### Sequential Data Fetching

```typescript
export default async function UserProfile({
  params,
}: {
  params: { id: string };
}) {
  const user = await getUser(params.id);
  const posts = await getUserPosts(user.id);

  return (
    <div>
      <h1>{user.name}</h1>
      <div>
        {posts.map((post) => (
          <div key={post.id}>{post.title}</div>
        ))}
      </div>
    </div>
  );
}
```

## Best Practices

1. **Data Fetching Strategy**
   - Use server components for initial data
   - Implement proper loading states
   - Handle errors gracefully

2. **Caching**
   - Implement proper cache strategies
   - Use stale-while-revalidate
   - Handle cache invalidation

3. **Performance**
   - Optimize data fetching
   - Implement proper pagination
   - Use proper loading states

4. **Error Handling**
   - Implement proper error boundaries
   - Provide meaningful error messages
   - Handle edge cases

## Example Implementation

```typescript
// app/products/page.tsx
import { Suspense } from 'react';

async function ProductList() {
  const products = await getProducts();
  
  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <div>
      <h1>Products</h1>
      <Suspense fallback={<div>Loading products...</div>}>
        <ProductList />
      </Suspense>
    </div>
  );
}
``` 