import {
  initializeReactContainer,
  render,
  element,
  form,
  field as field,
  click,
  submit,
  submitButton,
  change,
  labelFor,
} from "./reactTestExtensions";
import { CustomerForm } from "../src/CustomerForm";
import { Customer } from "../src/types/customer";

describe("CustomerForm", () => {
  const originalFetch = global.fetch;
  let fetchSpy: {
    fn: any;
    receivedArguments?: () => unknown[];
    receivedArgument?: (n: number) => unknown;
  };
  beforeEach(() => {
    initializeReactContainer();
    fetchSpy = spy();
    global.fetch = fetchSpy.fn as unknown as () => Promise<Response>;
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  const spy = <T,>() => {
    let receivedArguments: T[];
    return {
      fn: (...args: T[]) => (receivedArguments = args),
      receivedArguments: () => receivedArguments,
      receivedArgument: (n: number) => receivedArguments[n],
    };
  };

  const blankCustomer: Customer = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
  };

  it("renders a form", () => {
    render(<CustomerForm original={blankCustomer} />);
    expect(element("form")).not.toBeNull();
  });

  it("prevents the default action when submitting the form", () => {
    render(<CustomerForm original={blankCustomer} />);
    const event = submit(form());

    expect(event.defaultPrevented).toBe(true);
  });

  it("sends request to POST /customers when submitting the form", () => {
    render(<CustomerForm original={blankCustomer} />);
    click(submitButton());
    expect(fetchSpy).toBeCalledWith(
      "/customers",
      expect.objectContaining({
        method: "POST",
      })
    );
  });

  it("calls fetch with the right configuration", () => {
    render(<CustomerForm original={blankCustomer} />);

    click(submitButton());
    expect(fetchSpy).toBeCalledWith(
      expect.anything(),
      expect.objectContaining({
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      })
    );
  });

  const itRendersATextBox = (fieldName: string) => {
    it("renders a field as a text box", () => {
      render(<CustomerForm original={blankCustomer} />);
      expect(field(fieldName)).not.toBeNull();
      expect(field(fieldName).tagName).toEqual("INPUT");
      expect(field(fieldName).type).toEqual("text");
    });
  };

  const itIncludesTheExistingValue = (
    fieldName: keyof Customer,
    existing: string
  ) => {
    it("includes the existing value for the first time", () => {
      const customer = { ...blankCustomer };
      customer[fieldName] = existing;

      render(<CustomerForm original={customer} />);
      expect(field(fieldName).value).toEqual(existing);
    });
  };

  const itRendersALabel = (fieldName: string, text: string) => {
    it("renders a label for the field", () => {
      render(<CustomerForm original={blankCustomer} />);
      const label = element(`label[for=${fieldName}]`);
      expect(labelFor(fieldName)).not.toBeNull();
    });

    it(`renders ${text} as the label content`, () => {
      render(<CustomerForm original={blankCustomer} />);
      const label = element(`label[for=${fieldName}]`);
      expect(label).toContainText(text);
    });
  };

  const itAssignsAnID = (fieldName: string) => {
    it("assigns an id that matches the label", () => {
      render(<CustomerForm original={blankCustomer} />);
      expect(field(fieldName).id).toEqual(fieldName);
    });
  };

  const itRendersASubmitButton = () => {
    it("renders a submit button", () => {
      render(<CustomerForm original={blankCustomer} />);

      expect(submitButton()).not.toBeNull();
    });
  };

  const itSubmitsExistingValue = (fieldName: keyof Customer, value: string) => {
    it("saves existing value when submitted", () => {
      const customer = { ...blankCustomer };
      customer[fieldName] = value;
      render(<CustomerForm original={customer} />);
      click(submitButton());

      expect(fetchSpy).toBeCalledWith(
        expect.anything(),
        expect.objectContaining({
          body: JSON.stringify(customer),
        })
      );
    });
  };

  const itSubmitsNewValue = (fieldName: keyof Customer, value: string) =>
    it("saves new value when submitted", () => {
      const customer = { ...blankCustomer };
      customer[fieldName] = value;
      render(<CustomerForm original={blankCustomer} />);
      change(field(fieldName), value);
      click(submitButton());

      expect(fetchSpy).toBeCalledWith(
        expect.anything(),
        expect.objectContaining({
          body: JSON.stringify(customer),
        })
      );
    });

  describe("first name field", () => {
    itRendersATextBox("firstName");
    itIncludesTheExistingValue("firstName", "Ashley");
    itRendersALabel("firstName", "First name");
    itAssignsAnID("firstName");
    itRendersASubmitButton();
    itSubmitsExistingValue("firstName", "Jamie");
    itSubmitsNewValue("firstName", "Ronald");
  });

  describe("last name field", () => {
    itRendersATextBox("lastName");
    itIncludesTheExistingValue("lastName", "Johnson");
    itRendersALabel("lastName", "Last name");
    itAssignsAnID("lastName");
    itRendersASubmitButton();
    itSubmitsExistingValue("lastName", "Swanson");
    itSubmitsNewValue("lastName", "McDonalds");
  });

  describe("phone number field", () => {
    itRendersATextBox("phoneNumber");
    itIncludesTheExistingValue("phoneNumber", "9955");
    itRendersALabel("phoneNumber", "Phone number");
    itAssignsAnID("phoneNumber");
    itRendersASubmitButton();
    itSubmitsExistingValue("phoneNumber", "1234567");
    itSubmitsNewValue("phoneNumber", "7655555");
  });
});
