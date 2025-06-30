import React from "react";
import {
    initializeReactContainer,
    element,
    renderAndWait,
    render
} from "./reactTestExtensions"

import {
    AppointmentDaysViewLoader
} from "../src/AppointmentsDaysViewLoader"

import {
    AppointmentDaysView
} from "../src/AppointmentDaysView";

jest.mock("../src/AppointmentDaysView", () => ({
    AppointmentDaysView: jest.fn(() => 
        <div id="AppointmentDaysView"></div>
    )
}))


describe("AppointmentDaysViewLoader", () => {
    beforeEach(() => {
        initializeReactContainer();
        // jest.restoreAllMocks();
    })

    it("renders an AppointmentDaysView", async () => {
        await render(<AppointmentDaysViewLoader />)
        expect(
            element("#AppointmentDaysView")
        ).not.toBeNull();
    })

    it("initially passes an empty array to AppointmentsDaysView", async () => {
        await renderAndWait(<AppointmentDaysViewLoader />)

        expect(AppointmentDaysView).toHaveBeenCalledWith({appointments: [] }, undefined )
    })
})
