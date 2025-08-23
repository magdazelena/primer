const { defineConfig } = require("eslint/config");
const js = require("@eslint/js");
const tsParser = require("@typescript-eslint/parser");
const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const globals = require("globals");

module.exports = defineConfig([
  // Base configuration with recommended rules
  js.configs.recommended,
  
  // Base configuration
  {
    languageOptions: {
      ecmaVersion: 2020,
      parserOptions: {},
      globals: {
        ...globals.jest,
        ...globals.node,
        // Add Strapi-specific globals
        strapi: "readonly",
        // Add browser globals for client-side files
        document: "readonly",
        window: "readonly",
        console: "readonly",
      },
    },
    rules: {
      strict: ["error", "global"],
      "no-return-await": "error",
      "object-shorthand": [
        "error",
        "always",
        {
          avoidExplicitReturnArrows: true,
        },
      ],
      "default-param-last": "warn",
      "no-template-curly-in-string": "warn",
      "no-console": "warn",
    },
  },
  
  // TypeScript files configuration
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: "module",
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslint,
    },
    rules: {
      // Only use basic TypeScript rules that are known to work
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-var-requires": "error",
    },
  },
  
  // JavaScript files configuration
  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
      },
    },
    rules: {
      "no-await-in-loop": "off",
    },
  },
  
  // Global ignores
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
      "src/admin/**/*",
      // Ignore Strapi generated files
      ".strapi/**/*",
    ],
  },
]);
