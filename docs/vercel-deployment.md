# Vercel Deployment Guide

## Overview

The Primer frontend is automatically deployed to Vercel. This guide explains the automatic deployment flow.

## Automatic Deployment Flow

### Pull Request Deployment

When you create a pull request:

1. Vercel automatically creates a **preview deployment**
2. The preview is available at a unique URL (e.g., `primer-frontend-git-<branch-name>-your-team.vercel.app`)
3. This allows you to test changes before merging to production

### Production Deployment

When a pull request is merged to `main`:

1. Vercel automatically detects the merge
2. Builds the production version of the frontend
3. Deploys to the production URL: [https://primer-frontend.vercel.app](https://primer-frontend.vercel.app)

## Configuration

Vercel is connected to the GitHub repository and automatically:

- Detects changes in the `apps/frontend` directory
- Runs the build process
- Deploys the application

## Environment Variables

Environment variables are configured in the Vercel dashboard:

- Go to your project settings in Vercel
- Navigate to **Settings** → **Environment Variables**
- Add required variables like:
  - `NEXT_PUBLIC_STRAPI_API_TOKEN`
  - `NEXT_PUBLIC_STRAPI_API_URL`
  - `NEXT_PUBLIC_STRAPI_FORM_SUBMISSION_TOKEN`
  - `NEXT_PUBLIC_PAGE_LIMIT`

## Manual Deployment

If needed, you can trigger a manual deployment from the Vercel dashboard:

- Go to **Deployments** tab
- Click **Redeploy** on any deployment
- Or use the Vercel CLI: `vercel --prod`

## References

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment on Vercel](https://nextjs.org/docs/deployment)
