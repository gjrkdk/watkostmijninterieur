import { render, screen } from "@testing-library/react";

import { FormContext, IFormContext } from "../../../../context/FormContext";
import { Floors } from "./Floors";

describe("Floor Component", () => {
  const mockContextValue: IFormContext = {
    activeStep: 1,
    setActiveStep: jest.fn(),
    error: {},
    setError: jest.fn(),
    selectedFormValues: {
      rooms: [
        {
          id: 0,
          label: "Living Room",
          isSelected: false,
          floors: [
            { id: 0, label: "Hardwood", isSelected: true },
            { id: 1, label: "Carpet", isSelected: false },
            { id: 2, label: "Tile", isSelected: false },
          ],
          roomSizes: [],
        },
        {
          id: 1,
          label: "Kitchen",
          isSelected: true,
          floors: [
            { id: 0, label: "Hardwood", isSelected: true },
            { id: 1, label: "Carpet", isSelected: false },
            { id: 2, label: "Tile", isSelected: false },
          ],
          roomSizes: [],
        },
        {
          id: 2,
          label: "Bedroom",
          isSelected: false,
          floors: [
            { id: 0, label: "Hardwood", isSelected: true },
            { id: 1, label: "Carpet", isSelected: false },
            { id: 2, label: "Tile", isSelected: false },
          ],
          roomSizes: [],
        },
      ],
    },
    setSelectedFormValues: jest.fn(),
    contactDetails: { firstName: "", email: "" },
    setContactDetails: jest.fn(),
  };

  function renderWithContext(contextValue = mockContextValue) {
    return render(
      <FormContext.Provider value={contextValue}>
        <Floors />
      </FormContext.Provider>,
    );
  }

  it("renders radio buttons for each floor", () => {
    renderWithContext();
    expect(screen.getByRole("radio", { name: "Hardwood" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Carpet" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Tile" })).toBeInTheDocument();
  });

  it("shows Hardwood as already selected", () => {
    renderWithContext();
    expect(screen.getByRole("radio", { name: "Hardwood" })).toBeChecked();
  });

  it("displays error messages if error.floors is set", () => {
    const contextWithError = {
      ...mockContextValue,
      error: { floors: "At least one floor must be selected" },
    };
    renderWithContext(contextWithError);
    expect(screen.getByText("At least one floor must be selected")).toBeInTheDocument();
  });
});
