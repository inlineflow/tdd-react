import { JSX } from "react";
import { initializeReactContainer, render } from "../reactTestExtensions";

// jest.mock("../src/AppointmentsDaysViewLoader", () => ({
//   AppointmentDaysViewLoader: jest.fn(() => (
//     <div id="AppointmentDaysViewLoader"></div>
//   )),
// }));

describe("toBeRenderedMatcher", () => {
  //   const Component = () => <div id="component"></div>;
  let Component: jest.Mock<JSX.Element, [], any>;
  beforeEach(() => {
    initializeReactContainer();
    Component = jest.fn(() => <div></div>);
  });

  it("return pass is true when the element is rendered", () => {
    render(<Component />);

    expect(Component).toBeRendered();
  });

  it("returns pass is false when there's nothing rendered", () => {
    // render(null);
    expect(Component).not.toBeRendered();
  });
});
