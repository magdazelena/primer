module.exports = {
    extends: [
        'eslint-config-primer/client'
    ],
    parserOptions: {
      project: './tsconfig.json',
      tsconfigRootDir: __dirname,
    },
    rules: {
        '@typescript-eslint/no-explicit-any': 'off',
    }
} 