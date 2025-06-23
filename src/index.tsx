import React from "react";
import { createRoot } from "react-dom/client";
import { AppointmentsDayView } from "./AppointmentDaysView";
import { sampleAppointments } from "./sampleData";

createRoot(document.getElementById("root")!).render(
  <AppointmentsDayView appointments={sampleAppointments} />
);
