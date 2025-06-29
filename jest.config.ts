import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  restoreMocks: true,
  setupFilesAfterEnv: [
    "<rootDir>/jest.setup.ts",
    "<rootDir>/test/matchers/domMatchers.ts",
  ],
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/test/__mocks__/styleMock.ts",
    "\\.(svg)$": "<rootDir>/__mocks__/svgMock.ts",
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};

export default config;
