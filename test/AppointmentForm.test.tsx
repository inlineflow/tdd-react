import React, { HTMLInputTypeAttribute } from "react";
import { AppointmentForm } from "../src/AppointmentForm";
import {
  click,
  element,
  elements,
  field,
  form,
  initializeReactContainer,
  render,
  submitButton,
} from "./reactTestExtensions";
import { Appointment, TimeSlot } from "../src/types/customer";
import { today, todayAt, tomorrowAt } from "./builders/time";

describe("AppointmentForm", () => {
  beforeEach(() => {
    initializeReactContainer();
  });

  const services = ["Cut", "Blow-dry"];
  const availableTimeSlots = [
    { startsAt: todayAt(9) },
    { startsAt: todayAt(9, 30) },
  ];

  const blankAppointment = {
    startsAt: availableTimeSlots[0].startsAt,
    customer: {
      firstName: "",
      lastName: "",
      phoneNumber: "-482-1937",
    },
    stylist: "",
    service: "",
    notes: [],
  };

  const testProps: {
    original: Appointment;
    availableTimeSlots: TimeSlot[];
    today: Date;
    onSubmit: () => void;
  } = {
    original: blankAppointment,
    availableTimeSlots: availableTimeSlots,
    today: today,
    onSubmit: () => {},
  };

  const startsAtField = (index: number) =>
    elements("input[type=radio]")[index] as HTMLInputElement;

  const labelsOfAllOptions = (element: HTMLElement) =>
    Array.from(element.childNodes, (child) => child.textContent);

  it("renders a form", () => {
    render(<AppointmentForm {...testProps} />);
    expect(form()).not.toBeNull();
  });

  it("renders a submit button", () => {
    render(<AppointmentForm {...testProps} />);

    expect(submitButton()).not.toBeNull();
  });

  it("saves existing value when submitted", () => {
    expect.hasAssertions();

    const appointment = { ...blankAppointment };
    appointment.startsAt = availableTimeSlots[1].startsAt;

    render(
      <AppointmentForm
        {...testProps}
        original={appointment}
        onSubmit={({ startsAt }: Appointment) =>
          expect(startsAt).toEqual(availableTimeSlots[1].startsAt)
        }
      />
    );

    const btnSubmit = submitButton();
    click(btnSubmit);
  });

  it("saves a new value when submitted", () => {
    expect.hasAssertions();

    const appointment = { ...blankAppointment };
    appointment.startsAt = availableTimeSlots[0].startsAt;

    render(
      <AppointmentForm
        {...testProps}
        original={appointment}
        onSubmit={({ startsAt }: Appointment) =>
          expect(startsAt).toEqual(availableTimeSlots[1].startsAt)
        }
      />
    );

    // const btnSubmit = submitButton();
    click(startsAtField(1));
    click(submitButton());
  });

  describe("service field", () => {
    const findOption = (selectBox: HTMLSelectElement, textContent: string) => {
      const options = Array.from(selectBox.childNodes);
      return options.find(
        (option) => option.textContent === textContent
      ) as HTMLOptionElement;
    };

    it("renders as a select box", () => {
      render(<AppointmentForm {...testProps} />);
      expect(field("service")).not.toBeNull();
      expect(field("service").tagName).toEqual("SELECT");
    });

    it("has a blank value as the first value", () => {
      render(
        <AppointmentForm
          original={blankAppointment}
          availableTimeSlots={availableTimeSlots}
          onSubmit={() => {}}
        />
      );
      const firstOption = field("service").childNodes[0] as HTMLSelectElement;
      expect(firstOption.value).toEqual("");
    });

    it("lists all of salon's services", () => {
      render(<AppointmentForm {...testProps} selectableServices={services} />);
      const labels = labelsOfAllOptions(field("service")).slice(1);
      expect(labels).toEqual(expect.arrayContaining(services));
    });

    it("preselects the existing value", () => {
      const appointment = blankAppointment;
      appointment.service = services[1];
      render(
        <AppointmentForm
          {...testProps}
          selectableServices={services}
          original={appointment}
        />
      );

      const option = findOption(
        field("service") as HTMLSelectElement,
        "Blow-dry"
      );
      expect(option.selected).toBe(true);
    });

    describe("time slot table", () => {
      it("renders a time table", () => {
        render(<AppointmentForm {...testProps} />);

        const table = element("table#time-slots");
        expect(table).not.toBeNull();
      });

      it("renders a time slot for every half an hour between open and close times", () => {
        render(
          <AppointmentForm {...testProps} salonOpensAt={9} salonClosesAt={11} />
        );

        const timesOfDayHeadings = elements("tbody th");
        expect(timesOfDayHeadings[0]).toContainText("09:00");
        expect(timesOfDayHeadings[1]).toContainText("09:30");
        expect(timesOfDayHeadings[3]).toContainText("10:30");
      });

      it("renders an empty cell at the start of the header row", () => {
        render(<AppointmentForm {...testProps} />);
        const headerRow = element("thead > tr");
        expect(headerRow?.firstChild).toContainText("");
      });

      it("renders a week of available dates", () => {
        const specificDate = new Date(2018, 11, 1);
        render(<AppointmentForm {...testProps} today={specificDate} />);

        const dates = elements("thead >* th:not(:first-child)");
        expect(dates).toHaveLength(7);
        expect(dates[0]).toContainText("Sat 01");
        expect(dates[1]).toContainText("Sun 02");
        expect(dates[6]).toContainText("Fri 07");
      });

      const cellsWithRadioButtons = () =>
        elements("input[type=radio]").map((el) =>
          elements("td").indexOf(el.parentElement as HTMLTableCellElement)
        );

      it("renders radio button in the correct table cell positions", () => {
        const availableTimeSlots = [
          { startsAt: todayAt(9) },
          { startsAt: todayAt(9, 30) },
          { startsAt: tomorrowAt(9, 30) },
        ];

        render(
          <AppointmentForm
            {...testProps}
            availableTimeSlots={availableTimeSlots}
          />
        );
        const buttons = cellsWithRadioButtons();
        expect(buttons).toEqual([0, 7, 8]);
      });

      it("doesn't render radio controls for unavailable time slots", () => {
        render(<AppointmentForm {...testProps} availableTimeSlots={[]} />);

        expect(elements("input[type=radio]")).toHaveLength(0);
      });

      it("sets radio button values to the startAt property of the corresponding appointment", () => {
        render(<AppointmentForm {...testProps} />);

        const allRadioValues = (
          elements("input[type=radio]") as HTMLInputElement[]
        ).map(({ value }) => parseInt(value));

        const allSlotTimes = availableTimeSlots.map(({ startsAt }) => startsAt);
        expect(allRadioValues).toEqual(allSlotTimes);
      });
    });

    it("pre-selects the existing value", () => {
      const appointment = { ...blankAppointment };
      appointment.startsAt = availableTimeSlots[1].startsAt;

      render(<AppointmentForm {...testProps} original={appointment} />);

      expect(startsAtField(1).checked).toBe(true);
    });
  });
});
