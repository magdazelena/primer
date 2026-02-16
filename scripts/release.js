#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const ROOT = process.cwd();
const TEMPLATE_VERSION_PATH = path.join(ROOT, "template-version.json");
const ROOT_PKG_PATH = path.join(ROOT, "package.json");
const BACKEND_PKG_PATH = path.join(ROOT, "apps", "backend", "package.json");
const FRONTEND_PKG_PATH = path.join(ROOT, "apps", "frontend", "package.json");
const RELEASE_TEMPLATE_PATH = path.join(
  ROOT,
  ".github",
  "release-template.md"
);

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n");
}

function parseVersion(version) {
  const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(version);
  if (!match) {
    throw new Error(`Invalid semver version: ${version}`);
  }
  return {
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3]),
  };
}

function bumpVersion(current, type) {
  const v = parseVersion(current);
  if (type === "major") {
    return `${v.major + 1}.0.0`;
  }
  if (type === "minor") {
    return `${v.major}.${v.minor + 1}.0`;
  }
  // default patch
  return `${v.major}.${v.minor}.${v.patch + 1}`;
}

function determineTargetVersion(arg) {
  const current = readJson(TEMPLATE_VERSION_PATH).version;

  if (!arg) {
    throw new Error(
      "Missing version argument. Use explicit version (e.g. 0.0.4) or bump type (patch|minor|major)."
    );
  }

  if (["patch", "minor", "major"].includes(arg)) {
    return bumpVersion(current, arg);
  }

  // explicit version like 0.0.4
  parseVersion(arg); // will throw if invalid
  return arg;
}

function updateVersions(targetVersion) {
  // template-version.json
  const templateVersion = readJson(TEMPLATE_VERSION_PATH);
  templateVersion.version = targetVersion;
  writeJson(TEMPLATE_VERSION_PATH, templateVersion);

  // root package.json
  const rootPkg = readJson(ROOT_PKG_PATH);
  rootPkg.version = targetVersion;
  writeJson(ROOT_PKG_PATH, rootPkg);

  // backend package.json
  if (fs.existsSync(BACKEND_PKG_PATH)) {
    const backendPkg = readJson(BACKEND_PKG_PATH);
    backendPkg.version = targetVersion;
    writeJson(BACKEND_PKG_PATH, backendPkg);
  }

  // frontend package.json
  if (fs.existsSync(FRONTEND_PKG_PATH)) {
    const frontendPkg = readJson(FRONTEND_PKG_PATH);
    frontendPkg.version = targetVersion;
    writeJson(FRONTEND_PKG_PATH, frontendPkg);
  }
}

function getCurrentBranch() {
  try {
    const out = execSync("git rev-parse --abbrev-ref HEAD", {
      cwd: ROOT,
      encoding: "utf8",
    }).trim();
    return out;
  } catch {
    return null;
  }
}

function ensureReleaseBranchMatchesVersion(version) {
  const branch = getCurrentBranch();
  if (!branch) {
    console.warn("⚠️  Could not determine current git branch. Skipping branch check.");
    return;
  }
  const expected = `release/v${version}`;
  if (branch !== expected) {
    console.warn(
      `⚠️  Current branch is "${branch}", expected "${expected}". Versions were bumped anyway.`
    );
  }
}

function gitCommitVersionBump(version) {
  try {
    execSync("git add template-version.json package.json apps/backend/package.json apps/frontend/package.json", {
      cwd: ROOT,
      stdio: "inherit",
    });
    execSync(`git commit -m "chore: bump version to v${version}"`, {
      cwd: ROOT,
      stdio: "inherit",
    });
    console.log(`✅ Committed version bump to v${version}`);
  } catch (error) {
    console.warn(
      "⚠️  Failed to create commit for version bump. You may need to commit manually."
    );
  }
}

function getLatestTag() {
  try {
    const out = execSync("git tag --sort=-creatordate", {
      cwd: ROOT,
      encoding: "utf8",
    })
      .split("\n")
      .map((t) => t.trim())
      .filter(Boolean)[0];
    return out || null;
  } catch {
    return null;
  }
}

function generateChangelogSection(fromTag) {
  let range = "";
  if (fromTag) {
    range = `${fromTag}..HEAD`;
  } else {
    range = "--since=\"30 days ago\"";
  }

  try {
    const log = fromTag
      ? execSync(`git log ${range} --pretty=format:"- %s"`, {
          cwd: ROOT,
          encoding: "utf8",
        })
      : execSync(`git log ${range} --pretty=format:"- %s"`, {
          cwd: ROOT,
          encoding: "utf8",
          shell: true,
        });

    return log.trim() || "- No notable changes listed.";
  } catch {
    return "- No changelog available (git log failed).";
  }
}

function buildPrDescription(version) {
  const tag = `v${version}`;
  const today = new Date().toISOString().slice(0, 10);
  const template = fs.readFileSync(RELEASE_TEMPLATE_PATH, "utf8");
  const latestTag = getLatestTag();
  const changelog = generateChangelogSection(latestTag);

  let body = template
    .replace(/{{VERSION}}/g, tag)
    .replace(/{{DATE}}/g, today)
    .replace(/{{TAG}}/g, tag);

  // Simple heuristic: append changelog under "## Changed" if present.
  if (body.includes("## Changed")) {
    body = body.replace("## Changed", `## Changed\n\n${changelog}\n`);
  } else {
    body += `\n\n## Changes\n\n${changelog}\n`;
  }

  return body;
}

function showHelp() {
  console.log(`
🔧 Primer Release Helper

Usage: node scripts/release.js <version|patch|minor|major> [--pr]

Examples:
  node scripts/release.js 0.0.4
  node scripts/release.js patch
  node scripts/release.js minor --pr
  node scripts/release.js 0.0.4 --pr

Behavior:
  - Reads current version from template-version.json
  - Computes target version from explicit value or bump type
  - Updates:
      - template-version.json
      - package.json
      - apps/backend/package.json
      - apps/frontend/package.json
  - Checks that current branch name matches release/vX.Y.Z (warning only)
  - Creates a commit: "chore: bump version to vX.Y.Z" (if possible)
  - With --pr: prints a pre-filled PR/release description to stdout
`);
}

function main() {
  const arg = process.argv[2];
  const wantsPr = process.argv.slice(3).includes("--pr");

  if (!arg || arg === "help" || arg === "--help" || arg === "-h") {
    showHelp();
    return;
  }

  let targetVersion;
  try {
    targetVersion = determineTargetVersion(arg);
  } catch (error) {
    console.error(`❌ ${error.message}`);
    process.exit(1);
  }

  console.log(`🎯 Target version: v${targetVersion}`);

  updateVersions(targetVersion);
  ensureReleaseBranchMatchesVersion(targetVersion);
  gitCommitVersionBump(targetVersion);

  if (wantsPr) {
    const body = buildPrDescription(targetVersion);
    const outputFile = path.join(
      ROOT,
      `release-notes-v${targetVersion}.md`
    );
    fs.writeFileSync(outputFile, body);
    console.log(
      `\n✅ Generated PR/release description at ${outputFile}\n\n-----\n`
    );
    console.log(body);
  } else {
    console.log(
      "\nℹ️  No PR description requested. Run again with --pr to generate one."
    );
  }
}

main();

