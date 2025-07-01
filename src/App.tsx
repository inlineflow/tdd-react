import { useCallback, useState } from "react";
import { AppointmentDaysViewLoader } from "./AppointmentsDaysViewLoader";
import { CustomerForm } from "./CustomerForm";
import { Customer } from "./types/customer";

export const blankCustomer: Customer = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
};

export const App = () => {
  const [view, setView] = useState("dayView");
  const transitionToAddCustomer = useCallback(() => setView("addCustomer"), []);

  return (
    <div>
      {view === "addCustomer" ? (
        <CustomerForm original={blankCustomer} />
      ) : (
        <>
          <menu>
            <li>
              <button type="button" onClick={transitionToAddCustomer}>
                Add customer and appointment
              </button>
            </li>
          </menu>
          <AppointmentDaysViewLoader />)
        </>
      )}
      )
    </div>
  );
};
