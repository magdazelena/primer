# User Developer Guide

## Audience

For developers who download Primer as a template, customise it for their project, and manage their own infrastructure without contributing back to the repo.

## Getting the Code

1. Visit the [GitHub Releases](https://github.com/magdazelena/primer/releases) page.
2. Download the desired release source archive (`Source code (zip/tar.gz)`) or clone the repo and checkout the tag:
   ```bash
   git clone https://github.com/magdazelena/primer.git
   cd primer
   git checkout vX.Y.Z
   ```
3. Review the release notes for breaking changes, upgrade steps, and asset descriptions.

## Initial Setup

- Install dependencies with `npm run setup` from the project root.
- Create environment files based on the variables documented in `README.md`:
  - Backend: add secrets to `apps/backend/.env` (APP_KEYS, JWT secrets, database config, etc.).
  - Frontend: configure `apps/frontend/.env` with your Strapi API tokens and URLs.
- Decide whether to import the sample seed data (`apps/backend/seed-data.tar.gz`). You can skip it and start with empty collections.

## Customising Data

- Access Strapi admin (`npm run backend`) to define content types, create entries, and configure roles.
- Remove example content from frontend fixtures and update navigation/menu configuration as needed.
- Keep environment-specific data out of version control (use `.env` files and deployment secrets).

## Local Development Workflow

- Run backend and frontend together with `npm run dev`.
- Execute tests before deploying: `npm test` and `npm run lint`.
- Commit your changes to your own repository; keep Primer as an upstream remote to pull future updates.

## Staying Up to Date

- Monitor release notes for new tags.
- When upgrading:
  1. Fetch upstream updates and checkout the new tag.
  2. Review migration notes and apply adjustments to your fork.
  3. Re-run tests and content validation.
- Use Git merge or rebase minimally to integrate upstream changes, resolving conflicts in customised files manually.

## Deployment Tips

- Frontend: run `npm run -w frontend build` and deploy the `.next`/static output to your hosting provider.
- Backend: run `npm run -w backend build` and deploy the generated Strapi build to your server (Node.js 20+ recommended).
- Store infrastructure-as-code or deployment scripts in your own repository to avoid conflicts with Primer updates.

## References

- [Release process](./releases.md)
- [Contributor guide](./contributors.md)
- [User non-developer guide](./user-non-developers.md)
