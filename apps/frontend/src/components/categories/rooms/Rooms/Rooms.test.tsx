import { render, screen } from "@testing-library/react";
import { Rooms } from "./Rooms";
import { FormContext, IFormContext } from "../../../../context/FormContext";

describe("Rooms Component", () => {
  const mockContextValue: IFormContext = {
    activeStep: 0,
    setActiveStep: jest.fn(),
    error: {},
    setError: jest.fn(),
    selectedFormValues: {
      rooms: [
        { id: 0, label: "Living Room", isSelected: false, floors: [], roomSizes: [] },
        { id: 1, label: "Kitchen", isSelected: true, floors: [], roomSizes: [] },
        { id: 2, label: "Bedroom", isSelected: false, floors: [], roomSizes: [] },
      ],
    },
    setSelectedFormValues: jest.fn(),
    contactDetails: { firstName: "", email: "" },
    setContactDetails: jest.fn(),
  };

  function renderWithContext(contextValue = mockContextValue) {
    return render(
      <FormContext.Provider value={contextValue}>
        <Rooms />
      </FormContext.Provider>,
    );
  }

  it("renders checkboxes for each room", () => {
    renderWithContext();

    expect(screen.getByRole("checkbox", { name: "Living Room" })).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "Kitchen" })).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "Bedroom" })).toBeInTheDocument();
  });

  it("displays error messages if error.rooms is set", () => {
    const contextWithError = {
      ...mockContextValue,
      error: { rooms: "Please select at least one room" },
    };

    renderWithContext(contextWithError);

    expect(screen.getByText("Please select at least one room")).toBeInTheDocument();
  });
});
