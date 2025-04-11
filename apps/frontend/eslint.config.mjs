import globals from "globals";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import nextPlugin from "@next/eslint-plugin-next";
import { FlatCompat } from "@eslint/eslintrc";
const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,

  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    parser: tsParser,
    parserOptions: {
      project: ["./tsconfig.json", "./cypress/tsconfig.json"],
      tsconfigRootDir: import.meta.dirname,
      createDefaultProgram: true,
      ecmaFeatures: {
        jsx: true,
      },
    },
    globals: {
      ...globals.node,
      ...globals.jest,
    },
  },
  ignores: [
    ".next/**/*",
    "public/**/*",
    "**/eslint.config.mjs",
    "cypress/support/**/*.js",
    "next.config.js",
  ],

  plugins: {
    "@typescript-eslint": tsPlugin,
    "@next/next": nextPlugin,
  },
  rules: {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "warn",
  },
});
const eslintConfig = [
  ...compat.config({
    extends: ["next"],
    settings: {
      next: {
        rootDir: "apps/frontend/",
      },
    },
  }),
];
export default eslintConfig;
