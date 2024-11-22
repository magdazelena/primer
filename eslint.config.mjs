// eslint.config.mjs (root config)
import { defineConfig } from 'eslint-define-config'; // Optional, if you want a more structured approach

export default defineConfig({
    root: true,
    ignores: ["**/.cache", "**/build", "**/node_modules/**/*"],
    extends: [
        'eslint:recommended',  // or any other base configuration
        'plugin:@typescript-eslint/recommended', // if using TypeScript
    ],
    overrides: [
        {
            files: ['apps/**/*.{js,ts}'],
            rules: {
                indent: ["error", 2, {
                    SwitchCase: 1,
                }],

                "linebreak-style": ["error", "unix"],
                "no-console": 0,
                quotes: ["error", "single"],
                semi: ["error", "always"],
            },
        },

    ],
});


