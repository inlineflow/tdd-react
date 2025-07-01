import { equals } from "@jest/expect-utils";
import { matcherHint, printExpected } from "jest-matcher-utils";
import { prettyJSON } from "../reactTestExtensions";
// const prettyJSON = (props: object) => JSON.stringify(props, null, 2);

export const toBeRenderedWithProps = (
  mockedComponent: jest.Mock,
  expectedProps: {}
) => {
  const mockedCall =
    mockedComponent.mock.calls[mockedComponent.mock.calls.length - 1];
  const actualProps = mockedCall ? mockedCall[0] : null;
  const pass = equals(actualProps, expectedProps);

  const sourceHint = () =>
    matcherHint(
      "toBeRenderedWithProps",
      "actualProps",
      prettyJSON(expectedProps),
      //   printExpected(expectedProps).replaceAll("\\", ""),
      { isNot: pass }
    );

  const actualHint = () =>
    // `Actual props: ${actualProps}`;
    `Actual props: ${JSON.stringify(actualProps, null, 2)}`;

  const message = () => [sourceHint(), actualHint()].join("\n\n");
  return { pass, message };
};
