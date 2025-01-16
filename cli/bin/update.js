#!/usr/bin/env node

import { execSync } from 'child_process';
import { resolve } from 'path';
import { existsSync, promises as fs } from 'fs';
import { path } from 'path';

async function checkVersion() {
  const userVersionPath = path.resolve(process.cwd(), '.template-version.json');
  const templateVersionPath = path.resolve(__dirname, '../../template-version.json');
  
  if (!existsSync(userVersionPath)) {
    console.error('No .template-version.json found. Unable to determine project version.');
    process.exit(1);
  }
  
  const userVersion = (await readJsonFile(userVersionPath)).version;
  const templateVersion = (await readJsonFile(templateVersionPath)).version;
  
  if (userVersion === templateVersion) {
    console.log('Your project is up to date.');
    return;
  }
  
  console.log(`Update available: ${userVersion} -> ${templateVersion}`);
  updateProject();
}
  
checkVersion();
const updateProject = () => {

  console.log('Updating project with the latest template changes...');

  try {
    // Ensure this is a project created with the template
    const configPath = resolve(process.cwd(), '.template-config.json');
    if (!existsSync(configPath)) {
      throw new Error('No .template-config.json found. Are you in a valid project directory?');
    }

    // Fetch updates from the monorepo
    console.log('Fetching updates...');
    execSync('git pull origin main', { stdio: 'inherit' });

    // Run migrations if using Nx
    console.log('Applying migrations...');
    execSync('nx migrate latest', { stdio: 'inherit' });
    execSync('yarn install', { stdio: 'inherit' });
    execSync('nx run-migrations', { stdio: 'inherit' });

    console.log('Update complete! Please review changes before committing.');
  } catch (err) {
    console.error('Error during update:', err.message);
    process.exit(1);
  }
};

async function readJsonFile(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    const json = JSON.parse(data);
    return json;
  } catch (error) {
    console.error('Error reading JSON file:', error);
    throw error;
  }
}