import React from "react";
import {
  initializeReactContainer,
  render,
  element,
  form,
  formElement as field,
} from "./reactTestExtensions";
import { CustomerForm } from "../src/CustomerForm";
import { Customer } from "../src/types/customer";

describe("CustomerForm", () => {
  beforeEach(() => {
    initializeReactContainer();
  });

  //   const customer = { firstName: "Ashley", lastName: "Johnshon" };
  const blankCustomer: Customer = { firstName: "", lastName: "" };

  it("renders a form", () => {
    render(<CustomerForm original={blankCustomer} />);
    expect(element("form")).not.toBeNull();
  });

  it("renders a first name field field as a text box", () => {
    const customer = { firstName: "Ashley", lastName: "Johnshon" };
    render(<CustomerForm original={customer} />);
    expect(field("firstName", HTMLInputElement)).not.toBeNull();
    expect(field("firstName", HTMLInputElement).tagName).toEqual("INPUT");
    expect(field("firstName", HTMLInputElement).type).toEqual("text");
    expect(element("form")).not.toBeNull();
  });

  it("includes the existing value for the first time", () => {
    const customer: Customer = { firstName: "Ashley", lastName: "Johnson" };
    render(<CustomerForm original={customer} />);
    expect(field("firstName", HTMLInputElement).value).toEqual("Ashley");
  });

  it("renders a lable for the first name field", () => {
    render(<CustomerForm original={blankCustomer} />);
    const label = element("label[for=firstName]");
    expect(label).not.toBeNull();
  });

  it("renders 'First name' as the first name label content", () => {
    render(<CustomerForm original={blankCustomer} />);
    const label = element("label[for=firstName]");
    expect(label).toContainText("First name");
  });

  it("assigns an id that matches the label id to the first name field", () => {
    render(<CustomerForm original={blankCustomer} />);
    expect(field("firstName", HTMLInputElement).id).toEqual("firstName");
  });
});
