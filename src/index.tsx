import React from "react";
import { createRoot } from "react-dom/client";
import { AppointmentsDayView } from "./AppointmentDaysView";
import { sampleAppointments } from "./sampleData";
import { CustomerForm } from "./CustomerForm";
import { AppointmentForm } from "./AppointmentForm";
import { Appointment } from "./types/customer";

const oneDayInMs = 24 * 60 * 60 * 1000;
const today = new Date();
const tomorrow = new Date(today.getTime() + oneDayInMs);
const availableTimeSlots = [
  { startsAt: today.setHours(9, 0, 0, 0) },
  { startsAt: tomorrow.setHours(9, 30, 0, 0) },
  { startsAt: tomorrow.setHours(10, 30, 0, 0) },
  { startsAt: tomorrow.setHours(11, 30, 0, 0) },
];
const appointment = sampleAppointments[0];

createRoot(document.getElementById("root")!).render(
  <AppointmentForm
    availableTimeSlots={availableTimeSlots}
    onSubmit={({ startsAt }: Appointment) => console.log(startsAt)}
    original={appointment}
  />
);
