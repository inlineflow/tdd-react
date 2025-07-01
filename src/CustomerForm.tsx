import { Customer } from "./types/customer";
import { useState } from "react";
import "../global.css";

export const Error = ({ hasError }: { hasError: boolean }) => {
  return <p role="alert">{hasError ? "An error occured during save." : ""}</p>;
};

type Props = {
  original?: Customer;
  onSave?: (customer: Customer) => void;
};

export const CustomerForm = ({
  original = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    id: 0,
  },
  onSave,
}: Props) => {
  const [customer, setCustomer] = useState(original);
  const [error, setError] = useState(false);

  const handleChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer({ ...customer, firstName: e.target.value });
  };

  const handleChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer({ ...customer, lastName: e.target.value });
  };

  const handleChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer({ ...customer, phoneNumber: e.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const result = await global.fetch("/customers", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer),
    });

    if (result.ok) {
      const customerWithId = await result.json();
      if (onSave) onSave(customerWithId);
    } else {
      setError(true);
    }
  };

  return (
    <div className="bg-slate-300 m-auto mt-48 w-fit h-fit">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col p-5 min-w-fit gap-5"
      >
        <Error hasError={error} />
        <div className="flex gap-10">
          <label htmlFor="firstName">First name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={customer.firstName}
            onChange={handleChangeFirstName}
            className="border-2 border-slate-950 rounded-xl"
          />
        </div>
        <div className="flex gap-10">
          <label htmlFor="lastName">Last name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={customer.lastName}
            onChange={handleChangeLastName}
            className="border-2 border-slate-950 rounded-xl"
          />
        </div>
        <div className="flex gap-10">
          <label htmlFor="phoneNumber">Phone number</label>
          <input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            value={customer.phoneNumber}
            onChange={handleChangePhoneNumber}
            className="border-2 border-slate-950 rounded-xl"
          />
        </div>

        <input type="submit" />
      </form>
    </div>
  );
};
