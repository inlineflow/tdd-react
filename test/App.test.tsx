import { App } from "../src/App";
import { AppointmentDaysViewLoader } from "../src/AppointmentsDaysViewLoader";
import { initializeReactContainer, render } from "./reactTestExtensions";

jest.mock("../src/AppointmentsDaysViewLoader", () => ({
  AppointmentDaysViewLoader: jest.fn(() => (
    <div id="AppointmentDaysViewLoader"></div>
  )),
}));

describe("App", () => {
  beforeEach(() => {
    initializeReactContainer();
  });

  it("initially shows the AppointmentDaysViewLoader", () => {
    render(<App />);

    expect(AppointmentDaysViewLoader).toBeRendered();
  });
});
