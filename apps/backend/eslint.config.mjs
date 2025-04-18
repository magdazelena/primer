import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";

export default [
  {
    files: ["**/config/**/*.js", "**/*.js"],
    ignores: [
      "**/.strapi/client/**",
      "**/*.example.js",
      ".cache",
      "build",
      "**/node_modules/**",
      "**/jest.setup.js"
    ],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "script",
      globals: {
        ...globals.node,
        module: "readonly",
        require: "readonly",
        __dirname: "readonly",
        strapi: "readonly",
        document: "readonly"
      }
    }
  },
  {
    files: ["**/.strapi/client/**/*.js", "**/*.mjs", "**/jest.setup.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.jest,
        document: "readonly"
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      react
    },
    rules: {
      "react/react-in-jsx-scope": "off"
    }
  },
  {
    ignores: ["**/*.example.js"],
    rules: {
      ...js.configs.recommended.rules,
      "no-console": "off",
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_?(strapi|config)?" }]
    }
  },
  {
    files: [
      "**/src/plugins/*/strapi-server.js",
      "**/src/plugins/*/server/**/*.js"
    ],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "script",
      globals: {
        ...globals.node,
        module: "readonly",
        require: "readonly",
        __dirname: "readonly",
        strapi: "readonly"
      }
    }
  },
  {
    files: [
      "**/src/plugins/*/strapi-admin.js",
      "**/src/plugins/*/admin/**/*.js|jsx",
      "**/src/plugins/*/admin/**/*.js"
    ],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      react
    }
  },
  {
    ignores: ["**/eslint.config.mjs"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.jest
      }
    },
    rules: {
      "no-unused-vars": "error"
    }
  }
];
