import { App } from "../src/App";
import { AppointmentDaysViewLoader } from "../src/AppointmentsDaysViewLoader";
import {
  click,
  element,
  initializeReactContainer,
  propsOf,
  render,
} from "./reactTestExtensions";
import { CustomerForm } from "../src/CustomerForm";
import { blankCustomer } from "./builders/customer";
import { AppointmentFormLoader } from "../src/AppointmentFormLoader";
import { Customer } from "../src/types/customer";
import { act } from "react";
import { blankAppointment } from "./builders/appointment";

jest.mock("../src/AppointmentsDaysViewLoader", () => ({
  AppointmentDaysViewLoader: jest.fn(() => (
    <div id="AppointmentDaysViewLoader"></div>
  )),
}));

jest.mock("../src/CustomerForm", () => ({
  CustomerForm: jest.fn(() => <div id="CustomerForm"></div>),
}));

jest.mock("../src/AppointmentFormLoader", () => ({
  AppointmentFormLoader: jest.fn(() => <div id="AppointmentFormLoader"></div>),
}));

describe("App", () => {
  beforeEach(() => {
    initializeReactContainer();
  });

  it("initially shows the AppointmentDaysViewLoader", () => {
    render(<App />);

    expect(AppointmentDaysViewLoader).toBeRendered();
  });

  it("has a menu bar", () => {
    render(<App />);
    expect(element("menu")).not.toBeNull();
  });

  it("has a button to initiate add customer and appointment action", () => {
    render(<App />);
    const firstButton = element("menu > li > button:first-of-type");
    expect(firstButton).toContainText("Add customer and appointment");
  });

  const beginAddingCustomerAndAppointment = () =>
    click(element("menu > li > button:first-of-type") as HTMLButtonElement);

  it("displays the CustomerForm when the button is clicked", () => {
    render(<App />);
    beginAddingCustomerAndAppointment();
    expect(element("#CustomerForm")).not.toBeNull();
  });

  it("passes a blank original customer object to CustomerForm", () => {
    render(<App />);
    beginAddingCustomerAndAppointment();
    expect(CustomerForm).toBeRenderedWithProps(
      expect.objectContaining({
        original: blankCustomer,
      })
    );
  });

  it("hides the AppointmentsDayViewLoader when button is clicked", async () => {
    render(<App />);
    beginAddingCustomerAndAppointment();
    expect(element("#AppointmentDaysViewLoader")).toBeNull();
  });

  it("hides the button bar when the CustomerForm is being displayed", async () => {
    render(<App />);
    beginAddingCustomerAndAppointment();
    expect(element("menu")).toBeNull();
  });

  const exampleCustomer: Customer = {
    id: 123,
    firstName: "",
    lastName: "",
    phoneNumber: "",
  };
  const saveCustomer = (customer = exampleCustomer) => {
    act(() => {
      const props = propsOf(CustomerForm as jest.Mock);
      props.onSave(customer);
    });
  };

  it("displays the AppointmentFormLoader after the CustomerForm is submitted", async () => {
    render(<App />);
    beginAddingCustomerAndAppointment();
    saveCustomer();

    expect(element("#AppointmentFormLoader")).not.toBeNull();
  });

  // it("passes a blank original appointment object to CustomerForm", async () => {
  //   render(<App />);
  //   beginAddingCustomerAndAppointment();
  //   saveCustomer();
  //   expect(AppointmentFormLoader).toBeRenderedWithProps(
  //     expect.objectContaining({
  //       original: expect.objectContaining(blankAppointment),
  //     })
  //   );
  // });

  it("passes the customer to the AppointmentForm", async () => {
    const customer = { ...blankCustomer, id: 123 };

    render(<App />);
    beginAddingCustomerAndAppointment();
    saveCustomer();

    expect(AppointmentFormLoader).toBeRenderedWithProps(
      expect.objectContaining({
        original: expect.objectContaining({
          customer: customer,
        }),
      })
    );
  });
});
