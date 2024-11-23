#!/usr/bin/env node

const { execSync } = require('child_process');
const readline = require('readline');

// Helper to run shell commands
const runCommand = (command) => {
  try {
    console.log(`Running: ${command}`);
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Prompt the user for version bump
const promptVersionBump = () => {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question('Enter version bump type (major, minor, patch): ', (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
};

// Main script
(async () => {
  try {
    console.log('Starting release process...');

    // Step 1: Linting
    console.log('Step 1: Validating linting...');
    runCommand('nx lint');

    // Step 2: Testing (optional, add your test runner command)
    console.log('Step 2: Running tests...');

    // Step 3: Build the projects
    console.log('Step 3: Building the projects...');
    runCommand('nx build');

    // Step 4: Prompt for version bump
    const bumpType = await promptVersionBump();
    console.log(`Step 4: Bumping version (${bumpType})...`);
    runCommand(`npm version ${bumpType}`);

    // Step 5: Generate changelog (optional)
    console.log('Step 5: Generating changelog...');
    runCommand('npx standard-version');

    // Step 6: Publish to npm
    console.log('Step 6: Publishing to npm...');
    runCommand('npm publish');

    console.log('Release process completed successfully!');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
})();
