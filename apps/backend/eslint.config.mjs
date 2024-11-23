import js from "@eslint/js";
import globals from "globals";

export default [
    {
        files: ["**/config/**/*.js", "**/*.js"],
        ignores: ["**/.strapi/client/**", "**/*.example.js"],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "script",
            globals: {
                ...globals.node,
                module: "readonly",
                require: "readonly",
                __dirname: "readonly",
                strapi: "readonly"
            },
        },
    },
    {
        files: ["**/.strapi/client/**/*.js", "**/*.mjs"],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
            globals: {
                ...globals.browser,
            },
        },
        rules: {
        },
    },
    {
        ignores: ['**/*.example.js'],
        rules: {
            ...js.configs.recommended.rules,
            "no-console": "off",
            "no-unused-vars": ["warn", { argsIgnorePattern: "^_?(strapi|config)?" }],
        },
    },
];
