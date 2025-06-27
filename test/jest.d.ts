import { HTMLInputTypeAttribute } from "react";

export {};

declare global {
  namespace jest {
    interface Matchers<R> {
      toContainText: (expectedText: string) => R;
      toHaveClass: (expectedClass: string) => R;
      toBeInputOfType: (expectedType: HTMLInputTypeAttribute) => R;
      toBeCalledWith: (...arguments: any) => R;
    }
  }
}
