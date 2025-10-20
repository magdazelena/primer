const { defineConfig } = require("eslint/config");
const path = require("path");
const baseConfig = require("eslint-config-primer/server");

module.exports = defineConfig([
  ...baseConfig,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        // Resolve tsconfig with an absolute path to avoid cwd/monorepo issues
        project: [path.join(__dirname, "tsconfig.json")],
      },
    },
    rules: {
      // Add any plugin-specific rules here
    },
  },
]);


