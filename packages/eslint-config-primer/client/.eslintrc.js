module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  extends: [
    '../base/.eslintrc.js',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'prettier', 'import', 'check-file'],
  overrides: [
    {
      /**
       * We're allowing one index file that should be
       * at the root of the src folder.
       */
      files: ['**/src/index.[jt]s?(x)'],
      rules: {
        'check-file/no-index': 'off',
      },
    },
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:jest-dom/recommended', 'plugin:testing-library/react'],
      plugins: ['jest-dom', '@typescript-eslint'],
      rules: {
        'testing-library/prefer-screen-queries': 'off',
        'testing-library/render-result-naming-convention': 'off'
      },
    },
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    react: {
      version: 'detect',
    },
  },
  rules: {
    /**
     * This is useful for refs especially when you know the
     * element will exist on mount within the component.
     */
    '@typescript-eslint/no-non-null-assertion': 'off',
    /**
     * Useful for when you only need to access certain args of a function.
     * e.g. `new Array(10).map((_, i) => i)` – it won't complain about `_`.
     */
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    /**
     * Ensures the use of import and export as type when possible.
     * @see: https://typescript-eslint.io/blog/consistent-type-imports-and-exports-why-and-how/
     */
    '@typescript-eslint/consistent-type-exports': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/no-import-type-side-effects': 'error',
    /**
     * Currently, we allow:
     *
     * ```jsx
     * const Component = (props) => {
     *  return <div />;
     * };
     * ```
     */
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
      },
    ],
    /**
     * This produces an import list like:
     *
     * ```js
     * import React from 'react';
     *
     * import PropTypes from 'prop-types';
     *
     * import LocalesProviderContext from './context';
     * ```
     *
     * where `react` is always first followed by library imports
     * and then local code imports are managed independently.
     */
    'import/order': [
      'error',
      {
        groups: [
          ['external', 'internal', 'builtin'],
          'parent',
          ['sibling', 'index'],
          'object',
          'type',
        ],
        pathGroups: [{ pattern: 'react', group: 'external', position: 'before' }],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    /**
     * We only want named exports:
     *
     * ```jsx
     * const Apple = () => <div />;
     *
     * export { Apple }
     * ```
     */
    'import/no-default-export': 'warn',
    /**
     * Enforce file location for particular types of files.
     */
    'check-file/folder-match-with-fex': [
      'error',
      {
        '*.test.{js,jsx,ts,tsx}': '**/tests/',
      },
    ],
    /**
     * These are turned off because, typescript.
     */
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
  },
};