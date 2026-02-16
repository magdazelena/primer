#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configuration: Workspaces that should group React-related dependencies
// This groups React updates together for easier review
const REACT_GROUP_WORKSPACES = [
  'apps/frontend' // Frontend groups React updates together
];

// Automatically discover workspaces from root package.json
function getWorkspaces() {
  try {
    const rootPackage = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const workspaces = rootPackage.workspaces || [];
    
    const expandedWorkspaces = [];
    workspaces.forEach(pattern => {
      if (pattern.includes('*')) {
        const baseDir = pattern.replace('/*', '');
        if (fs.existsSync(baseDir)) {
          const subdirs = fs.readdirSync(baseDir, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => path.join(baseDir, dirent.name));
          expandedWorkspaces.push(...subdirs);
        }
      } else {
        if (fs.existsSync(pattern)) {
          expandedWorkspaces.push(pattern);
        }
      }
    });
    
    return expandedWorkspaces.filter(workspace => {
      return fs.existsSync(path.join(workspace, 'package.json'));
    });
  } catch (error) {
    console.error('❌ Failed to read root package.json:', error.message);
    return [];
  }
}

function generateDependabotConfig() {
  console.log('🔧 Generating Dependabot configuration...\n');
  
  const workspaces = getWorkspaces();
  console.log(`📦 Found ${workspaces.length} workspaces: ${workspaces.join(', ')}\n`);
  
  let config = `version: 2

updates:
  # Root workspace dependencies
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
      time: "09:00"
    target-branch: "main"
    versioning-strategy: increase-if-necessary
    labels:
      - "npm dependencies"
      - "root"
      - "dependencies"
    reviewers:
      - "magdazelena"
    assignees:
      - "magdazelena"
    commit-message:
      prefix: "chore"
      include: "scope"
    open-pull-requests-limit: 10
`;

  // Generate config for each workspace
  workspaces.forEach(workspace => {
    const workspaceName = workspace.split('/').pop();
    const shouldGroupReact = REACT_GROUP_WORKSPACES.includes(workspace);
    
    config += `
  # ${workspaceName} dependencies
  - package-ecosystem: "npm"
    directory: "/${workspace}"
    schedule:
      interval: "weekly"
      day: "monday"
      time: "09:00"
    target-branch: "main"
    versioning-strategy: increase-if-necessary
    labels:
      - "npm dependencies"
      - "${workspaceName}"
      - "dependencies"
    reviewers:
      - "magdazelena"
    assignees:
      - "magdazelena"
    commit-message:
      prefix: "chore"
      include: "scope"
    open-pull-requests-limit: 10`;

    // Add React dependency grouping for workspaces that benefit from grouped updates
    if (shouldGroupReact) {
      config += `
    # Group React-related updates together for easier review
    groups:
      react-dependencies:
        patterns:
          - "react*"
          - "@types/react*"
        update-types:
          - "minor"
          - "patch"`;
    }
    
    config += '\n';
  });

  // Add GitHub Actions configuration
  config += `  # GitHub Actions
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
      time: "09:00"
    target-branch: "main"
    labels:
      - "github-actions"
      - "dependencies"
    reviewers:
      - "magdazelena"
    assignees:
      - "magdazelena"
    commit-message:
      prefix: "ci"
      include: "scope"
`;

  return config;
}

function updateDependabotConfig() {
  console.log('🔄 Updating .github/dependabot.yml...\n');
  
  try {
    const config = generateDependabotConfig();
    fs.writeFileSync('.github/dependabot.yml', config);
    console.log('✅ Dependabot configuration updated successfully!');
    console.log('\n📋 Configuration summary:');
    console.log(`   - Versioning strategy: increase-if-necessary (respects semver ranges)`);
    console.log(`   - React grouping enabled for: ${REACT_GROUP_WORKSPACES.join(', ')}`);
    console.log(`   - All packages respect their own version constraints automatically`);
    
  } catch (error) {
    console.error('❌ Failed to update Dependabot configuration:', error.message);
  }
}

function showCurrentConfig() {
  console.log('📋 Current Dependabot Configuration:\n');
  console.log('📦 React Grouping Workspaces:');
  REACT_GROUP_WORKSPACES.forEach(workspace => console.log(`   - ${workspace}`));
  
  console.log('\n🔧 Versioning Strategy:');
  console.log('   - increase-if-necessary (respects semver ranges in package.json)');
  console.log('   - Packages with "react": "^18.0.0" will only update within 18.x');
  console.log('   - Packages with "react": "^19.0.0" will only update within 19.x');
  console.log('   - No manual restrictions needed - version constraints are automatically respected');
}

function showHelp() {
  console.log(`
🔧 Dependabot Configuration Generator

Usage: node scripts/dependabot-config.js [command]

Commands:
  generate    Generate and update .github/dependabot.yml
  show        Show current configuration settings
  disable     Remove .github/dependabot.yml to fully disable Dependabot
  help        Show this help message

Configuration:
  Edit the REACT_GROUP_WORKSPACES array at the top of this script
  to enable React dependency grouping for specific workspaces.
  
  Note: With versioning-strategy: increase-if-necessary, all packages
  automatically respect their semver ranges - no manual restrictions needed.

Examples:
  node scripts/dependabot-config.js generate
  node scripts/dependabot-config.js show
  node scripts/dependabot-config.js disable
`);
}

const command = process.argv[2] || 'help';

switch (command) {
  case 'generate':
    updateDependabotConfig();
    break;
  case 'show':
    showCurrentConfig();
    break;
  case 'disable':
    try {
      const dependabotPath = path.join('.github', 'dependabot.yml');
      if (fs.existsSync(dependabotPath)) {
        fs.unlinkSync(dependabotPath);
        console.log('✅ .github/dependabot.yml removed. Dependabot is now disabled for this repo.');
      } else {
        console.log('ℹ️  No .github/dependabot.yml file found. Dependabot is already disabled.');
      }
    } catch (error) {
      console.error('❌ Failed to remove .github/dependabot.yml:', error.message);
    }
    break;
  case 'help':
  default:
    showHelp();
    break;
}
