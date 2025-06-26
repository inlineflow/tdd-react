import { matcherHint, printExpected, printReceived } from "jest-matcher-utils";
import { HTMLInputTypeAttribute } from "react";

export const toBeInputOfType = (
  received: HTMLElement,
  expected: HTMLInputTypeAttribute
) => {
  let pass: boolean;
  if (!(received instanceof HTMLInputElement) || received.type !== expected) {
    pass = false;
  } else {
    pass = true;
  }

  const sourceHint = () => {
    matcherHint("toBeInputOfType", "element", printExpected(expected), {
      isNot: pass,
    });
  };

  const actualTypeHint = () =>
    `Actual type: ${printReceived((received as HTMLInputElement).type)}`;

  const message = () => [sourceHint(), actualTypeHint()].join("\n\n");

  return { pass, message };
};
