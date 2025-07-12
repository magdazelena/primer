/** @type {import('jest').Config} */
module.exports = {
  displayName: "backend",
  testEnvironment: "node",
  injectGlobals: true,
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.json",
        useESM: false,
      },
    ],
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json"],
  coverageDirectory: "../../coverage/apps/backend",
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
  ],
  testEnvironmentOptions: {
    url: "http://localhost:1337",
  },
  testMatch: ["**/__tests__/**/*.test.ts", "**/__tests__/**/*.test.tsx"],
};
