// jest.config.ts
import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest', // Enables TypeScript support in Jest
  testEnvironment: 'jsdom', // Sets up a browser-like environment
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts', '<rootDir>/test/matchers/domMatchers.ts'], // Points to the setup file for Jest-DOM matchers
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy', // Mocks CSS/SCSS imports
    '\\.(svg)$': '<rootDir>/__mocks__/svgMock.ts', // Mocks SVG imports (create this file)
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Transforms TypeScript and TSX files
  },
};

export default config;