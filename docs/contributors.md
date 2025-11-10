# Contributor Guide

## Audience

For developers contributing code to Primer via forks or branches. Follow this guide when cloning the repository, submitting pull requests, and participating in releases.

## Local Environment Setup

1. Clone your fork and install dependencies:
   ```bash
   git clone https://github.com/<your-user>/primer.git
   cd primer
   npm run setup
   ```
2. Create environment files and populate them using the variables listed in `README.md`:
   - Backend: create `apps/backend/.env` with the values described in the root README.
   - Frontend: create `apps/frontend/.env` and supply frontend tokens/URLs from your Strapi instance.
3. Seed Strapi with template data when needed:
   ```bash
   cd apps/backend
   npm run seed
   ```
4. Start services from the repo root:
   ```bash
   npm run dev
   ```
