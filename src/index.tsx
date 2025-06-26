import React from "react";
import { createRoot } from "react-dom/client";
import { AppointmentsDayView } from "./AppointmentDaysView";
import { sampleAppointments } from "./sampleData";
import { CustomerForm } from "./CustomerForm";
import { AppointmentForm } from "./AppointmentForm";
import { Appointment } from "./types/customer";
import { todayAt, tomorrowAt } from "../test/builders/time";

const availableTimeSlots = [
  { startsAt: todayAt(9) },
  { startsAt: tomorrowAt(9, 30) },
  { startsAt: tomorrowAt(10, 30) },
  { startsAt: tomorrowAt(11, 30) },
];
const appointment = sampleAppointments[0];

createRoot(document.getElementById("root")!).render(
  <AppointmentForm
    availableTimeSlots={availableTimeSlots}
    onSubmit={({ startsAt }: Appointment) => console.log(startsAt)}
    original={appointment}
  />
);
