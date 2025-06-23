import React, { ReactNode } from "react";
import { act } from "react";
// import {ReactDOM} from "react-dom/client";
import { Appointment } from "../src/Appointment";
import { Container, createRoot } from "react-dom/client";

let container: Container;
beforeEach(() => {
  container = document.createElement("div");
  document.body.replaceChildren(container);
});

const render = (component: ReactNode) =>
  act(() => createRoot(container).render(component));

describe("Appointment", () => {
  it("renders the customer first name", () => {
    const customer = { firstName: "Ashley" };

    render(<Appointment customer={customer} />);

    expect(document.body.textContent).toContain("Ashley");
  });
});

describe("Appointment", () => {
  it("renders another customer first name", () => {
    const customer = { firstName: "Jordan" };
    render(<Appointment customer={customer} />);

    expect(document.body.textContent).toContain("Jordan");
  });
});
