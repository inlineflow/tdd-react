import { useCallback, useState } from "react";
import { AppointmentDaysViewLoader } from "./AppointmentsDaysViewLoader";
import { CustomerForm } from "./CustomerForm";
import { Appointment, Customer } from "./types/customer";
import { AppointmentFormLoader } from "./AppointmentFormLoader";
// import { blankAppointment } from "../test/builders/appointment";

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

export const blankCustomer: Customer = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  id: 0,
};

export const App = () => {
  const [view, setView] = useState("dayView");
  const [customer, setCustomer] = useState<Customer>(blankCustomer);
  const transitionToAddCustomer = useCallback(() => setView("addCustomer"), []);
  const transitionToAddAppointment = useCallback((customer: Customer) => {
    setCustomer(customer);
    setView("addAppointment");
  }, []);

  switch (view) {
    case "addCustomer":
      return (
        <CustomerForm
          original={blankCustomer}
          onSave={transitionToAddAppointment}
        />
      );
    case "addAppointment":
      return (
        <AppointmentFormLoader
          original={{
            ...blankAppointment,
            customer: customer,
          }}
        />
      );
    default:
      return (
        <>
          <menu>
            <li>
              <button type="button" onClick={transitionToAddCustomer}>
                Add customer and appointment
              </button>
            </li>
          </menu>
          <AppointmentDaysViewLoader />
        </>
      );
  }
  // return (
  //   <div>
  //     {view === "addCustomer" ? (
  //     ) : (
  //       <>
  //         <menu>
  //           <li>
  //             <button type="button" onClick={transitionToAddCustomer}>
  //               Add customer and appointment
  //             </button>
  //           </li>
  //         </menu>
  //         <AppointmentDaysViewLoader />)
  //       </>
  //     )}
  // )
  // </div>
  // );
};
