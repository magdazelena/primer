# Strapi Cloud Deployment Guide

## Overview

Strapi Cloud supports two deployment methods:

1. **Local CLI deployment** - Manual deployment from your local machine
2. **GitHub Integration** - Automatic deployment on every commit (recommended for releases)

**Important**: Strapi Cloud does **not** support manual deployment from GitHub Actions. Use the GitHub integration for automatic deployments.

## Prerequisites

1. **Strapi Cloud Account**: Sign up at [Strapi Cloud](https://strapi.io/cloud)
2. **Linked Project**: Your local project should be linked to Strapi Cloud (`.strapi-cloud.json` file exists)
3. **GitHub Repository**: Your code should be in a GitHub repository

## Deployment Methods

### Method 1: GitHub Integration (Recommended for Releases)

Strapi Cloud can automatically deploy on every commit to your repository. This is the recommended method for release-based deployments.

#### Setup Steps

1. **Link Your Project to Strapi Cloud** (if not already done):

   ```bash
   cd apps/backend
   npx strapi login --cloud
   npx strapi cloud:link
   ```

   This creates the `.strapi-cloud.json` file.

2. **Commit the `.strapi-cloud.json` file**:

   ```bash
   git add apps/backend/.strapi-cloud.json
   git commit -m "Add Strapi Cloud configuration"
   git push
   ```

3. **Enable GitHub Integration in Strapi Cloud**:
   - Go to [Strapi Cloud Dashboard](https://cloud.strapi.io)
   - Select your project
   - Go to **Settings** → **Git Integration** (or similar)
   - Click **Connect GitHub** or **Enable GitHub Integration**
   - Authorize Strapi Cloud to access your repository
   - Select the repository: `magdazelena/primer`
   - Configure deployment settings:
     - **Branch**: `main` (or your release branch)
     - **Root Directory**: `apps/backend`
     - **Build Command**: `npm run build:all`
     - **Start Command**: `npm start`

4. **Configure Environment Variables**:
   - In Strapi Cloud Dashboard → **Settings** → **Environment Variables**
   - Add all required environment variables for your backend

#### How It Works

- **Automatic Deployment**: Every commit to the configured branch triggers a deployment
- **Release Workflow**: When you merge a release PR to `main`, Strapi Cloud automatically deploys
- **No GitHub Actions Needed**: Strapi Cloud handles the deployment directly

#### Deployment Flow

```
Release PR Merged to main
    ↓
Strapi Cloud detects commit
    ↓
Strapi Cloud builds backend
    ↓
Strapi Cloud deploys to production
    ↓
Backend is live at https://your-project.strapiapp.com
```

### Method 2: Local CLI Deployment

For manual deployments from your local machine:

1. **Authenticate**:

   ```bash
   cd apps/backend
   npx strapi login --cloud
   ```

2. **Deploy**:
   ```bash
   npx strapi deploy --cloud
   ```

**Note**: This method requires interactive login and cannot be automated in CI/CD.

## Release-Based Deployment Strategy

Since Strapi Cloud deploys on every commit, here's how to align it with your release workflow:

### Option 1: Deploy on Release Merge

1. Create your `release/vX.Y.Z` branch
2. Make your changes
3. Merge PR to `main` → Strapi Cloud automatically deploys
4. Tag the release: `git tag vX.Y.Z && git push origin vX.Y.Z`

### Option 2: Deploy on Release Tag

If you want deployments only on releases:

1. Configure Strapi Cloud to deploy from a specific branch (e.g., `releases`)
2. After merging release PR to `main`, create a release branch:
   ```bash
   git checkout -b releases/vX.Y.Z main
   git push origin releases/vX.Y.Z
   ```
3. Strapi Cloud deploys from the `releases` branch

### Option 3: Manual Trigger via Strapi Cloud Dashboard

Some Strapi Cloud plans support manual deployment triggers:

- Go to Strapi Cloud Dashboard
- Click **Deploy** or **Redeploy** button
- Select the branch/commit to deploy

## Configuration

### Project Link File

The `.strapi-cloud.json` file in `apps/backend/` contains:

```json
{
  "project": {
    "name": "primer-backend-0462279434",
    "environmentInternalName": "dazzling-eggs-0324233771"
  }
}
```

This file links your local project to your Strapi Cloud project and must be committed to your repository.

### Environment Variables

Set environment variables in Strapi Cloud Dashboard:

- Go to **Settings** → **Environment Variables**
- Add variables like:
  - `APP_KEYS`
  - `API_TOKEN_SALT`
  - `ADMIN_JWT_SECRET`
  - `JWT_SECRET`
  - Database configuration
  - etc.

## Troubleshooting

### GitHub Integration Not Working

**Issue**: Deployments not triggering on commits

**Solutions**:

1. Verify GitHub integration is enabled in Strapi Cloud Dashboard
2. Check that Strapi Cloud has access to your repository
3. Verify the branch configuration matches your workflow
4. Check Strapi Cloud deployment logs for errors

### Build Fails

**Issue**: Deployment fails during build

**Solutions**:

1. Check Strapi Cloud build logs
2. Verify `package.json` has all required dependencies
3. Ensure build command is correct: `npm run build:all`
4. Check that plugins build correctly

### Project Not Found

**Issue**: `.strapi-cloud.json` doesn't match project

**Solutions**:

1. Re-link project: `npx strapi cloud:link`
2. Verify project name in Strapi Cloud Dashboard
3. Update `.strapi-cloud.json` if needed

## Accessing Your Deployed Backend

After deployment, your backend will be available at:

- **API**: `https://your-project-name.strapiapp.com/api`
- **Admin Panel**: `https://your-project-name.strapiapp.com/admin`

## Important Notes

- ✅ **Automatic on Commit**: Strapi Cloud deploys automatically on every commit (if GitHub integration enabled)
- ✅ **No GitHub Actions Needed**: Strapi Cloud handles deployment directly
- ✅ **Project Link Required**: The `.strapi-cloud.json` file must exist and be committed
- ⚠️ **Database**: Strapi Cloud manages the database automatically
- ⚠️ **Environment Variables**: Set in Strapi Cloud dashboard, not in code
- ⚠️ **Manual CLI Only**: CLI deployment (`strapi deploy`) only works from local machine, not from CI/CD

## Next Steps

After backend deployment is working:

1. **Deploy Frontend**: Set up frontend deployment to Vercel/Netlify
2. **Configure CORS**: Ensure Strapi Cloud allows requests from your frontend domain
3. **Set API Tokens**: Create and configure API tokens in Strapi Cloud admin panel
4. **Test Integration**: Verify frontend can connect to deployed backend

## References

- [Strapi Cloud Documentation](https://docs.strapi.io/cloud)
- [Strapi Cloud CLI Documentation](https://docs.strapi.io/cloud/cli/cloud-cli)
- [Strapi Cloud Deployment CLI](https://docs.strapi.io/cloud/getting-started/deployment-cli)
