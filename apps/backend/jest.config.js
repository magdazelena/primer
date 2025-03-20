/** @type {import('jest').Config} */
module.exports = {
  displayName: 'backend',
  testEnvironment: 'node',
  injectGlobals: true,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.js$': ['babel-jest', {
      presets: ['@babel/preset-env'],
    }],
  },
  moduleFileExtensions: ['js', 'json'],
  coverageDirectory: '../../coverage/apps/backend',
  collectCoverageFrom: [
    '**/*.js',
    '!**/index.js',
  ],
  testEnvironmentOptions: {
    url: 'http://localhost:1337',
  },
}; 