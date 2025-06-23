import type { AppointmentType, Customer } from "./types/customer";

const appointmentStartOfDay = (startsAt: number) => {
  const [h, m] = new Date(startsAt).toTimeString().split(":");
  return `${h}:${m}`;
};

type Props = {
  customer: Customer;
};
export const Appointment = ({ customer }: Props) => (
  <div>{customer.firstName}</div>
);

export const AppointmentsDayView = ({
  appointments,
}: {
  appointments: AppointmentType[];
}) => (
  <div id="appointmentsDayView">
    <ol>
      {appointments.map((app) => (
        <li key={app.startsAt}>{appointmentStartOfDay(app.startsAt)}</li>
      ))}
    </ol>
  </div>
);
