module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:prettier/recommended",
  ],
  env: {
    es6: true,
    jest: true,
    node: true,
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".d.ts"],
      },
      alias: {
        map: [["@", "./src/"]],
        extensions: [".js", ".jsx", ".ts", ".tsx", ".d.ts"],
      },
    },

    "prettier/prettier": [
      "error",
      {
        singleQuote: true,
        trailingComma: "all",
        printWidth: 120,
        tabWidth: 2,
        useTabs: false,
        semi: false,
      },
    ],
  },
  rules: {
    strict: ["error", "global"],
    "no-return-await": "error",
    "object-shorthand": [
      "error",
      "always",
      { avoidExplicitReturnArrows: true },
    ],
    "default-param-last": "warn",
    "no-template-curly-in-string": "warn",
    "no-console": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
  },
  ignorePatterns: [".eslintrc.js", "dist/**", "node_modules/**"],
};
