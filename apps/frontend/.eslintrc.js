module.exports = {
    extends: [
        'eslint-config-primer/client',
        'plugin:@next/next/recommended'
    ],
    parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      }
}