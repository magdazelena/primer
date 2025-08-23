const {
    defineConfig,
} = require("eslint/config");

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
    extends: compat.extends("eslint-config-primer/client", "plugin:@next/next/recommended"),

    languageOptions: {
        parserOptions: {
            project: "./tsconfig.json",
            tsconfigRootDir: __dirname,
        },
    },

    rules: {
        "@typescript-eslint/no-explicit-any": "off",
    },
}]);