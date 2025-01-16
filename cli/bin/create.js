#!/usr/bin/env node

import { Command } from 'commander';
import { copy } from 'fs-extra';
import { resolve } from 'path';
import path from 'path';
import { fileURLToPath } from 'url';

const program = new Command();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

program
  .argument('<project-name>', 'Name of the new project')
  .description('Scaffold a new project using the Primer template')
  .action((projectName) => {
    const source = resolve(__dirname, '../../'); // Path to monorepo root
    const destination = resolve(process.cwd(), projectName);

    console.log(`Creating project: ${projectName}`);
    console.log(`Copying files from ${source} to ${destination}...`);

    copy(source, destination, { overwrite: false })
      .then(() => {
        console.log('Project created successfully!');
        console.log(`Run 'cd ${projectName} && yarn install' to get started.`);
      })
      .catch((err) => {
        console.error('Error creating project:', err.message);
        process.exit(1);
      });
  });

program.parse(process.argv);
