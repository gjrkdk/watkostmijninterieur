import { render, screen } from "@testing-library/react";
import { FormContext, IFormContext } from "../../../../context/FormContext";
import { Furniture } from "./Furniture";

describe("Furniture Component", () => {
  const mockContextValue: IFormContext = {
    activeStep: 8,
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
          windowDecoration: [],
          windowDecorationDetails: [],
          amountWindows: [],
          windowSizes: [],
          curtainInbetweenSizes: [],
          furniture: [
            { id: 0, label: "Couch", isSelected: false, isDisabled: false },
            { id: 1, label: "Armchair", isSelected: false, isDisabled: false },
            { id: 2, label: "Coffee table", isSelected: true, isDisabled: false },
            { id: 3, label: "Dining room table", isSelected: true, isDisabled: false },
            { id: 4, label: "Dining room chair", isSelected: false, isDisabled: false },
            { id: 5, label: "TV furniture", isSelected: false, isDisabled: false },
            { id: 6, label: "Carpet", isSelected: false, isDisabled: false },
            { id: 7, label: "No furniture", isSelected: false, isDisabled: false },
          ],
        },
        {
          id: 1,
          label: "Kitchen",
          isSelected: true,
          floors: [],
          roomSizes: [],
          windowDecoration: [],
          windowDecorationDetails: [],
          amountWindows: [],
          windowSizes: [],
          curtainInbetweenSizes: [],
          furniture: [
            { id: 0, label: "Couch", isSelected: true, isDisabled: false },
            { id: 1, label: "Armchair", isSelected: false, isDisabled: false },
            { id: 2, label: "Coffee table", isSelected: false, isDisabled: false },
            { id: 3, label: "Dining room table", isSelected: false, isDisabled: false },
            { id: 4, label: "Dining room chair", isSelected: false, isDisabled: false },
            { id: 5, label: "TV furniture", isSelected: false, isDisabled: false },
            { id: 6, label: "Carpet", isSelected: false, isDisabled: false },
            { id: 7, label: "No furniture", isSelected: false, isDisabled: false },
          ],
        },
        {
          id: 2,
          label: "Bedroom",
          isSelected: false,
          floors: [],
          roomSizes: [],
          windowDecoration: [],
          windowDecorationDetails: [],
          amountWindows: [],
          windowSizes: [],
          curtainInbetweenSizes: [],
          furniture: [],
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
        <Furniture />
      </FormContext.Provider>,
    );
  }

  it("displays error messages if error.furniture is set", () => {
    const errorContext = {
      ...mockContextValue,
      error: { furniture: "At least one furniture must be selected" },
    };
    renderWithContext(errorContext);

    expect(screen.getAllByText("At least one furniture must be selected")).toHaveLength(2);
  });
});
