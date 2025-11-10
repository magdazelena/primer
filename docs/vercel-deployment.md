# Vercel Frontend Deployment Guide

## Overview

This guide explains how to deploy your Next.js frontend to Vercel using GitHub Actions when a release is published. This approach works better for monorepos than Vercel's native deployment.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Vercel Project**: Create a project in Vercel Dashboard (for getting credentials)
3. **GitHub Repository**: Your code should be in a GitHub repository
4. **Strapi Cloud Backend**: Your backend should be deployed to Strapi Cloud

## Manual Setup (One-Time)

### Step 1: Create Vercel Project

**Note**: Vercel requires a deployment when creating a project. The initial deployment will likely fail due to monorepo structure, but that's okay - we just need the project credentials.

1. **In Vercel Dashboard**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import your repository: `magdazelena/primer`
   - Configure:
     - **Root Directory**: `apps/frontend`
     - **Framework Preset**: Next.js
     - **Build Command**: `npm run build` (or leave default)
     - **Output Directory**: `.next` (or leave default)
   - Click "Deploy" (it will likely fail - that's okay)

2. **Note Your Project Details** (even if deployment failed):
   - Go to **Settings → General**
   - Copy:
     - **Project ID** (needed for automation)
     - **Team/Org ID** (needed for automation)
   - You can find these in the URL: `https://vercel.com/[org-id]/[project-id]`

**Alternative**: If you prefer not to create the project in the dashboard, the GitHub Actions workflow can create it automatically on the first run (see Step 3).

### Step 2: Get Vercel Token

1. Go to [Vercel Dashboard → Settings → Tokens](https://vercel.com/account/tokens)
2. Click "Create Token"
3. Name it: `GitHub Actions Deploy`
4. Copy the token (you'll add it to GitHub Secrets)

### Step 3: Add GitHub Secrets

1. Go to your GitHub repository
2. **Settings → Secrets and variables → Actions**
3. Add these secrets:

   **Vercel Credentials**:

   ```
   VERCEL_TOKEN=your-vercel-token-from-step-2
   VERCEL_ORG_ID=your-org-id-from-step-1
   VERCEL_PROJECT_ID=your-project-id-from-step-1
   ```

   **Backend Connection**:

   ```
   NEXT_PUBLIC_STRAPI_API_URL=https://your-backend.strapiapp.com
   NEXT_PUBLIC_STRAPI_API_TOKEN=your-api-token
   NEXT_PUBLIC_STRAPI_FORM_SUBMISSION_TOKEN=your-form-token
   ```

   **Note**: Even if the initial Vercel deployment failed, you can still get the Project ID and Org ID from the project settings page. The GitHub Actions workflow will handle the deployment correctly.

## Automation

Once set up, the `.github/workflows/deploy-vercel.yml` workflow will:

1. **Trigger automatically** when a release is published
2. **Checkout the release tag**
3. **Install dependencies** at root level (for monorepo)
4. **Build frontend** (for verification)
5. **Deploy to Vercel production**

### Manual Trigger

You can also trigger manually:

1. Go to **Actions → Deploy Frontend to Vercel**
2. Click **Run workflow**
3. Optionally specify a tag to deploy

## How It Works

1. **Release Published** → Workflow triggers
2. **Checkout Tag** → Gets the specific release code
3. **Install Dependencies** → Installs at root level for monorepo support
4. **Build Frontend** → Verifies build works before deploying
5. **Deploy to Vercel** → Uses Vercel CLI to deploy
6. **Production URL** → Your site is live at `https://your-project.vercel.app`

## Why GitHub Actions Instead of Native Vercel?

For monorepos, GitHub Actions deployment is better because:

- ✅ **Monorepo Support**: Properly handles npm workspaces and Turborepo
- ✅ **Dependency Resolution**: Installs dependencies at root level first
- ✅ **Build Control**: Full control over the build process
- ✅ **Release-Based**: Deploys only on releases, not every commit
- ✅ **Environment Variables**: Managed in GitHub Secrets, not Vercel Dashboard

## Troubleshooting

### Build Fails with Module Not Found

**Issue**: `Module not found: Can't resolve '@formatjs/intl-localematcher'`

**Solution**:

- Ensure dependencies are in `apps/frontend/package.json`
- Run `npm install` at root level to install monorepo dependencies
- Check that all dependencies are listed in the correct package.json

### Vercel Deployment Fails

**Issue**: `Error: Authentication failed`

**Solutions**:

1. Verify `VERCEL_TOKEN` secret is correct
2. Check if token has expired (regenerate if needed)
3. Ensure token has deployment permissions

### Project Not Found

**Issue**: `Error: Project not found`

**Solutions**:

1. Verify `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` are correct
2. Check that project exists in Vercel Dashboard
3. Ensure you have access to the project

### Backend Connection Issues

**Issue**: Frontend can't connect to backend

**Solutions**:

1. Verify `NEXT_PUBLIC_STRAPI_API_URL` is correct
2. Check CORS settings in Strapi Cloud
3. Verify API tokens are correct
4. Test backend URL directly: `https://your-backend.strapiapp.com/api`

## Accessing Your Site

After deployment, your site will be available at:

```
https://your-project.vercel.app
```

Vercel also provides:

- Automatic HTTPS
- Custom domains (free)
- Preview deployments (if enabled)

## Important Notes

- ✅ **Automatic on Release**: Every published release automatically deploys to Vercel
- ✅ **Monorepo Support**: Properly handles npm workspaces
- ✅ **Dependencies**: All dependencies must be in `apps/frontend/package.json`
- ⚠️ **Environment Variables**: Managed in GitHub Secrets, passed to Vercel during deployment
- ⚠️ **Build Verification**: Workflow builds frontend before deploying to catch errors early

## Next Steps

After frontend deployment is working:

1. **Test Integration**: Verify frontend can connect to Strapi Cloud backend
2. **Configure CORS**: Ensure Strapi Cloud allows requests from Vercel domain
3. **Set Custom Domain**: Configure custom domain in Vercel Dashboard
4. **Monitor Deployments**: Check Vercel Dashboard for deployment status
