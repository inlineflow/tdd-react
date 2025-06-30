import React from "react";
// import { waitFor } from "@testing-library/react";
import {
  initializeReactContainer,
  element,
  renderAndWait,
  render,
} from "./reactTestExtensions";

import { AppointmentDaysViewLoader } from "../src/AppointmentsDaysViewLoader";

import { AppointmentDaysView } from "../src/AppointmentDaysView";
import { Appointment } from "../src/types/customer";
import { today, todayAt, tomorrow, tomorrowAt } from "./builders/time";
import { fetchResponseOk } from "./builders/fetch";

jest.mock("../src/AppointmentDaysView", () => ({
  AppointmentDaysView: jest.fn(() => <div id="AppointmentDaysView"></div>),
}));

describe("AppointmentDaysViewLoader", () => {
  const appointments: Appointment[] = [
    {
      startsAt: todayAt(9),
      customer: {
        firstName: "Jessica",
        lastName: "",
        phoneNumber: "",
      },
      stylist: "",
      service: "",
      notes: [],
    },
    {
      startsAt: todayAt(10),
      customer: {
        firstName: "Fred",
        lastName: "",
        phoneNumber: "",
      },
      stylist: "",
      service: "",
      notes: [],
    },
  ];
  beforeEach(() => {
    initializeReactContainer();
    jest
      .spyOn(global, "fetch")
      .mockResolvedValue(fetchResponseOk(appointments));

    // jest.restoreAllMocks();
  });

  //   afterEach(() => {
  //     // fetchMock.mockRestore();
  //     // jest.restoreAllMocks();
  //     // (global.fetch as jest.Mock).mockReset();
  //   });

  it("renders an AppointmentDaysView", async () => {
    await render(<AppointmentDaysViewLoader />);
    expect(element("#AppointmentDaysView")).not.toBeNull();
  });

  it("initially passes an empty array to AppointmentsDaysView", async () => {
    await renderAndWait(<AppointmentDaysViewLoader />);

    expect(AppointmentDaysView).toHaveBeenCalledWith(
      { appointments: [] },
      undefined
    );
  });

  it("fetches data when component mounts", async () => {
    const from = todayAt(0);
    const to = todayAt(23, 59, 59, 999);

    await renderAndWait(<AppointmentDaysViewLoader today={today} />);

    expect(global.fetch).toHaveBeenCalledWith(`/appointments/${from}-${to}`, {
      method: "GET",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
    });
  });

  it("passes fetched appointments to AppointmentDaysView once they have loaded", async () => {
    // (global.fetch as jest.Mock).mockClear();
    await renderAndWait(<AppointmentDaysViewLoader />);

    // expect(AppointmentDaysView).toHaveBeenCalledTimes(2);
    expect(AppointmentDaysView).toHaveBeenLastCalledWith(
      { appointments },
      undefined
    );
  });

  it("re-requests appointment when today prop changes", async () => {
    const from = tomorrowAt(0);
    const to = tomorrowAt(23, 59, 59, 999);

    await renderAndWait(<AppointmentDaysViewLoader today={today} />);
    await renderAndWait(<AppointmentDaysViewLoader today={tomorrow} />);

    expect(global.fetch).toHaveBeenCalledWith(
      `/appointments/${from}-${to}`,
      expect.anything()
    );
  });
});
