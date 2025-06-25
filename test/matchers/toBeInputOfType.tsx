import { matcherHint, printExpected, printReceived } from "jest-matcher-utils";
import { HTMLInputTypeAttribute } from "react";

export const toBeInputOfType = (
  received: HTMLInputElement,
  expected: HTMLInputTypeAttribute
) => {
  const pass = received.type === expected;

  const sourceHint = () => {
    matcherHint("toBeInputOfType", "element", printExpected(expected), {
      isNot: pass,
    });
  };

  const actualTypeHint = () => `Actual type: ${printReceived(received.type)}`;

  const message = () => [sourceHint(), actualTypeHint()].join("\n\n");

  return { pass, message };
};
