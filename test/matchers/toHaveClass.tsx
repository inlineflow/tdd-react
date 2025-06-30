import { matcherHint, printExpected, printReceived } from "jest-matcher-utils";

export const toHaveClass = (received: HTMLElement, expectedClass: string) => {
  const pass = received.classList.contains(expectedClass);

  const sourceHint = () =>
    matcherHint("toHaveClass", "element", printExpected(expectedClass), {
      isNot: pass,
    });

  const actualClassHint = () =>
    "Actual classList: " + printReceived([...received.classList].join(" "));

  const message = () => [sourceHint(), actualClassHint()].join("\n\n");

  return { pass, message };
};
