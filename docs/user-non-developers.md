# User Non-Developer Guide

## Audience

For operators who want to deploy Primer using prebuilt artifacts without modifying the source code.

## Downloading a Release

1. Go to the [Primer releases](https://github.com/magdazelena/primer/releases) page.
2. Pick the latest **stable** release (avoid pre-releases).
3. Download these assets from the release notes:
   - `primer-frontend-vX.Y.Z.zip` – static frontend bundle
   - `primer-backend-vX.Y.Z.zip` – Strapi backend bundle
   - Any additional deployment guides included in the release
4. Keep the release notes handy for admin credentials, required environment variables, and change highlights.

## Deploying the Backend

1. Unzip `primer-backend-vX.Y.Z.zip` on your server.
2. Ensure Node.js 20+ and a supported database (SQLite default or configure PostgreSQL/MySQL according to the included instructions).
3. Create an `.env` file using the variables listed in the release notes/README (admin JWT, database credentials, API tokens).
4. Install dependencies (`npm ci --omit=dev` or `npm install --omit=dev`) and run the build/start commands:
   ```bash
   npm run build
   npm start
   ```
5. Create your first admin user at `https://<your-domain>/admin` and populate data through Strapi.

## Deploying the Frontend

1. Unzip `primer-frontend-vX.Y.Z.zip` on your static hosting provider or CDN.
2. Set environment variables for API endpoints via your host (e.g., Vercel, Netlify) or edit the bundled configuration file if provided.
3. Upload the static files or use the host’s import workflow.
4. Test protected operations (forms, product browsing) against your deployed backend instance.

## Managing Content

- Use the Strapi admin panel to create products, pages, and categories.
- Publish changes to make them visible on the frontend.
- Back up your database regularly; releases do not bundle your private data.

## Upgrading to a New Release

1. Review the new release notes for migration requirements.
2. Back up your backend database and frontend configuration.
3. Download the new `primer-frontend-…` and `primer-backend-…` archives.
4. Replace your existing deployments with the new builds, then smoke test the site.
5. If issues arise, roll back by redeploying the previous release archives.

## Support

- For deployment questions, open a GitHub Discussion or issue referencing the release tag.
- For urgent fixes, monitor the release issue linked in the notes for hotfix updates.

## References

- [Release process](./releases.md)
- [User developer guide](./user-developers.md)
- [Contributor guide](./contributors.md)
