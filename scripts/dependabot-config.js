#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configuration: Dependencies that should NOT be updated by Dependabot
const RESTRICTED_DEPENDENCIES = [
  'react',
  'react-dom',
  'react-router-dom',
  'styled-components',
  '@types/react',
  '@types/react-dom'
];

// Configuration: Workspaces that are EXEMPTED from the above restrictions
// These workspaces CAN update the restricted dependencies
const EXEMPTED_WORKSPACES = [
  'apps/frontend' // Frontend can update React to latest versions
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
    const isExempted = EXEMPTED_WORKSPACES.includes(workspace);
    
    config += `
  # ${workspaceName} dependencies
  - package-ecosystem: "npm"
    directory: "/${workspace}"
    schedule:
      interval: "weekly"
      day: "monday"
      time: "09:00"
    target-branch: "main"
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

    // Add React dependency grouping for exempted workspaces
    if (isExempted) {
      config += `
    # Group React-related updates together (exempted from restrictions)
    groups:
      react-dependencies:
        patterns:
          - "react*"
          - "@types/react*"
        update-types:
          - "minor"
          - "patch"`;
    } else {
      // Add ignore rules for restricted dependencies
      config += `
    # Ignore restricted dependencies to maintain version consistency
    ignore:`;
      
      RESTRICTED_DEPENDENCIES.forEach(dep => {
        config += `
      - dependency-name: "${dep}"
        update-types: ["version-update:semver-major", "version-update:semver-minor", "version-update:semver-patch"]`;
      });
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
    console.log(`   - Restricted dependencies: ${RESTRICTED_DEPENDENCIES.join(', ')}`);
    console.log(`   - Exempted workspaces: ${EXEMPTED_WORKSPACES.join(', ')}`);
    console.log(`   - Other workspaces will ignore restricted dependencies`);
    
  } catch (error) {
    console.error('❌ Failed to update Dependabot configuration:', error.message);
  }
}

function showCurrentConfig() {
  console.log('📋 Current Dependabot Configuration:\n');
  console.log('🚫 Restricted Dependencies (will be ignored by Dependabot):');
  RESTRICTED_DEPENDENCIES.forEach(dep => console.log(`   - ${dep}`));
  
  console.log('\n✅ Exempted Workspaces (can update restricted dependencies):');
  EXEMPTED_WORKSPACES.forEach(workspace => console.log(`   - ${workspace}`));
  
  console.log('\n🔒 Other workspaces will automatically ignore restricted dependencies');
}

function showHelp() {
  console.log(`
🔧 Dependabot Configuration Generator

Usage: node scripts/dependabot-config.js [command]

Commands:
  generate    Generate and update .github/dependabot.yml
  show        Show current configuration settings
  help        Show this help message

Configuration:
  Edit the RESTRICTED_DEPENDENCIES and EXEMPTED_WORKSPACES arrays
  at the top of this script to customize what gets updated where.

Examples:
  node scripts/dependabot-config.js generate
  node scripts/dependabot-config.js show
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
  case 'help':
  default:
    showHelp();
    break;
}
