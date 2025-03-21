import 'ts-node/register';
import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';
import { getJestProjectsAsync } from '@nx/jest';

const config: Config = {
  displayName: 'frontend',
  projects: [],
  preset: './jest-preset.json',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': ['ts-jest', {
      tsconfig: '<rootDir>/tsconfig.json',
    }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  coverageDirectory: '../../coverage/apps/frontend',
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/*.stories.{ts,tsx}',
    '!**/*.d.ts',
    '!**/index.ts',
    '!**/jest.setup.ts',
  ],
};
async function setupConfig() {
  const projects = await getJestProjectsAsync();
  config.projects = projects;
  return config;
}
export default setupConfig(); 