import { useEffect, useState } from "react";
import { AppointmentDaysView } from "./AppointmentDaysView";
import { Appointment } from "./types/customer";

type AppointmentDaysViewLoaderProps = {
  today?: Date;
};

export const AppointmentDaysViewLoader = ({
  today = new Date(),
}: AppointmentDaysViewLoaderProps) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  useEffect(() => {
    const from = today.setHours(0, 0, 0, 0);
    const to = today.setHours(23, 59, 59, 999);

    const fetchAppointments = async () => {
      const res = await global.fetch(`/appointments/${from}-${to}`, {
        method: "GET",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = (await res.json()) as Appointment[];

      setAppointments(result);
    };

    fetchAppointments();
  }, []);
  return <AppointmentDaysView appointments={appointments} />;
};
