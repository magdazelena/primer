
import eslintConfig from '../../eslint.config.mjs';

export default {
    ...eslintConfig,
    overrides: [
        ...eslintConfig.overrides,
        {
            files: ['apps/backend/**/*.ts', 'apps/backend/**/*.js'],
            rules: {

            },
        },
    ],
};
