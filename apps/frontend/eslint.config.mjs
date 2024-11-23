import eslintConfig from '../../eslint.config.mjs';
import globals from 'globals';

export default [
    ...eslintConfig,
    {
        ignores: ['.next', 'public'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            parser: '@typescript-eslint/parser',
            parserOptions: {
                project: 'apps/frontend/tsconfig.json',
                tsconfigRootDir: __dirname,
            },
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        plugins: {
            '@typescript-eslint': '@typescript-eslint/eslint-plugin',
        },
        rules: {
            // Add TypeScript-specific rules here
            '@typescript-eslint/no-unused-vars': 'error',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/no-explicit-any': 'warn',
        },
    },
];