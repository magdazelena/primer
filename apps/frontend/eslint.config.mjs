import globals from "globals";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import pluginNext from '@next/eslint-plugin-next';

import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'
const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
})

export default [
  {
    ignores: [".next", "public"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parser: tsParser,
      parserOptions: {
        project: "apps/frontend/tsconfig.json",
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      '@next/next': pluginNext
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs['core-web-vitals'].rules
    },
    
  },
  ...compat.config({
    extends: ['eslint:recommended', 'plugin:@next/next/recommended'],
  }),
];
