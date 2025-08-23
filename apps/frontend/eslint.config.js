const { defineConfig } = require("eslint/config");
const js = require("@eslint/js");
const tsParser = require("@typescript-eslint/parser");
const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const react = require("eslint-plugin-react");
const reactHooks = require("eslint-plugin-react-hooks");
const nextPlugin = require("@next/eslint-plugin-next");
const globals = require("globals");

module.exports = defineConfig([
  // Base configuration with recommended rules
  js.configs.recommended,
  
  // Base configuration
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.jest,
        ...globals.node,
        // Add React globals
        React: "readonly",
        JSX: "readonly",
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
      "no-unused-vars": "warn",
      "no-undef": "error",
      "no-redeclare": "error",
    },
  },
  
  // TypeScript files configuration
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslint,
      react: react,
      "react-hooks": reactHooks,
      "@next/next": nextPlugin,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // React rules
      "react/jsx-uses-react": "off", // Not needed in React 17+
      "react/react-in-jsx-scope": "off", // Not needed in React 17+
      "react/prop-types": "off", // We're using TypeScript
      "react/display-name": "warn",
      
      // React Hooks rules
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      
      // Next.js rules
      "@next/next/no-img-element": "warn",
      "@next/next/no-html-link-for-pages": "warn",
      
      // TypeScript rules (only basic ones that don't require project config)
      "@typescript-eslint/no-unused-vars": "off", // Disabled due to ESLint 9 compatibility issues
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
  
  // JavaScript files configuration
  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      react: react,
      "react-hooks": reactHooks,
      "@next/next": nextPlugin,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // React rules
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/display-name": "warn",
      
      // React Hooks rules
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      
      // Next.js rules
      "@next/next/no-img-element": "warn",
      "@next/next/no-html-link-for-pages": "warn",
    },
  },
  
  // Global ignores
  {
    ignores: [
      "**/node_modules",
      "**/dist",
      "**/build",
      ".next/**/*",
      "cypress/videos/**/*",
      "cypress/screenshots/**/*",
      "**/coverage/**/*",
      "**/*.config.js",
      "**/*.config.ts",
      "**/jest.setup.ts",
    ],
  },
]);