
import eslintConfig from '../../eslint.config.mjs';
import globals from 'globals';

export default [...eslintConfig,
{
    ignores: ['**/config.js', 'config/**'],
    languageOptions: {
        ecmaVersion: 2022,
        globals: {
            ...globals.browser,
            ...globals.node,
            ...globals.commonjs,
            module: 'readonly', // Add CommonJS globals directly
            require: 'readonly',
            exports: 'readonly',
        },

    },
},
];