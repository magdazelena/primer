const { defineConfig } = require("eslint/config");
const path = require("path");
const baseConfig = require("eslint-config-primer/server");

module.exports = defineConfig([
  ...baseConfig,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        // Override project path to resolve tsconfig relative to this config file
        project: [path.resolve(__dirname, "tsconfig.json")],
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      // Add any plugin-specific rules here
    },
  },
]);


