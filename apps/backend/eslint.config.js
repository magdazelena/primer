const { defineConfig } = require("eslint/config");
const baseConfig = require("../../packages/eslint-config-primer/base/eslint.config.js");
const serverConfig = require("../../packages/eslint-config-primer/server/eslint.config.js");

module.exports = defineConfig([
  ...baseConfig,
  ...serverConfig,
  {
    rules: {
      // Backend-specific overrides
      "@typescript-eslint/no-explicit-any": "off",
    },
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
  },
  {
    ignores: [
      "**/node_modules",
      "**/dist",
      "**/build",
      "src/plugins/**/*",
      "types/generated/**/*",
      "test/**/*",
      "**/__tests__/**/*",
      "**/jest.setup.admin.js",
      "**/jest.setup.js",
      "**/jest.config.js",
      "**/webpack.config.js",
      "**/eslint.config.js",
      "**/admin/**/*",
      "**/public/**/*",
      "**/scripts/**/*",
      "**/config/**/*",
      "**/database/**/*",
      "**/favicon.png",
      "**/robots.txt",
    ],
  },
]);
