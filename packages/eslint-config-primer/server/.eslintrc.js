module.exports = {
  extends: ["../base/.eslintrc.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "no-await-in-loop": "off",
    "no-use-before-define": [
      "error",
      {
        functions: false,
        classes: true,
        variables: true,
        allowNamedExports: false,
      },
    ],
    // @see: https://github.com/typescript-eslint/typescript-eslint/issues/1824
    "@typescript-eslint/indent": "off",
    /**
     * Ensures the use of import and export as type when possible.
     * @see: https://typescript-eslint.io/blog/consistent-type-imports-and-exports-why-and-how/
     */
    "@typescript-eslint/consistent-type-exports": "error",
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/no-import-type-side-effects": "error",
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: process.cwd(),
      },
      extends: ["plugin:@typescript-eslint/recommended"],
    },
    {
      files: ["*.js", "*.jsx"],
      parserOptions: {
        project: null,
      },
      rules: {
        "@typescript-eslint/consistent-type-exports": "off",
        "@typescript-eslint/consistent-type-imports": "off",
        "@typescript-eslint/no-import-type-side-effects": "off",
      },
    },
  ],
};
