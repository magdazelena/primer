module.exports = {
    extends: [
        'eslint-config-primer/server'
    ],
    parserOptions: {
      project: './tsconfig.json',
      tsconfigRootDir: __dirname,
    }
} 