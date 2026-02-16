const { defineConfig, globalIgnores } = require("eslint/config");
const js = require("@eslint/js");
const globals = require("globals");

module.exports = defineConfig([
  {
    languageOptions: {
      ecmaVersion: 2020,
      parserOptions: {},
      globals: {
        ...globals.jest,
        ...globals.node,
      },
    },

    rules: {
      strict: ["error", "global"],
      "no-return-await": "error",
      "object-shorthand": [
        "error",
        "always",
        {
          avoidExplicitReturnArrows: true,
        },
      ],
      "default-param-last": "warn",
      "no-template-curly-in-string": "warn",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  globalIgnores(["**/.eslintrc.js", "dist/**/*", "node_modules/**/*"]),
]);
