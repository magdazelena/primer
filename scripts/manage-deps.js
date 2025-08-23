#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Automatically discover workspaces from root package.json
function getWorkspaces() {
  try {
    const rootPackage = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const workspaces = rootPackage.workspaces || [];
    
    // Expand wildcards and filter out non-existent directories
    const expandedWorkspaces = [];
    workspaces.forEach(pattern => {
      if (pattern.includes('*')) {
        // Handle wildcard patterns like "apps/*", "packages/*"
        const baseDir = pattern.replace('/*', '');
        if (fs.existsSync(baseDir)) {
          const subdirs = fs.readdirSync(baseDir, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => path.join(baseDir, dirent.name));
          expandedWorkspaces.push(...subdirs);
        }
      } else {
        // Direct path
        if (fs.existsSync(pattern)) {
          expandedWorkspaces.push(pattern);
        }
      }
    });
    
    // Filter out workspaces that don't have package.json
    const validWorkspaces = expandedWorkspaces.filter(workspace => {
      const hasPackageJson = fs.existsSync(path.join(workspace, 'package.json'));
      if (!hasPackageJson) {
        console.log(`⚠️  Skipping ${workspace} - no package.json found`);
      }
      return hasPackageJson;
    });
    
    console.log(`🔍 Discovered ${validWorkspaces.length} workspaces: ${validWorkspaces.join(', ')}`);
    return validWorkspaces;
  } catch (error) {
    console.error('❌ Failed to read root package.json:', error.message);
    return [];
  }
}

const SHARED_DEPS = [
  '@eslint/eslintrc',
  '@eslint/js', 
  'eslint',
  'jest',
  '@types/jest',
  'ts-jest',
  'typescript'
];

const STRAPI_DEPS = [
  '@strapi/strapi',
  '@strapi/admin',
  '@strapi/content-manager',
  '@strapi/types',
  '@strapi/utils',
  '@strapi/design-system',
  '@strapi/icons',
  '@strapi/plugin-users-permissions'
];

const REACT_DEPS = ['react', 'react-dom', 'react-router-dom', '@types/react', '@types/react-dom', 'styled-components'];

function getPackageJson(workspacePath) {
  const packagePath = path.join(workspacePath, 'package.json');
  if (fs.existsSync(packagePath)) {
    return JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  }
  return null;
}

function getDependencyVersion(pkg, depName, type = 'dependencies') {
  return pkg[type]?.[depName] || pkg.devDependencies?.[depName] || pkg.peerDependencies?.[depName];
}

function checkVersions() {
  console.log('🔍 Checking dependency versions across workspaces...\n');
  
  const versions = {};
  const workspaces = getWorkspaces();
  
  // Collect all versions
  workspaces.forEach(workspace => {
    const pkg = getPackageJson(workspace);
    if (!pkg) return;
    
    console.log(`📦 ${workspace}:`);
    
    SHARED_DEPS.forEach(dep => {
      const version = getDependencyVersion(pkg, dep);
      if (version) {
        if (!versions[dep]) versions[dep] = new Set();
        versions[dep].add(version);
        console.log(`  ${dep}: ${version}`);
      }
    });
    
    // Check Strapi dependencies separately
    STRAPI_DEPS.forEach(dep => {
      const version = getDependencyVersion(pkg, dep);
      if (version) {
        if (!versions[dep]) versions[dep] = new Set();
        versions[dep].add(version);
        console.log(`  ${dep}: ${version} (Strapi)`);
      }
    });
    
    // Check React versions separately
    REACT_DEPS.forEach(dep => {
      const version = getDependencyVersion(pkg, dep);
      if (version) {
        console.log(`  ${dep}: ${version} (React-specific)`);
      }
    });
    
    console.log('');
  });
  
  // Report mismatches
  console.log('📊 Version Analysis:');
  Object.entries(versions).forEach(([dep, versionSet]) => {
    if (versionSet.size > 1) {
      console.log(`  ⚠️  ${dep}: Multiple versions found - ${Array.from(versionSet).join(', ')}`);
    } else {
      console.log(`  ✅ ${dep}: Consistent version - ${Array.from(versionSet)[0]}`);
    }
  });
}

function updateSharedDeps() {
  console.log('🔄 Updating shared dependencies...\n');
  
  // Update root dependencies first
  console.log('📦 Updating root dependencies...');
  try {
    execSync('npm update', { stdio: 'inherit', cwd: '.' });
  } catch (error) {
    console.error('❌ Failed to update root dependencies');
  }
  
  // Update each workspace
  const workspaces = getWorkspaces();
  workspaces.forEach(workspace => {
    console.log(`\n📦 Updating ${workspace}...`);
    try {
      execSync('npm update', { stdio: 'inherit', cwd: workspace });
    } catch (error) {
      console.error(`❌ Failed to update ${workspace}`);
    }
  });
  
  console.log('\n✅ Dependency update complete!');
}

function installDeps() {
  console.log('📥 Installing dependencies...\n');
  
  try {
    execSync('npm install', { stdio: 'inherit', cwd: '.' });
    console.log('✅ Dependencies installed successfully!');
  } catch (error) {
    console.error('❌ Failed to install dependencies');
  }
}

function showHelp() {
  console.log(`
🔧 Primer Monorepo Dependency Manager

Usage: node scripts/manage-deps.js [command]

Commands:
  check     Check dependency versions across workspaces
  update    Update shared dependencies across workspaces
  install   Install all dependencies
  help      Show this help message

Examples:
  node scripts/manage-deps.js check
  node scripts/manage-deps.js update
  node scripts/manage-deps.js install

Note: Workspaces are automatically discovered from package.json workspaces field
`);
}

const command = process.argv[2] || 'help';

switch (command) {
  case 'check':
    checkVersions();
    break;
  case 'update':
    updateSharedDeps();
    break;
  case 'install':
    installDeps();
    break;
  case 'help':
  default:
    showHelp();
    break;
}
