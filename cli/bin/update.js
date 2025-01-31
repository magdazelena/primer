import fs from 'fs/promises';
import path from 'path';
import simpleGit from 'simple-git';
import { includes } from './templateinclude.js';

async function fetchLatestRemoteCommit(repoUrl, branch) {
  const git = simpleGit();
  const tempDir = path.resolve(process.cwd(), '.temp-repo');


  try {
    await git.clone(repoUrl, tempDir, ['--branch', branch, '--no-checkout']);

    await git.cwd(tempDir).raw(['sparse-checkout', 'init', '--cone']);
    await git.cwd(tempDir).raw(['sparse-checkout', 'set', ...includes]);
    await git.cwd(tempDir).checkout();
    const latestCommit = await git.cwd(tempDir).revparse(['HEAD']);
    await fs.rm(tempDir, { recursive: true, force: true });
    return latestCommit;
  } catch (error) {
    console.error('Error fetching latest remote commit:', error);
    return null;
  }
}

async function getLocalMetadata(projectDir) {
  try {
    const metadataPath = path.join(projectDir, '.template-config.json');
    const metadata = JSON.parse(await fs.readFile(metadataPath, 'utf8'));
    return metadata;
  } catch (error) {
    console.error('Error reading local metadata:', error);
    return null;
  }
}

async function updateProject(projectDir) {
  const metadata = await getLocalMetadata(projectDir);

  if (!metadata) {
    console.error('No metadata found. Cannot determine update source.');
    return;
  }

  const { repo, branch, commit: currentCommit } = metadata;
  console.log(`Current template commit: ${currentCommit}`);

  const latestCommit = await fetchLatestRemoteCommit(repo, branch);

  if (!latestCommit) {
    console.error('Unable to fetch latest commit from remote.');
    return;
  }

  if (currentCommit === latestCommit) {
    console.log('Your project is already up-to-date.');
  } else {
    console.log(`Updating to latest commit: ${latestCommit}`);

    // Pull updates
    const tempDir = path.resolve(projectDir, '.temp-repo');
    const git = simpleGit();
    await git.clone(repo, tempDir, ['--branch', branch, '--single-branch']);

    // Merge files
    await fs.cp(tempDir, projectDir, { recursive: true });

    // Update metadata
    const updatedMetadata = { ...metadata, commit: latestCommit };
    await fs.writeFile(path.join(projectDir, '.template-config.json'), JSON.stringify(updatedMetadata, null, 2));

    // Clean up
    await fs.rm(tempDir, { recursive: true, force: true });

    console.log('Project updated successfully.');
  }
}

const projectDir = process.cwd(); // Assume the current working directory is the project directory
updateProject(projectDir);
