# Strapi Cloud Deployment Guide

## Overview

The Primer backend is automatically deployed to Strapi Cloud when pull requests are merged to `main`. This guide explains the automatic deployment flow.

## Prerequisites

1. **Strapi Cloud Account**: Sign up at [Strapi Cloud](https://strapi.io/cloud)
2. **Linked Project**: Your local project should be linked to Strapi Cloud (`.strapi-cloud.json` file exists)
3. **GitHub Repository**: Your code should be in a GitHub repository

## Automatic Deployment Flow

### How It Works

When a pull request is merged to `main`:

1. Strapi Cloud automatically detects the merge
2. Builds the backend using `npm run build:all`
3. Deploys to production

### Deployment Flow

```
Pull Request Merged to main
    ↓
Strapi Cloud detects commit
    ↓
Strapi Cloud builds backend
    ↓
Strapi Cloud deploys to production
    ↓
Backend is live at https://your-project.strapiapp.com
```

## Initial Setup

If you need to set up Strapi Cloud integration:

1. **Link Your Project to Strapi Cloud**:

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
   - Go to **Settings** → **Git Integration**
   - Click **Connect GitHub** or **Enable GitHub Integration**
   - Authorize Strapi Cloud to access your repository
   - Select the repository: `magdazelena/primer`
   - Configure deployment settings:
     - **Branch**: `main`
     - **Root Directory**: `apps/backend`
     - **Build Command**: `npm run build:all`
     - **Start Command**: `npm start`

4. **Configure Environment Variables**:
   - In Strapi Cloud Dashboard → **Settings** → **Environment Variables**
   - Add all required environment variables for your backend

## Manual Deployment

If needed, you can trigger a manual deployment from your local machine:

```bash
cd apps/backend
npx strapi login --cloud
npx strapi deploy --cloud
```

**Note**: This method requires interactive login and cannot be automated in CI/CD.

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

**Issue**: Deployments not triggering when PRs are merged to `main`

**Solutions**:

1. Verify GitHub integration is enabled in Strapi Cloud Dashboard
2. Check that Strapi Cloud has access to your repository
3. Verify the branch configuration is set to `main`
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

- ✅ **Automatic on PR Merge**: Strapi Cloud deploys automatically when PRs are merged to `main`
- ✅ **No GitHub Actions Needed**: Strapi Cloud handles deployment directly
- ✅ **Project Link Required**: The `.strapi-cloud.json` file must exist and be committed
- ⚠️ **Database**: Strapi Cloud manages the database automatically
- ⚠️ **Environment Variables**: Set in Strapi Cloud dashboard, not in code

## References

- [Strapi Cloud Documentation](https://docs.strapi.io/cloud)
- [Strapi Cloud CLI Documentation](https://docs.strapi.io/cloud/cli/cloud-cli)
- [Strapi Cloud Deployment CLI](https://docs.strapi.io/cloud/getting-started/deployment-cli)
