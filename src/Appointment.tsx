import type { Customer } from "./types/customer";

type Props = {
  customer: Customer;
};
export const Appointment = ({ customer }: Props) => (
  <div>{customer.firstName}</div>
);
