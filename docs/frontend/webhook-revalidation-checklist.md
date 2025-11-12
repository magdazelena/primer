# Webhook Revalidation Implementation Checklist

## Prerequisites

- [ ] Strapi Cloud project deployed
- [ ] Vercel project deployed
- [ ] Access to both Strapi Cloud and Vercel dashboards

## Step 1: Create Revalidation API Route

- [ ] Create file: `apps/frontend/src/app/api/revalidate/route.ts`
- [ ] Implement POST handler with secret verification
- [ ] Add revalidation logic using `revalidatePath()` or `revalidateTag()`
- [ ] Test locally with curl command

## Step 2: Add Environment Variable

- [ ] Generate a strong secret token (use: `openssl rand -base64 32`)
- [ ] Add `REVALIDATION_SECRET` to local `.env` file
- [ ] Add `REVALIDATION_SECRET` to Vercel Environment Variables:
  - [ ] Go to Vercel Dashboard → Project → Settings → Environment Variables
  - [ ] Add variable for Production, Preview, and Development environments
  - [ ] Save changes

## Step 3: Configure Strapi Webhook

- [ ] Log into Strapi Cloud Dashboard
- [ ] Navigate to: Settings → Webhooks
- [ ] Click "Create new webhook"
- [ ] Configure webhook:
  - [ ] **Name**: `Next.js Revalidation`
  - [ ] **URL**: `https://your-vercel-domain.vercel.app/api/revalidate?secret=YOUR_SECRET`
  - [ ] **Events**: Select:
    - [ ] `entry.create`
    - [ ] `entry.update`
    - [ ] `entry.delete`
    - [ ] `entry.publish`
    - [ ] `entry.unpublish`
    - [ ] `media.create`
    - [ ] `media.update`
    - [ ] `media.delete`
  - [ ] **Status**: Enabled
- [ ] Save webhook

## Step 4: Update fetchAPI (Optional - for Tag-based Revalidation)

- [ ] Open `apps/frontend/src/api/fetch-api.tsx`
- [ ] Add `tags` to `next` options:
  ```typescript
  next: {
    revalidate: 60,
    tags: [`strapi-${path}`]
  }
  ```
- [ ] Update revalidation route to use `revalidateTag()` when tag is provided

## Step 5: Deploy Changes

- [ ] Commit changes to git
- [ ] Push to main branch (triggers Vercel deployment)
- [ ] Wait for deployment to complete
- [ ] Verify API route is accessible: `https://your-domain.vercel.app/api/revalidate?secret=YOUR_SECRET&path=/`

## Step 6: Test Webhook

- [ ] Make a test change in Strapi CMS (e.g., update a page title)
- [ ] Check Strapi webhook logs:
  - [ ] Go to Settings → Webhooks → Click on your webhook
  - [ ] View "Deliveries" tab
  - [ ] Verify request was sent (status should be 200)
- [ ] Check Vercel function logs:
  - [ ] Go to Vercel Dashboard → Deployments → Functions → `api/revalidate`
  - [ ] Verify webhook was received and processed
- [ ] Verify frontend updated immediately (refresh page)

## Step 7: Adjust Revalidation Time (Optional)

- [ ] Open `apps/frontend/src/api/fetch-api.tsx`
- [ ] Modify `revalidate` value:
  - `10` = 10 seconds (faster updates, more API calls)
  - `60` = 1 minute (current, balanced)
  - `3600` = 1 hour (slower updates, fewer API calls)
  - `0` = no caching (always fresh, but slower)

## Troubleshooting

### Webhook not firing

- [ ] Check webhook is enabled in Strapi
- [ ] Verify URL is correct (no typos)
- [ ] Check secret token matches in both places
- [ ] Verify events are selected

### Webhook returns 401

- [ ] Verify `REVALIDATION_SECRET` matches in Vercel and webhook URL
- [ ] Check environment variable is set for correct environment

### Webhook returns 500

- [ ] Check Vercel function logs for error details
- [ ] Verify revalidation path/tag is valid
- [ ] Check Next.js version supports `revalidatePath`/`revalidateTag`

### Content still not updating

- [ ] Verify webhook is being called (check logs)
- [ ] Check if path being revalidated matches actual page path
- [ ] Try revalidating root path: `revalidatePath('/', 'layout')`
- [ ] Clear browser cache and hard refresh

## Quick Reference

### Test Webhook Manually

```bash
curl -X POST "https://your-domain.vercel.app/api/revalidate?secret=YOUR_SECRET&path=/"
```

### Revalidate Specific Path

```bash
curl -X POST "https://your-domain.vercel.app/api/revalidate?secret=YOUR_SECRET&path=/en/blog"
```

### Revalidate by Tag

```bash
curl -X POST "https://your-domain.vercel.app/api/revalidate?secret=YOUR_SECRET&tag=strapi-articles"
```
