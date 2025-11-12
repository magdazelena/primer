# Caching and Revalidation Guide

## Understanding Revalidation

### What is Revalidation?

Revalidation is Next.js's mechanism to update cached content without rebuilding the entire site. It's part of **ISR (Incremental Static Regeneration)**.

### Current Setup

Your frontend currently uses:

```typescript
next: {
  revalidate: 60;
} // 60 seconds
```

This means:

- Pages are generated at build time
- After 60 seconds, the next request triggers a background regeneration
- Users see cached content immediately, then get fresh content after regeneration

### Adjusting Revalidation Time

**Location:** `apps/frontend/src/api/fetch-api.tsx` (line 33)

**Options:**

1. **Faster updates** (more API calls):

   ```typescript
   next: {
     revalidate: 10;
   } // 10 seconds
   ```

2. **Slower updates** (fewer API calls):

   ```typescript
   next: {
     revalidate: 3600;
   } // 1 hour
   ```

3. **No caching** (always fresh, but slower):

   ```typescript
   next: {
     revalidate: 0;
   } // Always fetch fresh
   ```

4. **On-demand revalidation** (best for CMS):
   ```typescript
   // Remove revalidate, use webhooks instead (see below)
   ```

## CDN Edge Servers vs Browser Caching

### CDN Edge Servers

**What they are:**

- Servers located around the world (edge locations)
- Store cached copies of your content closer to users
- Reduce latency by serving from nearby locations

**In your stack:**

- **Vercel**: Has a global CDN that caches your Next.js pages
- **Strapi Cloud**: Has its own CDN for static assets (images, uploads)

**How it works:**

1. User requests a page
2. Request goes to nearest Vercel edge server
3. If cached, served immediately
4. If not cached or expired, fetches from origin (your Next.js app)
5. Caches the response for future requests

### Browser Caching

**What it is:**

- Your browser stores copies of files locally
- Reduces requests to the server
- Controlled by `Cache-Control` headers

**Difference:**

- **CDN Edge**: Caches at network level (between user and your server)
- **Browser**: Caches on user's device

### Relevance to Your Setup

**Vercel CDN:**

- Caches your Next.js pages based on revalidation settings
- Your `revalidate: 60` affects Vercel's CDN caching
- After 60 seconds, Vercel regenerates the page

**Strapi Cloud CDN:**

- Caches images and uploads separately
- According to Strapi docs: 24 hours on CDN, 10 seconds in browser
- This is why images might not update immediately

**Why styles don't update:**

- If styles are calculated from CMS options (like "primary" or "secondary")
- The style calculation happens in frontend, but the **option value** comes from Strapi
- If the API response is cached, the option value is old
- Frontend calculates styles from old option → old styles appear

## On-Demand Revalidation with Webhooks

### Overview

Instead of waiting for revalidation time, trigger immediate updates when content changes in Strapi.

**How it works:**

1. Content editor updates something in Strapi
2. Strapi sends webhook to your Next.js app
3. Next.js revalidates specific pages immediately
4. CDN cache is cleared for those pages

### Implementation Steps

#### Step 1: Create Revalidation API Route

Create `apps/frontend/src/app/api/revalidate/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const path = request.nextUrl.searchParams.get("path");
  const tag = request.nextUrl.searchParams.get("tag");

  // Verify secret token
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    // Revalidate specific path
    if (path) {
      revalidatePath(path);
      return NextResponse.json({ revalidated: true, path });
    }

    // Or revalidate by tag (if using fetch with tags)
    if (tag) {
      revalidateTag(tag);
      return NextResponse.json({ revalidated: true, tag });
    }

    return NextResponse.json(
      { message: "Missing path or tag" },
      { status: 400 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Error revalidating" },
      { status: 500 }
    );
  }
}
```

#### Step 2: Add Revalidation Secret to Environment Variables

**Local `.env`:**

```env
REVALIDATION_SECRET=your-super-secret-token-here
```

**Vercel Dashboard:**

1. Go to your project → Settings → Environment Variables
2. Add `REVALIDATION_SECRET` with a strong random value
3. Make sure it's available for Production, Preview, and Development

#### Step 3: Configure Strapi Webhook

**In Strapi Cloud Dashboard:**

1. Navigate to **Settings** → **Webhooks**
2. Click **Create new webhook**
3. Configure:
   - **Name**: `Next.js Revalidation`
   - **URL**: `https://your-vercel-domain.vercel.app/api/revalidate?secret=YOUR_SECRET&path=/`
   - **Events**: Select events that should trigger revalidation:
     - `entry.create`
     - `entry.update`
     - `entry.delete`
     - `entry.publish`
     - `entry.unpublish`
     - `media.create`
     - `media.update`
     - `media.delete`
   - **Headers**: (optional, for additional security)
     ```
     Content-Type: application/json
     ```

#### Step 4: Update fetchAPI to Use Tags (Optional but Recommended)

Modify `apps/frontend/src/api/fetch-api.tsx`:

```typescript
export async function fetchAPI(
  path: string,
  urlParamsObject: URLParamsObject = {
    locale: i18n.defaultLocale,
  },
  options = {}
) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  try {
    // Merge default and user options
    const mergedOptions = {
      next: {
        revalidate: 60,  // Fallback revalidation
        tags: [`strapi-${path}`]  // Add tag for on-demand revalidation
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      ...options,
    };

    // ... rest of the function
  }
}
```

#### Step 5: Create Strapi Webhook Handler (Advanced)

For more control, create a webhook handler that revalidates specific paths based on content type:

Create `apps/frontend/src/app/api/revalidate/route.ts` (enhanced version):

```typescript
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { model, event } = body;

    // Revalidate based on content type
    if (model === "page") {
      revalidatePath("/", "layout");
      revalidatePath("/[lang]", "page");
    } else if (model === "article") {
      revalidatePath("/[lang]/blog", "page");
      revalidateTag("strapi-articles");
    } else if (model === "product") {
      revalidatePath("/[lang]/products", "page");
      revalidateTag("strapi-products");
    }

    // Always revalidate home page
    revalidatePath("/", "layout");

    return NextResponse.json({
      revalidated: true,
      model,
      event,
      now: Date.now(),
    });
  } catch (err) {
    console.error("Revalidation error:", err);
    return NextResponse.json(
      {
        message: "Error revalidating",
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
```

#### Step 6: Test the Webhook

1. **Test locally:**

   ```bash
   curl -X POST "http://localhost:3000/api/revalidate?secret=YOUR_SECRET&path=/"
   ```

2. **Test from Strapi:**
   - Make a change in Strapi CMS
   - Check Vercel logs to see if webhook was received
   - Verify page updates immediately

#### Step 7: Monitor Webhook Delivery

**In Strapi Cloud:**

- Go to **Settings** → **Webhooks**
- Click on your webhook
- View delivery logs to see if requests are successful

**In Vercel:**

- Go to **Deployments** → **Functions** → `api/revalidate`
- View logs to see incoming webhook requests

### Alternative: Use Strapi's Built-in Webhook Format

Strapi sends webhooks in a specific format. Update your handler to parse it:

```typescript
export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    const body = await request.json();

    // Strapi webhook format
    const { event, model, entry } = body;

    // Determine which paths to revalidate
    const pathsToRevalidate = [];

    if (model === "page") {
      pathsToRevalidate.push("/");
      if (entry?.slug) {
        pathsToRevalidate.push(`/${entry.slug}`);
      }
    }

    // Revalidate all paths
    pathsToRevalidate.forEach((path) => {
      revalidatePath(path);
    });

    return NextResponse.json({
      revalidated: true,
      paths: pathsToRevalidate,
      event,
      model,
    });
  } catch (err) {
    return NextResponse.json(
      {
        message: "Error revalidating",
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
```

## Summary

### Quick Fixes

1. **Images 400/403**: ✅ Fixed by updating `next.config.js` to read from env
2. **Content updates slow**: Adjust `revalidate` value or implement webhooks
3. **Styles not updating**: Same as content - they depend on API responses

### Recommended Approach

1. **Keep revalidation as fallback** (60 seconds)
2. **Add webhook-based revalidation** for immediate updates
3. **Use tags** for granular cache control
4. **Monitor webhook delivery** in both Strapi and Vercel

### Resources

- [Next.js Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [Next.js On-Demand Revalidation](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration#on-demand-revalidation)
- [Strapi Webhooks Documentation](https://docs.strapi.io/dev-docs/backend-customization/webhooks)
- [Vercel Edge Network](https://vercel.com/docs/edge-network/overview)
