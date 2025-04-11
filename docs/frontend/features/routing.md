# Dynamic Routing

Next.js 14's App Router provides a powerful and flexible routing system that supports both static and dynamic routes.

## Route Structure

### Basic Routes
```
app/
├── page.tsx              # / (home page)
├── about/
│   └── page.tsx         # /about
└── blog/
    └── page.tsx         # /blog
```

### Dynamic Routes
```
app/
├── blog/
│   ├── [slug]/
│   │   └── page.tsx     # /blog/:slug
│   └── page.tsx         # /blog
└── products/
    ├── [category]/
    │   └── [id]/
    │       └── page.tsx # /products/:category/:id
    └── page.tsx         # /products
```

## Route Groups

Route groups allow you to organize routes without affecting the URL structure:

```
app/
├── (auth)/
│   ├── login/
│   │   └── page.tsx     # /login
│   └── register/
│       └── page.tsx     # /register
└── (dashboard)/
    ├── settings/
    │   └── page.tsx     # /settings
    └── profile/
        └── page.tsx     # /profile
```

## Layouts

### Root Layout
```tsx
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
```

### Nested Layouts
```tsx
// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Sidebar />
      <main>{children}</main>
    </div>
  )
}
```

## Route Handlers

### API Routes
```tsx
// app/api/hello/route.ts
export async function GET() {
  return Response.json({ message: 'Hello World' })
}
```

### Dynamic Route Handlers
```tsx
// app/api/users/[id]/route.ts
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = await getUser(params.id)
  return Response.json(user)
}
```

## Route Parameters

### Accessing Parameters
```tsx
// app/blog/[slug]/page.tsx
export default function BlogPost({
  params,
}: {
  params: { slug: string }
}) {
  return <h1>Blog Post: {params.slug}</h1>
}
```

### Search Parameters
```tsx
// app/search/page.tsx
export default function Search({
  searchParams,
}: {
  searchParams: { q: string }
}) {
  return <h1>Search: {searchParams.q}</h1>
}
```

## Navigation

### Client-side Navigation
```tsx
'use client'

import { useRouter } from 'next/navigation'

export default function Navigation() {
  const router = useRouter()

  return (
    <button onClick={() => router.push('/dashboard')}>
      Go to Dashboard
    </button>
  )
}
```

### Link Component
```tsx
import Link from 'next/link'

export default function Navigation() {
  return (
    <Link href="/dashboard">
      Go to Dashboard
    </Link>
  )
}
```

## Best Practices

1. **Route Organization**
   - Group related routes
   - Use descriptive names
   - Keep routes shallow when possible

2. **Layout Usage**
   - Use layouts for shared UI
   - Keep layouts simple
   - Avoid unnecessary nesting

3. **Performance**
   - Use dynamic imports
   - Implement loading states
   - Optimize route handlers

4. **Security**
   - Validate route parameters
   - Implement proper authentication
   - Handle errors gracefully 