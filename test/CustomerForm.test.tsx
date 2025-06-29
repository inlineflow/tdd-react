import {
  initializeReactContainer,
  render,
  element,
  form,
  field as field,
  submitButton,
  change,
  labelFor,
  clickAndWait,
  submitAndWait,
} from "./reactTestExtensions";
import { CustomerForm } from "../src/CustomerForm";
import { Customer } from "../src/types/customer";
import { fetchResponseError, fetchResponseOk } from "./builders/fetch";
import { bodyOfLastFetchRequest } from "./spyHelpers";

describe("CustomerForm", () => {
  const spy = <T,>() => {
    let receivedArguments: T[];
    let returnValue: T | undefined;
    return {
      fn: (...args: T[]) => {
        receivedArguments = args;
        return returnValue;
      },
      receivedArguments: () => receivedArguments,
      receivedArgument: (n: number) => receivedArguments[n],
      stubReturnValue: (value: T) => (returnValue = value),
    };
  };

  const originalFetch = global.fetch;
  let fetchSpy: {
    receivedArgument: any;
    fn: any;
    receivedArguments: () => unknown[];
    stubReturnValue: (value: unknown) => unknown;
  };

  // const fetchResponseError = () => Promise.resolve({ ok: false });

  // const bodyOfLastFetchRequest = () =>
  //   JSON.parse((fetchSpy.receivedArgument(1) as { body: string }).body);

  beforeEach(() => {
    initializeReactContainer();
    global.fetch = jest
      .spyOn(global, "fetch")
      .mockResolvedValue(fetchResponseOk({})) as jest.Mock;
  });
  // fetchSpy = spy();
  // global.fetch = fetchSpy.fn as unknown as () => Promise<Response>;
  // global.fetch.mockResolvedValue(fetchResponseOk({}));
  // });

  // afterEach(() => {
  //   global.fetch = originalFetch;
  // });

  const blankCustomer: Customer = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
  };

  it("renders a form", () => {
    render(<CustomerForm original={blankCustomer} />);
    expect(element("form")).not.toBeNull();
  });

  it("prevents the default action when submitting the form", async () => {
    render(<CustomerForm original={blankCustomer} />);
    const event = await submitAndWait(form());

    expect(event.defaultPrevented).toBe(true);
  });

  it("sends request to POST /customers when submitting the form", async () => {
    render(<CustomerForm original={blankCustomer} />);
    await clickAndWait(submitButton());
    expect(global.fetch).toHaveBeenCalledWith(
      "/customers",
      expect.objectContaining({
        method: "POST",
      })
    );
  });

  it("calls fetch with the right configuration", async () => {
    render(<CustomerForm original={blankCustomer} />);

    await clickAndWait(submitButton());
    expect(global.fetch).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      })
    );
  });

  it("notifies onSave when form is submitted", async () => {
    const customer = { ...blankCustomer, id: 123 };
    (global.fetch as jest.Mock).mockResolvedValue(fetchResponseOk(customer));
    const saveSpy = jest.fn();

    render(<CustomerForm original={customer} onSave={saveSpy} />);
    await clickAndWait(submitButton());

    expect(saveSpy).toHaveBeenCalledWith(customer);
  });

  describe("when POST request returns an error", () => {
    beforeEach(() => {
      (global.fetch as jest.Mock).mockResolvedValue(fetchResponseError());
    });

    it("renders an error message", async () => {
      render(<CustomerForm original={blankCustomer} />);
      await clickAndWait(submitButton());

      expect(element("[role=alert]")).toContainText("error occured");
    });

    it("does not notify onSave", async () => {
      const saveSpy = jest.fn();

      render(<CustomerForm original={blankCustomer} onSave={saveSpy} />);
      await clickAndWait(submitButton());

      expect(saveSpy).not.toHaveBeenCalled();
    });
  });

  it("renders an alert space", () => {
    render(<CustomerForm original={blankCustomer} />);
    expect(element("[role=alert]")).not.toBeNull();
  });

  it("initially has no text in the alert space", () => {
    render(<CustomerForm original={blankCustomer} />);

    expect(element("[role=alert]")).not.toContainText("error occured");
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
    it("saves existing value when submitted", async () => {
      const customer = { ...blankCustomer };
      customer[fieldName] = value;
      render(<CustomerForm original={customer} />);
      await clickAndWait(submitButton());

      expect(bodyOfLastFetchRequest()).toMatchObject(customer);
    });
  };

  const itSubmitsNewValue = (fieldName: keyof Customer, value: string) =>
    it("saves new value when submitted", async () => {
      render(<CustomerForm original={blankCustomer} />);
      change(field(fieldName), value);
      await clickAndWait(submitButton());

      expect(bodyOfLastFetchRequest()).toMatchObject({
        [fieldName]: value,
      });
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
