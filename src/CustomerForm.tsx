import { Customer } from "./types/customer";
import { submit } from "../test/reactTestExtensions";

type Props = {
  original: Customer;
  onSubmit?: (customer: Customer) => void;
};

export const CustomerForm = ({ original, onSubmit }: Props) => {
  const handleSubmit = onSubmit
    ? (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit(original);
      }
    : () => {};
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="firstName">First name</label>
      <input
        type="text"
        name="firstName"
        id="firstName"
        value={original.firstName}
        readOnly
      />
      {/* <button type="submit" /> */}
      <input type="submit" />
    </form>
  );
};
