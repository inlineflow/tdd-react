import { Customer } from "./types/customer";

type Props = {
  original: Customer;
};

export const CustomerForm = ({ original }: Props) => {
  return (
    <form>
      <label htmlFor="firstName">First name</label>
      <input
        type="text"
        name="firstName"
        id="firstName"
        value={original.firstName}
        readOnly
      />
    </form>
  );
};
