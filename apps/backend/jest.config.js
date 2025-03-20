/** @type {import('jest').Config} */
module.exports = {
  displayName: 'backend',
  preset: '@nx/jest',
  testEnvironment: 'node',
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
}; 