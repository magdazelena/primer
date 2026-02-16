#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync, spawnSync } = require("child_process");

// We keep grouping logic simple and explicit to avoid surprises.
// Groups are defined in terms of workspaces and dependency name sets.

const ROOT_DIR = process.cwd();

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function getRootPackageJson() {
  return readJson(path.join(ROOT_DIR, "package.json"));
}

function getWorkspaces() {
  try {
    const rootPackage = getRootPackageJson();
    const workspaces = rootPackage.workspaces || [];

    const expanded = [];
    workspaces.forEach((pattern) => {
      if (pattern.includes("*")) {
        const baseDir = pattern.replace("/*", "");
        if (fs.existsSync(baseDir)) {
          const subdirs = fs
            .readdirSync(baseDir, { withFileTypes: true })
            .filter((d) => d.isDirectory())
            .map((d) => path.join(baseDir, d.name));
          expanded.push(...subdirs);
        }
      } else if (fs.existsSync(pattern)) {
        expanded.push(pattern);
      }
    });

    return expanded.filter((workspace) =>
      fs.existsSync(path.join(workspace, "package.json"))
    );
  } catch (error) {
    console.error("❌ Failed to read root package.json:", error.message);
    return [];
  }
}

// Simple groups tailored to this repo.
const GROUPS = {
  root: {
    workspaces: ["."],
  },
  strapi: {
    workspaces: [
      "apps/backend",
      "packages/strapi-plugin-status-manager",
      "packages/strapi-plugin-product-actions",
    ],
  },
  frontend: {
    workspaces: ["apps/frontend"],
  },
};

function resolveWorkspacesForGroup(groupName) {
  if (!groupName) {
    // default: all workspaces + root
    return ["."].concat(getWorkspaces());
  }

  if (groupName === "all") {
    return ["."].concat(getWorkspaces());
  }

  const group = GROUPS[groupName];
  if (!group) {
    console.error(
      `❌ Unknown group "${groupName}". Expected one of: root, strapi, frontend, all.`
    );
    process.exit(1);
  }

  return group.workspaces;
}

function runNcu(cwd, args, dryRun) {
  const baseCmd = ["npx", "npm-check-updates", ...args];
  const cmd = baseCmd.join(" ");
  console.log(`\n📦 ${cwd === "." ? "root" : cwd}: ${cmd}`);
  try {
    execSync(cmd, {
      cwd,
      stdio: "inherit",
      env: {
        ...process.env,
      },
    });
  } catch (error) {
    if (dryRun) {
      console.error("❌ ncu dry-run failed");
    } else {
      console.error("❌ ncu upgrade failed");
    }
  }
}

function backupPackageJson(cwd) {
  const pkgPath = path.join(cwd, "package.json");
  if (!fs.existsSync(pkgPath)) return;
  const backupPath = pkgPath + ".backup";
  fs.copyFileSync(pkgPath, backupPath);
}

function getPackageJson(workspace) {
  const pkgPath =
    workspace === "."
      ? path.join(ROOT_DIR, "package.json")
      : path.join(ROOT_DIR, workspace, "package.json");
  if (!fs.existsSync(pkgPath)) {
    return null;
  }
  return readJson(pkgPath);
}

function getDependencyVersion(pkg, depName) {
  return (
    pkg.dependencies?.[depName] ||
    pkg.devDependencies?.[depName] ||
    pkg.peerDependencies?.[depName]
  );
}

function normalizeVersion(version) {
  // Remove semver range prefixes (^, ~, >=, etc.) for comparison
  return version.replace(/^[\^~>=<]+\s*/, "");
}

function checkMismatches() {
  console.log("🔍 Checking for version mismatches across workspaces...\n");

  const allWorkspaces = ["."].concat(getWorkspaces());
  const dependencyVersions = {}; // depName -> { workspace -> version }

  // Collect all dependencies and their versions
  allWorkspaces.forEach((workspace) => {
    const pkg = getPackageJson(workspace);
    if (!pkg) return;

    const allDeps = {
      ...(pkg.dependencies || {}),
      ...(pkg.devDependencies || {}),
      ...(pkg.peerDependencies || {}),
    };

    Object.entries(allDeps).forEach(([depName, version]) => {
      if (!dependencyVersions[depName]) {
        dependencyVersions[depName] = {};
      }
      dependencyVersions[depName][workspace] = version;
    });
  });

  // Find mismatches
  const mismatches = [];
  const consistent = [];

  Object.entries(dependencyVersions).forEach(([depName, versionsByWorkspace]) => {
    const uniqueVersions = new Set();
    Object.values(versionsByWorkspace).forEach((v) => {
      uniqueVersions.add(normalizeVersion(v));
    });

    if (uniqueVersions.size > 1) {
      mismatches.push({
        dep: depName,
        versions: versionsByWorkspace,
        uniqueVersions: Array.from(uniqueVersions),
      });
    } else {
      consistent.push({
        dep: depName,
        version: Array.from(uniqueVersions)[0],
        workspaces: Object.keys(versionsByWorkspace),
      });
    }
  });

  // Report mismatches
  if (mismatches.length > 0) {
    console.log("⚠️  Version Mismatches Found:\n");
    mismatches.forEach(({ dep, versions, uniqueVersions }) => {
      console.log(`  ${dep}:`);
      console.log(`    Multiple versions: ${uniqueVersions.join(", ")}`);
      Object.entries(versions).forEach(([ws, v]) => {
        console.log(`      ${ws === "." ? "root" : ws}: ${v}`);
      });
      console.log("");
    });
  } else {
    console.log("✅ No version mismatches found across workspaces.\n");
  }

  // Optionally show consistent dependencies (only if there are mismatches, to keep output focused)
  if (mismatches.length > 0 && consistent.length > 0) {
    console.log(`ℹ️  ${consistent.length} dependencies have consistent versions.\n`);
  }

  return { mismatches, consistent };
}

function checkCommand(options) {
  const { group, json, verbose } = options;

  // Clean up any leftover temp files from previous runs
  try {
    const files = fs.readdirSync(ROOT_DIR);
    files.forEach((file) => {
      if (file.startsWith(".ncu-report-") && file.endsWith(".json")) {
        try {
          fs.unlinkSync(path.join(ROOT_DIR, file));
        } catch (e) {
          // Ignore cleanup errors
        }
      }
    });
  } catch (e) {
    // Ignore if directory read fails
  }

  // First, check for mismatches across all workspaces (not just the selected group)
  const mismatchReport = checkMismatches();

  // Then check for available updates in the selected group
  const workspaces = resolveWorkspacesForGroup(group);
  const report = {};

  console.log(
    `\n🔍 Checking available updates for group="${group || "all"}"...\n`
  );

  workspaces.forEach((workspace) => {
    const pkgPath =
      workspace === "."
        ? path.join(ROOT_DIR, "package.json")
        : path.join(ROOT_DIR, workspace, "package.json");
    if (!fs.existsSync(pkgPath)) {
      console.log(`⚠️  Skipping ${workspace} - no package.json`);
      return;
    }

    const cwd = workspace === "." ? ROOT_DIR : path.join(ROOT_DIR, workspace);

    try {
      // Run ncu using --jsonAll to get the would-be-updated package.json
      // ncu exits with code 1 when updates are available, which is expected
      let stdout = "";
      let stderr = "";
      let exitCode = 0;

      try {
        stdout = execSync(
          `npx npm-check-updates --jsonAll --target=latest --packageFile=package.json`,
          {
            cwd,
            stdio: ["ignore", "pipe", "pipe"],
            encoding: "utf8",
            maxBuffer: 10 * 1024 * 1024,
          }
        );
      } catch (error) {
        // ncu exits with code 1 when updates are available - this is expected
        exitCode = error.status || error.code || 1;
        stdout = error.stdout || "";
        stderr = error.stderr || "";
        
        // If we got stdout from the error, use it
        if (stdout) {
          // stdout is already captured
        } else if (stderr) {
          // Sometimes ncu might output to stderr, try that
          stdout = stderr;
        }
      }

      if (verbose) {
        console.log(
          `\n--- raw ncu output for ${workspace === "." ? "root" : workspace} ---`
        );
        console.log(`Working directory: ${cwd}`);
        console.log(`Exit code: ${exitCode}`);
        console.log(`stdout length: ${stdout ? stdout.length : 0}`);
        console.log(`stderr length: ${stderr ? stderr.length : 0}`);
        if (stdout) {
          console.log(`stdout (first 500 chars): ${stdout.substring(0, 500)}`);
        } else {
          console.log(`stdout: <no stdout>`);
        }
        if (stderr) {
          console.log("--- stderr ---");
          console.log(stderr.substring(0, 500));
        }
        console.log("--- end raw ncu output ---\n");
      }

      // ncu outputs to stdout, but might exit with code 1 when updates are available
      // Try stdout first, then stderr if stdout is empty
      let output = stdout.trim() || stderr.trim();
      
      let upgradedPkg;
      if (!output) {
        // No output means no changes from ncu
        upgradedPkg = null;
      } else {
        try {
          upgradedPkg = JSON.parse(output);
        } catch (parseError) {
          if (verbose) {
            console.log(`Parse error: ${parseError.message}`);
            console.log(`Trying to extract JSON from output...`);
          }
          // Try to extract JSON object from any surrounding text
          const jsonMatch = output.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            try {
              upgradedPkg = JSON.parse(jsonMatch[0]);
            } catch (e) {
              if (verbose) {
                console.log(`Failed to parse extracted JSON: ${e.message}`);
              }
              upgradedPkg = null;
            }
          } else {
            upgradedPkg = null;
          }
        }
      }

      const currentPkg = getPackageJson(workspace);
      const updatesForWorkspace = {};

      if (upgradedPkg && currentPkg) {
        const sections = ["dependencies", "devDependencies", "peerDependencies"];
        sections.forEach((section) => {
          const currentDeps = currentPkg[section] || {};
          const upgradedDeps = upgradedPkg[section] || {};

          Object.entries(upgradedDeps).forEach(([dep, targetVersion]) => {
            const currentVersion = currentDeps[dep];
            if (
              currentVersion &&
              currentVersion.toString().trim() !== targetVersion.toString().trim()
            ) {
              updatesForWorkspace[dep] = {
                from: currentVersion,
                to: targetVersion,
              };
            }
          });
        });
      }

      report[workspace] = updatesForWorkspace;

      const updateEntries = Object.entries(updatesForWorkspace);
      if (updateEntries.length > 0) {
        console.log(
          `📦 ${
            workspace === "." ? "root" : workspace
          }: ${updateEntries.length} update(s) available`
        );
        updateEntries.forEach(([dep, { from, to }]) => {
          console.log(`   ${dep}: ${from} → ${to}`);
        });
        console.log("");
      } else {
        console.log(
          `✅ ${workspace === "." ? "root" : workspace}: All dependencies up to date (per npm-check-updates)`
        );
      }
    } catch (error) {
      console.log(
        `⚠️  ${
          workspace === "." ? "root" : workspace
        }: Failed to check updates - ${error.message}`
      );
    }
  });

  if (json) {
    console.log("\n📊 JSON report:");
    console.log(
      JSON.stringify(
        {
          mismatches: mismatchReport.mismatches,
          updates: report,
        },
        null,
        2
      )
    );
  }
}

function upgradeCommand(options) {
  const { group, dryRun } = options;
  const workspaces = resolveWorkspacesForGroup(group);

  console.log(
    `\n🔄 Upgrading dependencies for group="${
      group || "all"
    }" (dryRun=${dryRun ? "true" : "false"})`
  );

  workspaces.forEach((workspace) => {
    const cwd = workspace === "." ? ROOT_DIR : path.join(ROOT_DIR, workspace);
    const pkgPath = path.join(cwd, "package.json");
    if (!fs.existsSync(pkgPath)) {
      console.log(`⚠️  Skipping ${workspace} - no package.json`);
      return;
    }

    if (!dryRun) {
      backupPackageJson(cwd);
    }

    const args = [];
    if (!dryRun) {
      args.push("-u");
    }
    // By default we target latest; you can later pin ranges in package.json.
    args.push("--target=latest");
    args.push("--packageFile=package.json");

    runNcu(cwd, args, dryRun);
  });

  console.log(
    `\n✅ Done. ${
      dryRun
        ? "No files were changed (dry run)."
        : "Backups saved as package.json.backup next to each file."
    }`
  );
}

function parseArgs(argv) {
  const args = argv.slice(3); // node, script, command already consumed
  const options = {
    group: null,
    dryRun: false,
    json: false,
    verbose: false,
  };

  args.forEach((arg) => {
    if (arg === "--dry-run") {
      options.dryRun = true;
    } else if (arg === "--json") {
      options.json = true;
    } else if (arg === "--verbose") {
      options.verbose = true;
    } else if (arg.startsWith("--group=")) {
      options.group = arg.split("=")[1];
    }
  });

  return options;
}

function showHelp() {
  console.log(`
🔧 Primer Monorepo Dependency Upgrader

Usage: node scripts/upgrade-deps.js <command> [options]

Commands:
  check     Check for version mismatches across workspaces AND show available updates
  upgrade   Apply upgrades using npm-check-updates
  help      Show this help message

Options:
  --group=root       Only root package.json (for updates check)
  --group=strapi     Backend + Strapi plugins (apps/backend + strapi plugins)
  --group=frontend   Frontend app only (apps/frontend)
  --group=all        Root + all workspaces (default)
  --dry-run          For upgrade: show changes without writing
  --json             For check: emit a JSON report to stdout
  --verbose          For check: print raw npm-check-updates output per workspace

Note: Mismatch detection always scans ALL workspaces regardless of --group flag.
      The --group flag only affects which workspaces are checked for available updates.

Examples:
  node scripts/upgrade-deps.js check
  node scripts/upgrade-deps.js check --group=strapi --json
  node scripts/upgrade-deps.js upgrade --group=root --dry-run
  node scripts/upgrade-deps.js upgrade --group=frontend
`);
}

function main() {
  const command = process.argv[2] || "help";
  const options = parseArgs(process.argv);

  switch (command) {
    case "check":
      checkCommand(options);
      break;
    case "upgrade":
      upgradeCommand(options);
      break;
    case "help":
    default:
      showHelp();
      break;
  }
}

main();

