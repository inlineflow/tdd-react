import type { Appointment, Customer } from "./types/customer";
import { useState } from "react";

const appointmentStartOfDay = (startsAt: number) => {
  const [h, m] = new Date(startsAt).toTimeString().split(":");
  return `${h}:${m}`;
};

// type Props = {
//   appointment: Appointment;
// };
export const AppointmentEntry = ({
  customer,
  notes,
  service,
  startsAt,
  stylist,
}: Appointment) => (
  <div>
    <p>{customer.firstName}</p>
    <p>{customer.lastName}</p>
    <p>{service}</p>
    <p>{stylist}</p>
  </div>
);

export const AppointmentDaysView = ({
  appointments,
}: {
  appointments: Appointment[];
}) => {
  const [selectedAppointment, setSelectedAppointment] = useState(0);

  return (
    <div id="appointmentsDayView">
      <ol>
        {appointments.map((app, i) => (
          <li key={app.startsAt}>
            <button type="button" onClick={() => setSelectedAppointment(i)}>
              {appointmentStartOfDay(app.startsAt)}
            </button>
          </li>
        ))}
      </ol>
      {appointments.length === 0 ? (
        <p>There are no appointments scheduled for today.</p>
      ) : (
        <AppointmentEntry {...appointments[selectedAppointment]} />
      )}
    </div>
  );
};
