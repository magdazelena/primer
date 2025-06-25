module.exports = {
  extends: ["eslint-config-primer/server"],
  ignorePatterns: [
    "node_modules",
    "src/plugins/**",
    "types/generated/**",
    "test/**",
    "**/__tests__/**", // todo: remove this
  ],
  rules: {
    "@typescript-eslint/no-explicit-any": "off", // todo: remove this
  },
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
};
