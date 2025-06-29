import { Mocked, mocked } from "jest-mock";
import { HTMLInputTypeAttribute } from "react";
import { jest } from "@jest/globals";

export {};

declare global {
  const fetch: jest.Mock;
  namespace jest {
    interface Matchers<R> {
      toContainText: (expectedText: string) => R;
      toHaveClass: (expectedClass: string) => R;
      toBeInputOfType: (expectedType: HTMLInputTypeAttribute) => R;
    }
  }
}
