module.exports = {
    extends: ['../base/.eslintrc.js'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    plugins: ['@typescript-eslint'],
    rules: {
        'node/no-unpublished-require': 'off',
        'node/no-extraneous-require': 'off',
        'node/exports-style': ['error', 'module.exports'],
        'node/no-new-require': 'error',
        'node/no-path-concat': 'error',
        'node/no-callback-literal': 'error',
        'node/handle-callback-err': 'error',
        'no-restricted-syntax': 'off',
        'no-await-in-loop': 'off',
        'no-console': 'off',
        'no-shadow': 'off',
    'no-use-before-define': [
      'error',
      {
        functions: false,
        classes: true,
        variables: true,
        allowNamedExports: false,
      },
    ],
    'consistent-return': 'off',
      '@typescript-eslint/comma-dangle': [
        'error',
        {
          arrays: 'always-multiline',
          objects: 'always-multiline',
          imports: 'always-multiline',
          exports: 'always-multiline',
          functions: 'never',
        },
      ],
      // @see: https://github.com/typescript-eslint/typescript-eslint/issues/1824
      '@typescript-eslint/indent': 'off',
      /**
       * Ensures the use of import and export as type when possible.
       * @see: https://typescript-eslint.io/blog/consistent-type-imports-and-exports-why-and-how/
       */
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-import-type-side-effects': 'error',
    },
    overrides: [
      {
        files: ['*.ts', '*.tsx'],
        parserOptions: {
          project: './tsconfig.json',
          tsconfigRootDir: process.cwd(),
        },
        extends: ['plugin:@typescript-eslint/recommended'],
      },
      {
        files: ['*.js', '*.jsx'],
        parserOptions: {
          project: null,
        },
        rules: {
          '@typescript-eslint/consistent-type-exports': 'off',
          '@typescript-eslint/consistent-type-imports': 'off',
          '@typescript-eslint/no-import-type-side-effects': 'off',
        },
      },
    ],
  };