import React, { ReactNode } from "react";
import { act } from "react";
// import {ReactDOM} from "react-dom/client";
import {
  AppointmentEntry,
  AppointmentsDayView,
} from "../src/AppointmentDaysView";
import { Container, createRoot } from "react-dom/client";
import type { Appointment } from "../src/types/customer";
import { sampleAppointments } from "../src/sampleData";
describe("AppointmentEntry", () => {
  let container: Container;
  beforeEach(() => {
    container = document.createElement("div");
    document.body.replaceChildren(container);
  });

  const render = (component: ReactNode) =>
    act(() => createRoot(container).render(component));

  it("renders the customer first name", () => {
    const appointment = sampleAppointments[0];

    render(<AppointmentEntry {...appointment} />);

    expect(document.body.textContent).toContain("Ashley");
  });

  it("renders another customer first name", () => {
    const appointment = sampleAppointments[1];
    render(<AppointmentEntry {...appointment} />);

    expect(document.body.textContent).toContain("Jordan");
  });

  it("renders customer last name", () => {
    const appointment = sampleAppointments[0];
    render(<AppointmentEntry {...appointment} />);

    expect(document.body.textContent).toContain("Kaylegh");
  });

  it("renders the stylist", () => {
    const appointment = sampleAppointments[0];
    render(<AppointmentEntry {...appointment} />);

    expect(document.body.textContent).toContain("Ethan Patel");
  });
});

describe("AppointmentsDayView", () => {
  const today = new Date();
  const appointments: Appointment[] = [
    {
      startsAt: today.setHours(12, 0),
      customer: { firstName: "Ashley", lastName: "Kaylegh" },
      stylist: "Johnny",
      service: "Johnny's Hair Salon",
      notes: ["Come at least 15 minutes early"],
    },
    {
      startsAt: today.setHours(13, 0),
      customer: { firstName: "Jordan", lastName: "Wilds" },
      stylist: "Mark",
      service: "Mark's Hair Salon",
      notes: ["Come with treats"],
    },
  ];

  let container: Container;
  beforeEach(() => {
    container = document.createElement("div");
    document.body.replaceChildren(container);
  });

  const render = (component: ReactNode) =>
    act(() => createRoot(container).render(component));

  it("renders a div with the right id", () => {
    render(<AppointmentsDayView appointments={[]} />);

    expect(document.querySelector("div#appointmentsDayView")).not.toBeNull();
  });

  it("renders an ol element to display appointments", () => {
    render(<AppointmentsDayView appointments={[]} />);

    expect(document.querySelector("ol")).not.toBeNull();
  });

  it("renders an li for each appointment", () => {
    render(<AppointmentsDayView appointments={appointments} />);

    const listChildren = document.querySelectorAll("ol > li");
    expect(listChildren).toHaveLength(2);
  });

  it("renders the time of each appointment", () => {
    render(<AppointmentsDayView appointments={appointments} />);
    const listChildren = document.querySelectorAll("ol > li");
    expect(listChildren[0].textContent).toEqual("12:00");
    expect(listChildren[1].textContent).toEqual("13:00");
  });

  it("initially shows a message saying there are no appointments today", () => {
    render(<AppointmentsDayView appointments={[]} />);

    expect(document.body.textContent).toContain(
      "There are no appointments scheduled for today."
    );
  });

  it("selects the first appointment by default", () => {
    render(<AppointmentsDayView appointments={appointments} />);

    expect(document.body.textContent).toContain("Ashley");
  });

  it("has a <button> element in each <li>", () => {
    render(<AppointmentsDayView appointments={appointments} />);

    const buttons = document.querySelectorAll(
      "li > button"
    ) as NodeListOf<HTMLButtonElement>;
    expect(buttons).toHaveLength(2);
    expect(buttons[0].type).toEqual("button");
  });

  it("renders another element when selected", () => {
    render(<AppointmentsDayView appointments={appointments} />);

    const button = document.querySelectorAll(
      "li > button"
    )[1] as HTMLButtonElement;
    act(() => button.click());

    expect(document.body.textContent).toContain("Jordan");
  });
});

// describe("Appointment", () => {});
