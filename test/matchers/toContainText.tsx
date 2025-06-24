import { matcherHint, printExpected, printReceived } from "jest-matcher-utils";

export const toContainText = (received: HTMLElement, expectedText: string) => {
  const pass =
    received.textContent === null
      ? false
      : received.textContent.includes(expectedText);

  const sourceHint = () =>
    matcherHint("toContainText", "element", printExpected(expectedText), {
      isNot: pass,
    });

  const actualTextHint = () =>
    "Actual text: " + printReceived(received.textContent);

  const message = () => [sourceHint(), actualTextHint()].join("\n\n");

  return { pass, message };
};
