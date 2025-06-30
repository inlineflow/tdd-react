import React, { ReactNode } from "react";
import { toBeRenderedWithProps } from "./toBeRenderedWithProps";

import { initializeReactContainer, render } from "../reactTestExtensions";
const stripTerminalColor = (text: string) => text.replace(/\x1B\[\d+m/g, "");
const prettyJSON = (props: object) => JSON.stringify(props, null, 2);

describe("toBeRenderedWithProps", () => {
  let Component: jest.Mock;

  beforeEach(() => {
    initializeReactContainer();
    Component = jest.fn(() => <div></div>);
  });

  it("return pass is true when mock has been rendered", () => {
    render(<Component />);
    const result = toBeRenderedWithProps(Component, {});
    expect(result.pass).toBe(true);
  });

  it("returns pass is false when the properties do not match", () => {
    render(<Component a="b" />);
    const result = toBeRenderedWithProps(Component, { c: "d" });

    expect(result.pass).toBe(false);
  });

  it("returns pass when the properties of the last render match", () => {
    render(<Component a="b" />);
    render(<Component c="d" />);
    const result = toBeRenderedWithProps(Component, { c: "d" });

    expect(result.pass).toBe(true);
  });

  it("returns a message showing expected props if no match", () => {
    render(<Component a="b" />);
    const result = toBeRenderedWithProps(Component, { c: "d" });
    expect(stripTerminalColor(result.message())).toContain(
      prettyJSON({ c: "d" })
    );
  });
});
