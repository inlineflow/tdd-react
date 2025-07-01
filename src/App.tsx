import { useCallback, useState } from "react";
import { AppointmentDaysViewLoader } from "./AppointmentsDaysViewLoader";
import { CustomerForm } from "./CustomerForm";
import { Customer } from "./types/customer";
import { AppointmentFormLoader } from "./AppointmentFormLoader";

export const blankCustomer: Customer = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  id: 0,
};

export const App = () => {
  const [view, setView] = useState("dayView");
  const transitionToAddCustomer = useCallback(() => setView("addCustomer"), []);
  const transitionToAddAppointment = useCallback(() => {
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
      return <AppointmentFormLoader />;
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
