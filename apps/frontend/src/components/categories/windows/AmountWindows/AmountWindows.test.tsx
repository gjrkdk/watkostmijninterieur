import { render, screen } from "@testing-library/react";
import { AmountWindows } from "./AmountWindows";
import { FormContext, IFormContext } from "../../../../context/FormContext";

describe("WindowDecoration Component", () => {
  const mockContextValue: IFormContext = {
    activeStep: 5,
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
            { id: 0, label: "Curtains", isSelected: false },
            { id: 1, label: "Wooden Blinds", isSelected: true },
            { id: 2, label: "Aluminium Blinds", isSelected: false },
          ],
          amountWindows: [
            { id: 0, amount: "1", isSelected: false },
            { id: 1, amount: "2", isSelected: true },
            { id: 2, amount: "3", isSelected: false },
          ],
        },
        {
          id: 1,
          label: "Kitchen",
          isSelected: false,
          floors: [],
          roomSizes: [],
          windowDecoration: [],
          amountWindows: [],
        },
        {
          id: 2,
          label: "Bedroom",
          isSelected: false,
          floors: [],
          roomSizes: [],
          windowDecoration: [],
          amountWindows: [],
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
        <AmountWindows />
      </FormContext.Provider>,
    );
  }

  it("displays error messages if error.amountWindows is set", () => {
    const contextWithError = {
      ...mockContextValue,
      error: { amountWindows: "At least one amount of windows must be selected" },
    };
    renderWithContext(contextWithError);
    expect(screen.getByText("At least one amount of windows must be selected")).toBeInTheDocument();
  });
});
