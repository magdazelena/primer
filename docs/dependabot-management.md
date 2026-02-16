# Dependabot Management

This document explains how Dependabot was previously used in the Primer monorepo and how to manage dependencies **manually** now that Dependabot is disabled.

## Overview

Dependabot is currently **disabled** for this repository. Instead of automated dependency PRs, you manage updates manually using the monorepo dependency tools:

- `npm run deps:check` – Check version consistency for key shared dependencies
- `npm run deps:check-updates` – See which dependencies can be upgraded per workspace (no changes)
- `npm run deps:upgrade` – Apply upgrades in controlled groups

You can still re-enable Dependabot in the future using `scripts/dependabot-config.js`, but the default workflow is now manual and script-driven.

## Manual Dependency Management

### 1. Inspect current versions (consistency only)

Use the existing monorepo checker to see which shared dependencies are aligned or mismatched:

```bash
npm run deps:check
```

This script:

- Discovers all workspaces from the root `package.json`
- Prints versions of key shared deps (ESLint, Jest, TypeScript, Strapi, React)
- Highlights mismatches so you can decide where to align

### 2. See what can be upgraded (no changes)

Use the new `upgrade-deps` helper in **check** mode:

```bash
# Check all workspaces (root + all apps/packages)
npm run deps:check-updates

# Only backend + Strapi plugins
npm run deps:check-updates -- --group=strapi

# Only frontend app
npm run deps:check-updates -- --group=frontend

# Only root package.json
npm run deps:check-updates -- --group=root
```

Notes:

- No files are modified in this mode.
- For scripting/automation, you can also emit a JSON report:

```bash
npm run deps:check-updates -- --group=strapi --json
```

### 3. Apply upgrades in controlled groups

When you are happy with the potential upgrades, you can apply them with **upgrade** mode:

```bash
# Dry-run: see what would change without writing
npm run deps:upgrade -- --group=strapi --dry-run

# Actually apply upgrades to backend + Strapi plugins
npm run deps:upgrade -- --group=strapi

# Upgrade only the frontend app
npm run deps:upgrade:frontend

# Upgrade only root tooling (ESLint/TypeScript/Jest/etc.)
npm run deps:upgrade:root

# Upgrade everything (root + all workspaces)
npm run deps:upgrade
```

Behavior:

- Uses `npm-check-updates` under the hood to bump versions in `package.json`.
- Creates `package.json.backup` next to each changed file so you can easily revert.
- Respects your existing semver strategy – you keep control of ranges (e.g. pinning Strapi or React majors).

### 4. Strapi/React version strategy

Given the current setup:

- `apps/backend` and Strapi plugins use **React 18.3.1** and Strapi 5.x.
- `apps/frontend` can independently move on **React 19.x** and Next.js 16.x.

Recommended approach:

- Use `--group=strapi` to keep `apps/backend` and the Strapi plugins moving together.
- Use `--group=frontend` when you want to adopt newer React/Next features in the frontend without touching the backend.
- Use `--group=root` to periodically refresh ESLint/TypeScript/Jest tooling in a controlled way.

## (Optional) Re-enabling Dependabot

If you decide to bring Dependabot back later:

1. Run:

```bash
npm run dependabot:config generate
```

2. This recreates `.github/dependabot.yml` for all workspaces.
3. To disable Dependabot again, run:

```bash
npm run dependabot:config disable
```

## Best Practices

1. **Upgrade in small, coherent groups**: e.g. `--group=strapi` first, validate backend, then `--group=frontend`.
2. **Use dry-runs before applying**: Always run `--dry-run` the first time for a group.
3. **Commit early, commit often**: Commit after each logical upgrade group so rollbacks are easy.
4. **Respect peer dependencies**: Check plugin peer requirements (e.g. Strapi/React) before jumping major versions.
5. **Keep tooling fresh but stable**: Use `--group=root` regularly so ESLint/TypeScript/Jest don’t drift too far behind.
