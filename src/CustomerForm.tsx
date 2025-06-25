import { Customer } from "./types/customer";
import { useState } from "react";

type Props = {
  original: Customer;
  onSubmit?: (customer: Customer) => void;
};

export const CustomerForm = ({ original, onSubmit }: Props) => {
  const [customer, setCustomer] = useState(original);

  const handleChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer({ ...customer, firstName: e.target.value });
  };

  const handleSubmit = onSubmit
    ? (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit(customer);
      }
    : () => {};
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="firstName">First name</label>
      <input
        type="text"
        name="firstName"
        id="firstName"
        value={customer.firstName}
        onChange={handleChangeFirstName}
      />
      {/* <button type="submit" /> */}
      <input type="submit" />
    </form>
  );
};
