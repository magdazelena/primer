const { defineConfig } = require("eslint/config");
const tsParser = require("@typescript-eslint/parser");
const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const js = require("@eslint/js");

module.exports = defineConfig([
  // Base configuration for all files
  {
    rules: {
      "no-await-in-loop": "off",
      "no-use-before-define": [
        "error",
        {
          functions: false,
          classes: true,
          variables: true,
          allowNamedExports: false,
        },
      ],
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
        project: "./tsconfig.json",
        tsconfigRootDir: process.cwd(),
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslint,
    },
    rules: {
      "@typescript-eslint/indent": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/consistent-type-exports": "off",
      "@typescript-eslint/consistent-type-imports": "off",
      "@typescript-eslint/no-import-type-side-effects": "off",
    },
  },
  
  // JavaScript files configuration
  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
    },
    rules: {
      // No TypeScript rules for JavaScript files
    },
  },
]);
