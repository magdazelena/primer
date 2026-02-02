#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const MONOREPO_ROOT = path.resolve(__dirname, "..");
const PLUGINS_DIR = path.join(MONOREPO_ROOT, "packages");
const BACKEND_PACKAGE_JSON = path.join(MONOREPO_ROOT, "apps/backend/package.json");

function parseVersion(version) {
  const parts = version.split(".").map(Number);
  return { major: parts[0] || 0, minor: parts[1] || 0, patch: parts[2] || 0 };
}

function bumpVersion(version, type = "patch") {
  const v = parseVersion(version);
  if (type === "major") {
    return `${v.major + 1}.0.0`;
  }
  if (type === "minor") {
    return `${v.major}.${v.minor + 1}.0`;
  }
  return `${v.major}.${v.minor}.${v.patch + 1}`;
}

function main() {
  // First arg: plugin name (e.g., "strapi-plugin-status-manager")
  // Second arg: bump type (patch|minor|major)
  const pluginName = process.argv[2];
  const bumpType = process.argv[3] || "patch";

  if (!pluginName) {
    console.error("Usage: node scripts/plugin-deploy.js <plugin-name> [patch|minor|major]");
    console.error("Example: node scripts/plugin-deploy.js strapi-plugin-status-manager patch");
    process.exit(1);
  }

  if (!["patch", "minor", "major"].includes(bumpType)) {
    console.error("Bump type must be: patch, minor, or major");
    process.exit(1);
  }

  const pluginDir = path.join(PLUGINS_DIR, pluginName);
  const pkgPath = path.join(pluginDir, "package.json");

  if (!fs.existsSync(pkgPath)) {
    console.error(`Plugin not found: ${pluginName}`);
    console.error(`Expected at: ${pluginDir}`);
    process.exit(1);
  }

  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
  const oldVersion = pkg.version;
  const newVersion = bumpVersion(oldVersion, bumpType);

  console.log(`Bumping ${pkg.name} ${oldVersion} -> ${newVersion} (${bumpType})`);

  // 1. Bump version in plugin package.json
  pkg.version = newVersion;

  // 2. Bump version in plugin descriptions for Admin display
  // Update top-level description
  if (typeof pkg.description === "string") {
    const base = pkg.description.replace(/\s*\(v[\d.]+\)\s*$/, "").trim();
    pkg.description = `${base} (v${newVersion})`;
  }
  // Update strapi.description (shown in Admin → Plugins)
  if (pkg.strapi && typeof pkg.strapi.description === "string") {
    const base = pkg.strapi.description.replace(/\s*\(v[\d.]+\)\s*$/, "").trim();
    pkg.strapi.description = `${base} (v${newVersion})`;
  }

  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
  console.log("✓ Updated plugin package.json");

  // 3. Bump plugin version in apps/backend/package.json
  if (!fs.existsSync(BACKEND_PACKAGE_JSON)) {
    console.warn("⚠ Backend package.json not found at", BACKEND_PACKAGE_JSON);
  } else {
    const backendPkg = JSON.parse(fs.readFileSync(BACKEND_PACKAGE_JSON, "utf8"));
    if (backendPkg.dependencies && backendPkg.dependencies[pkg.name] !== undefined) {
      backendPkg.dependencies[pkg.name] = `^${newVersion}`;
      fs.writeFileSync(BACKEND_PACKAGE_JSON, JSON.stringify(backendPkg, null, 2) + "\n");
      console.log(`✓ Updated apps/backend/package.json dependency to ^${newVersion}`);
    } else {
      console.warn(`⚠ Plugin ${pkg.name} not found in backend dependencies`);
    }
  }

  // 4. Build plugin
  console.log("Building plugin...");
  execSync("npm run build", { cwd: pluginDir, stdio: "inherit" });
  console.log("✓ Build complete");

  // 5. Publish to npm
  console.log("Publishing to npm...");
  execSync("npm publish --access public", { cwd: pluginDir, stdio: "inherit" });
  console.log("✓ Published to npm");

  console.log(`\n✅ Done! Version ${newVersion} published for ${pkg.name}`);
}

main();
