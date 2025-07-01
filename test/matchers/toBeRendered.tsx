import { matcherHint } from "jest-matcher-utils";

export const toBeRendered = (mockedComponent: jest.Mock) => {
  const pass = mockedComponent.mock.calls.length > 0;

  const sourceHint = () =>
    matcherHint("toBeRendered", "mockedComponent", "to be rendered", {
      isNot: pass,
    });

  const actualHint = () =>
    pass
      ? `The component was correctly rendered`
      : `The component wasn't rendered`;

  const message = () => [sourceHint(), actualHint()].join("\n\n");
  return { pass, message };
};
