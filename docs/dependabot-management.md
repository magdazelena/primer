# Dependabot Management

This document explains how to manage Dependabot dependency updates in the Primer monorepo.

## Overview

The Dependabot configuration is automatically generated based on two simple lists:
1. **Restricted Dependencies** - Dependencies that should NOT be updated by Dependabot
2. **Exempted Workspaces** - Workspaces that are allowed to update restricted dependencies

## Current Configuration

### Restricted Dependencies
These dependencies are automatically ignored by Dependabot in most workspaces to maintain version consistency:

- `react`
- `react-dom` 
- `react-router-dom`
- `styled-components`
- `@types/react`
- `@types/react-dom`

### Exempted Workspaces
These workspaces CAN update restricted dependencies:

- `apps/frontend` - Frontend can update React to latest versions

### Other Workspaces
All other workspaces automatically ignore restricted dependencies:
- `apps/backend` - Maintains React 18.3.1 for compatibility
- `packages/*` - Various packages that shouldn't update React
- `cli` - CLI tools that don't need React updates

## Managing the Configuration

### View Current Settings
```bash
npm run dependabot:config show
```

### Update Configuration
```bash
npm run dependabot:config generate
```

### Customizing Restrictions

To modify which dependencies are restricted or which workspaces are exempted:

1. Edit `scripts/dependabot-config.js`
2. Modify the `RESTRICTED_DEPENDENCIES` array
3. Modify the `EXEMPTED_WORKSPACES` array
4. Run `npm run dependabot:config generate`

### Example: Adding a New Restricted Dependency

```javascript
// In scripts/dependabot-config.js
const RESTRICTED_DEPENDENCIES = [
  'react',
  'react-dom',
  'react-router-dom',
  'styled-components',
  '@types/react',
  '@types/react-dom',
  'next' // Add this to restrict Next.js updates
];
```

### Example: Exempting a New Workspace

```javascript
// In scripts/dependabot-config.js
const EXEMPTED_WORKSPACES = [
  'apps/frontend',
  'apps/new-app' // Add this to allow React updates in new-app
];
```

## How It Works

1. **Dependabot Configuration**: The `.github/dependabot.yml` file is automatically generated with appropriate ignore rules for each workspace
2. **Auto-merge Action**: The `.github/actions/dependabot-automerge/action.yml` automatically merges PRs but requires manual approval for:
   - Major version bumps (`version-update:semver-major`)
   - Low compatibility scores (< 0.5)
3. **Version Consistency**: Restricted dependencies maintain consistent versions across workspaces unless explicitly exempted
4. **Version Strategy**: Uses `versioning-strategy: increase-if-necessary` to ensure Dependabot only updates within the current semver range (e.g., React 18.x packages won't be updated to React 19.x)

## Benefits

- **Centralized Management**: All dependency restrictions are defined in one place
- **Automatic Generation**: No need to manually edit complex YAML files
- **Flexible Exemptions**: Easy to allow specific workspaces to update restricted dependencies
- **Version Consistency**: Prevents dependency version mismatches across the monorepo
- **Maintainable**: Simple arrays to modify instead of complex YAML structures

## Troubleshooting

### Dependabot Still Creating PRs for Restricted Dependencies

1. Check if the workspace is in the `EXEMPTED_WORKSPACES` list
2. Verify the dependency name matches exactly in `RESTRICTED_DEPENDENCIES`
3. Run `npm run dependabot:config generate` to regenerate the configuration
4. Check that the generated `.github/dependabot.yml` has the correct ignore rules

### Need to Update a Restricted Dependency

1. **Option 1**: Add the workspace to `EXEMPTED_WORKSPACES` if it should always be able to update
2. **Option 2**: Temporarily remove the dependency from `RESTRICTED_DEPENDENCIES`, update, then add it back
3. **Option 3**: Manually update the dependency and ensure all workspaces are updated simultaneously

## Integration with Dependency Management

This system works alongside the existing dependency management scripts:

- `npm run deps:check` - Check dependency versions across workspaces
- `npm run deps:update` - Update shared dependencies
- `npm run dependabot:config` - Manage Dependabot configuration

The Dependabot restrictions ensure that the manual dependency management scripts remain the primary way to update React dependencies across the entire monorepo.

## Auto-merge Behavior

The automerge action automatically approves and merges Dependabot PRs for:
- Minor version updates (`version-update:semver-minor`)
- Patch version updates (`version-update:semver-patch`)
- Updates with compatibility score ≥ 0.5

Manual approval is required for:
- Major version bumps (`version-update:semver-major`)
- Updates with compatibility score < 0.5

## Version Range Handling

Dependabot respects semver ranges in `package.json`. With `versioning-strategy: increase-if-necessary`:
- Packages with `"react": "^19.0.0"` will only receive updates within the 19.x range
- Packages with `"react": "18.3.1"` (exact version) won't be updated to 19.x
- This ensures different packages can maintain different major versions without conflicts

## Best Practices

1. **Use semantic versioning ranges**: Use `^` or `~` prefixes to allow appropriate updates
2. **Review major updates**: Always review major version bumps for breaking changes
3. **Monitor compatibility scores**: Low scores indicate potential compatibility issues
4. **Group related updates**: Use Dependabot groups for related dependencies (e.g., React ecosystem)
5. **Regular maintenance**: Review and merge minor/patch updates regularly to stay current
