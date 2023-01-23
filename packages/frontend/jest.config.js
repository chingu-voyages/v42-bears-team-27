const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const customJestConfig = {
  moduleDirectories: ['node_modules', 'test', '<rootDir>/'],
  moduleNameMapper: {
    '^@fontsource/(.*)$': 'jest-transform-stub',
  },
  modulePathIgnorePatterns: ['<rootDir>/build/'],
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.ts'],
  snapshotSerializers: ['@emotion/jest/serializer'],
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}'],
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(customJestConfig);
