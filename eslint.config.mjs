// eslint.config.mjs (root config)
import { defineConfig } from 'eslint-define-config';

export default defineConfig({
    ignores: ["**/.cache", "**/build", "**/node_modules/**/*"],

    parser: '@typescript-eslint/parser',
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {
        indent: ["error", 2, {
            SwitchCase: 1,
        }],

        "linebreak-style": ["error", "unix"],
        "no-console": 0,
        quotes: ["error", "single"],
        semi: ["error", "always"],
    },
});


