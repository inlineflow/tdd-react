import React from "react";
import { createRoot } from "react-dom/client";
import { AppointmentsDayView } from "./AppointmentDaysView";
import { sampleAppointments } from "./sampleData";
import { CustomerForm } from "./CustomerForm";

createRoot(document.getElementById("root")!).render(<CustomerForm />);
