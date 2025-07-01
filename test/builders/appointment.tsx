import { Appointment } from "../../src/types/customer";

export const blankAppointment: Appointment = {
  startsAt: 0,
  customer: {
    id: 0,
    firstName: "",
    lastName: "",
    phoneNumber: "",
  },
  stylist: "",
  service: "",
  notes: [],
};
