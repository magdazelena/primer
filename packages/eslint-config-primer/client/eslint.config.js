const {
    defineConfig,
} = require("eslint/config");

const tsParser = require("@typescript-eslint/parser");
const globals = require("globals");

const {
    fixupConfigRules,
    fixupPluginRules,
} = require("@eslint/compat");

const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const react = require("eslint-plugin-react");
const reactHooks = require("eslint-plugin-react-hooks");
const prettier = require("eslint-plugin-prettier");
const _import = require("eslint-plugin-import");
const checkFile = require("eslint-plugin-check-file");
const jestDom = require("eslint-plugin-jest-dom");
const js = require("@eslint/js");

const {
    FlatCompat,
} = require("@eslint/eslintrc");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

module.exports = defineConfig([{
    languageOptions: {
        parser: tsParser,

        globals: {
            ...globals.browser,
        },

        ecmaVersion: "latest",
        sourceType: "module",

        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },
        },
    },

    extends: fixupConfigRules(compat.extends(
        "../base/eslint.config.js",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:import/recommended",
        "plugin:import/typescript",
        "plugin:prettier/recommended",
    )),

    plugins: {
        "@typescript-eslint": fixupPluginRules(typescriptEslint),
        react: fixupPluginRules(react),
        "react-hooks": fixupPluginRules(reactHooks),
        prettier: fixupPluginRules(prettier),
        import: fixupPluginRules(_import),
        "check-file": checkFile,
    },

    settings: {
        "import/parsers": {
            "@typescript-eslint/parser": [".ts", ".tsx"],
        },

        react: {
            version: "detect",
        },
    },

    rules: {
        "@typescript-eslint/no-non-null-assertion": "off",

        "@typescript-eslint/no-unused-vars": ["warn", {
            argsIgnorePattern: "^_",
            varsIgnorePattern: "^_",
        }],

        "@typescript-eslint/consistent-type-exports": "error",
        "@typescript-eslint/consistent-type-imports": "error",
        "@typescript-eslint/no-import-type-side-effects": "error",

        "react/function-component-definition": [2, {
            namedComponents: "arrow-function",
        }],

        "import/order": ["error", {
            groups: [
                ["external", "internal", "builtin"],
                "parent",
                ["sibling", "index"],
                "object",
                "type",
            ],

            pathGroups: [{
                pattern: "react",
                group: "external",
                position: "before",
            }],

            pathGroupsExcludedImportTypes: ["react"],
            "newlines-between": "always",

            alphabetize: {
                order: "asc",
                caseInsensitive: true,
            },
        }],

        "import/no-default-export": "off",

        "check-file/folder-match-with-fex": ["error", {
            "*.test.{js,jsx,ts,tsx}": "**/tests/",
        }],

        "react/react-in-jsx-scope": "off",
        "react/prop-types": "off",
        "react/require-default-props": "off",
    },
}, {
    files: ["**/src/index.[jt]s?(x)"],

    rules: {
        "check-file/no-index": "off",
        "@typescript-eslint/no-explicit-any": "off",
    },
}, {
    files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
    extends: compat.extends("plugin:jest-dom/recommended", "plugin:testing-library/react"),

    plugins: {
        "jest-dom": jestDom,
        "@typescript-eslint": fixupPluginRules(typescriptEslint),
    },

    rules: {
        "testing-library/prefer-screen-queries": "off",
        "testing-library/render-result-naming-convention": "off",
        "@typescript-eslint/no-explicit-any": "off",
    },
  },
]);