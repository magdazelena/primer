module.exports = {
    extends: [
        'eslint-config-primer/client'
    ],
    parserOptions: {
      project: './tsconfig.json',
      tsconfigRootDir: __dirname,
    },
    ignorePatterns: ['.eslintrc.js']
} 