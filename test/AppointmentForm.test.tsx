import React from "react";
import { AppointmentForm } from "../src/AppointmentForm";
import {
  element,
  elements,
  field,
  form,
  initializeReactContainer,
  render,
} from "./reactTestExtensions";

describe("AppointmentForm", () => {
  beforeEach(() => {
    initializeReactContainer();
  });

  const blankAppointment = {
    startsAt: new Date(),
    customer: {
      firstName: "",
      lastName: "",
      phoneNumber: "-482-1937",
    },
    stylist: "",
    service: "",
    notes: [],
  };
  const services = ["Cut", "Blow-dry"];

  const labelsOfAllOptions = (element: HTMLElement) =>
    Array.from(element.childNodes, (child) => child.textContent);

  it("renders a form", () => {
    render(<AppointmentForm original={blankAppointment} />);
    expect(form()).not.toBeNull();
  });

  describe("service field", () => {
    const findOption = (selectBox: HTMLSelectElement, textContent: string) => {
      const options = Array.from(selectBox.childNodes);
      return options.find(
        (option) => option.textContent === textContent
      ) as HTMLOptionElement;
    };

    it("renders as a select box", () => {
      render(<AppointmentForm original={blankAppointment} />);
      expect(field("service")).not.toBeNull();
      expect(field("service").tagName).toEqual("SELECT");
    });

    it("has a blank value as the first value", () => {
      render(<AppointmentForm original={blankAppointment} />);
      const firstOption = field("service").childNodes[0] as HTMLSelectElement;
      expect(firstOption.value).toEqual("");
    });

    it("lists all of salon's services", () => {
      render(
        <AppointmentForm
          selectableServices={services}
          original={blankAppointment}
        />
      );
      const labels = labelsOfAllOptions(field("service")).slice(1);
      expect(labels).toEqual(expect.arrayContaining(services));
    });

    it("preselects the existing value", () => {
      const appointment = blankAppointment;
      appointment.service = services[1];
      render(
        <AppointmentForm selectableServices={services} original={appointment} />
      );

      const option = findOption(
        field("service") as HTMLSelectElement,
        "Blow-dry"
      );
      expect(option.selected).toBe(true);
    });

    it("renders a time table", () => {
      render(<AppointmentForm original={blankAppointment} />);

      const table = element("table#time-slots");
      expect(table).not.toBeNull();
    });

    it("renders a time slot for every half an hour between open and close times", () => {
      render(
        <AppointmentForm
          original={blankAppointment}
          salonOpensAt={9}
          salonClosesAt={11}
        />
      );

      const timesOfDayHeadings = elements("tbody th");
      expect(timesOfDayHeadings[0]).toContainText("09:00");
      expect(timesOfDayHeadings[1]).toContainText("09:30");
      expect(timesOfDayHeadings[3]).toContainText("10:30");
    });

    it("renders an empty cell at the start of the header row", () => {
      render(<AppointmentForm original={blankAppointment} />);
      const headerRow = element("thead > tr");
      expect(headerRow?.firstChild).toContainText("");
    });

    it("renders a week of available dates", () => {
      const specificDate = new Date(2018, 11, 1);
      render(
        <AppointmentForm original={blankAppointment} today={specificDate} />
      );

      const dates = elements("thead >* th:not(:first-child)");
      expect(dates).toHaveLength(7);
      expect(dates[0]).toContainText("Sat 01");
      expect(dates[1]).toContainText("Sun 02");
      expect(dates[6]).toContainText("Fri 07");
    });
  });
});
