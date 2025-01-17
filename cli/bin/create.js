#!/usr/bin/env node

import { Command } from 'commander';
import { resolve } from 'path';
import path from 'path';

import fs from 'fs/promises';
import simpleGit from 'simple-git';

const program = new Command();


program
  .argument('<project-name>', 'Name of the new project')
  .description('Scaffold a new project using the Primer template')
  .action((projectName) => {
    const destination = resolve(process.cwd(), projectName);

    console.log(`Creating project: ${projectName}`);
    cloneTemplate('https://github.com/magdazelena/primer' ,'main',destination);
  });

program.parse(process.argv);


async function cloneTemplate(repoUrl, branch, targetDir) {
  const git = simpleGit();
  // Ensure the target directory exists
  await fs.mkdir(targetDir, { recursive: true });

  // Create a temporary directory for cloning
  const tempDir = path.resolve(targetDir, '.temp-repo');
  await fs.mkdir(tempDir, { recursive: true });
  

  console.log(`Cloning template from ${repoUrl} (${branch})...`);
  await git.clone(repoUrl, tempDir, ['--branch', branch, '--no-checkout']);
  const includes = [];

  await fs.readFile(`${repoUrl}/cli/.template-include`, (err, file) => {
    if (err) throw err;
    file.toString().split('\n').forEach(line => {
      includes.push(line);
    });
  });
  await git.cwd(tempDir).raw(['sparse-checkout', 'init', '--cone']);
  await git.cwd(tempDir).raw(['sparse-checkout', 'set', ...includes]);
  await git.cwd(tempDir).checkout();

  // Copy files from tempDir to targetDir
  await fs.cp(tempDir, targetDir, { recursive: true });

  // Save metadata
  const headHash = await git.cwd(tempDir).revparse(['HEAD']);
  const metadata = {
    repo: repoUrl,
    branch,
    commit: headHash,
  };
  await fs.writeFile(path.join(targetDir, '.template-config.json'), JSON.stringify(metadata, null, 2));

  // Clean up
  await fs.rm(tempDir, { recursive: true, force: true });

  console.log(`Template copied to ${targetDir}`);
}
