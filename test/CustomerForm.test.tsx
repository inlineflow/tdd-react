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
  beforeEach(() => {
    initializeReactContainer();
  });
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
    render(<CustomerForm original={blankCustomer} onSubmit={() => {}} />);
    const event = submit(form());

    expect(event.defaultPrevented).toBe(true);
  });

  const itRendersATextBox = (fieldName: string) => {
    it("renders a field as a text box", () => {
      render(<CustomerForm original={blankCustomer} />);
      expect(field(fieldName)).not.toBeNull();
      expect(field(fieldName).tagName).toEqual("INPUT");
      expect(field(fieldName).type).toEqual("text");
      // expect(element("form")).not.toBeNull();
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

  const itSavesTheValueWhenSubmitted = (
    fieldName: keyof Customer,
    value: string
  ) => {
    it("saves existing value when submitted", () => {
      expect.hasAssertions();
      render(
        <CustomerForm
          original={blankCustomer}
          onSubmit={(customer: Customer) =>
            expect(customer[fieldName]).toEqual(value)
          }
        />
      );
      change(field(fieldName), value);
      click(submitButton());
    });
  };

  describe("first name field", () => {
    itRendersATextBox("firstName");
    itIncludesTheExistingValue("firstName", "Ashley");
    itRendersALabel("firstName", "First name");
    itAssignsAnID("firstName");
    itRendersASubmitButton();
    itSavesTheValueWhenSubmitted("firstName", "Jamie");
  });

  describe("last name field", () => {
    itRendersATextBox("lastName");
    itIncludesTheExistingValue("lastName", "Johnson");
    itRendersALabel("lastName", "Last name");
    itAssignsAnID("lastName");
    itRendersASubmitButton();
    itSavesTheValueWhenSubmitted("lastName", "Swanson");
  });

  describe("phone number field", () => {
    itRendersATextBox("phoneNumber");
    itIncludesTheExistingValue("phoneNumber", "9955");
    itRendersALabel("phoneNumber", "Phone number");
    itAssignsAnID("phoneNumber");
    itRendersASubmitButton();
    itSavesTheValueWhenSubmitted("phoneNumber", "1234567");
  });
});
