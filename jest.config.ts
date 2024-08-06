import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  testEnvironment: 'jest-environment-jsdom',
  setupFiles: ['./jest.polyfills.ts'],
  testEnvironmentOptions: {
    customExportConditions: ['']
  }
};

export default config;
