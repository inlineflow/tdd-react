import {
  AppointmentEntry,
  AppointmentDaysView,
} from "../src/AppointmentDaysView";
import type { Appointment } from "../src/types/customer";
import { sampleAppointments } from "../src/sampleData";
import {
  click,
  element,
  elements,
  initializeReactContainer,
  render,
  textOf,
  typesOf,
} from "./reactTestExtensions";
// import { toContainText } from "./matchers/toContainText";
describe("AppointmentEntry", () => {
  beforeEach(() => {
    initializeReactContainer();
  });

  it("renders the customer first name", () => {
    const appointment = sampleAppointments[0];

    render(<AppointmentEntry {...appointment} />);

    expect(document.body).toContainText("Ashley");
  });

  it("renders another customer first name", () => {
    const appointment = sampleAppointments[1];
    render(<AppointmentEntry {...appointment} />);

    expect(document.body).toContainText("Jordan");
  });

  it("renders customer last name", () => {
    const appointment = sampleAppointments[0];
    render(<AppointmentEntry {...appointment} />);

    expect(document.body).toContainText("Kaylegh");
  });

  it("renders the stylist", () => {
    const appointment = sampleAppointments[0];
    render(<AppointmentEntry {...appointment} />);

    expect(document.body).toContainText("Ethan Patel");
  });
});

describe("AppointmentsDayView", () => {
  const today = new Date();
  const appointments: Appointment[] = [
    {
      startsAt: today.setHours(12, 0),
      customer: {
        firstName: "Ashley",
        lastName: "Kaylegh",
        phoneNumber: "1234",
        id: 0,
      },
      stylist: "Johnny",
      service: "Johnny's Hair Salon",
      notes: ["Come at least 15 minutes early"],
    },
    {
      startsAt: today.setHours(13, 0),
      customer: {
        firstName: "Jordan",
        lastName: "Wilds",
        phoneNumber: "2345",
        id: 0,
      },
      stylist: "Mark",
      service: "Mark's Hair Salon",
      notes: ["Come with treats"],
    },
  ];

  const secondButton = () => elements("button")[1] as HTMLButtonElement;

  beforeEach(() => {
    initializeReactContainer();
  });

  it("renders a div with the right id", () => {
    render(<AppointmentDaysView appointments={[]} />);

    expect(element("div#appointmentsDayView")).not.toBeNull();
  });

  it("renders an ol element to display appointments", () => {
    render(<AppointmentDaysView appointments={[]} />);

    expect(element("ol")).not.toBeNull();
  });

  it("renders an li for each appointment", () => {
    render(<AppointmentDaysView appointments={appointments} />);

    const listChildren = elements("li");
    expect(listChildren).toHaveLength(2);
  });

  it("renders the time of each appointment", () => {
    render(<AppointmentDaysView appointments={appointments} />);
    expect(textOf(elements("li"))).toEqual(["12:00", "13:00"]);
  });

  it("initially shows a message saying there are no appointments today", () => {
    render(<AppointmentDaysView appointments={[]} />);

    expect(document.body).toContainText(
      "There are no appointments scheduled for today."
    );
  });

  it("selects the first appointment by default", () => {
    render(<AppointmentDaysView appointments={appointments} />);

    expect(document.body).toContainText("Ashley");
  });

  it("has a <button> element in each <li>", () => {
    render(<AppointmentDaysView appointments={appointments} />);

    const buttons = elements("li > *") as HTMLButtonElement[];
    expect(buttons).toHaveLength(2);
    expect(typesOf(buttons)).toEqual(["button", "button"]);
  });

  it("renders another element when selected", () => {
    render(<AppointmentDaysView appointments={appointments} />);
    click(secondButton());
    // expect(secondButton()).toHaveClass("toggled");

    expect(document.body).toContainText("Jordan");
  });
});

// describe("Appointment", () => {});
