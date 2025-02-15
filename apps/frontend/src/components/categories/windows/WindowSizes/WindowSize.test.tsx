import { render, screen } from "@testing-library/react";
import { FormContext, IFormContext } from "../../../../context/FormContext";
import { WindowSizes } from "./WindowSizes";

describe("WindowSizes Component", () => {
  const mockContextValue: IFormContext = {
    activeStep: 6,
    setActiveStep: jest.fn(),
    error: {},
    setError: jest.fn(),
    selectedFormValues: {
      rooms: [
        {
          id: 0,
          label: "Living Room",
          isSelected: true,
          floors: [],
          roomSizes: [],
          windowDecoration: [
            { id: 0, label: "Wooden Blinds", isSelected: true },
            { id: 1, label: "Curtains", isSelected: false },
          ],
          windowDecorationDetails: [],
          amountWindows: [
            { id: 0, amount: "2", isSelected: false },
            { id: 1, amount: "1", isSelected: true },
          ],
          windowSizes: [],
        },
        {
          id: 1,
          label: "Kitchen",
          isSelected: true,
          floors: [],
          roomSizes: [],
          windowDecoration: [{ id: 0, label: "Wooden Blinds", isSelected: true }],
          windowDecorationDetails: [],
          amountWindows: [{ id: 0, amount: "1", isSelected: true }],
          windowSizes: [],
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
        <WindowSizes />
      </FormContext.Provider>,
    );
  }

  it("displays error messages if error.windowSizes is set", () => {
    const contextWithError = {
      ...mockContextValue,
      error: { windowSizes: "All windows must have sizes selected" },
    };
    renderWithContext(contextWithError);
    expect(screen.getAllByText("All windows must have sizes selected")).toHaveLength(2);
  });
});
