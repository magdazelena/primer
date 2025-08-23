const { defineConfig } = require("eslint/config");
const baseConfig = require("eslint-config-primer/client");

module.exports = defineConfig([
  ...baseConfig,
  {
    rules: {
      // Add any plugin-specific rules here
    },
  },
]);


