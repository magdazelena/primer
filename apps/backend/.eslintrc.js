module.exports = {
  extends: ["eslint-config-primer/server"],
  ignorePatterns: [
    "node_modules",
    "dist",
    "build",
    "src/plugins/**",
    "types/generated/**",
    "test/**",
    "**/__tests__/**", // todo: remove this
    "jest.setup.admin.js",
    "jest.setup.js",
    "src/admin/**",
  ],
  rules: {
    "@typescript-eslint/no-explicit-any": "off", // todo: remove this
  },
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
};
