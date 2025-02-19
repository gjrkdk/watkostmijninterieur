import { render, screen } from "@testing-library/react";
import { FurnitureDetails } from "./FurnitureDetails";
import { FormContext, IFormContext } from "../../../../context/FormContext";

describe("FurnitureDetails Component", () => {
  const mockSetSelectedFormValues = jest.fn();

  const mockContextValue: IFormContext = {
    activeStep: 9,
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
            { id: 0, label: "Couch", isSelected: true, isDisabled: false },
            { id: 1, label: "No furniture", isSelected: false, isDisabled: false },
          ],
          furnitureDetails: [
            { id: 0, label: "Essential", isSelected: true },
            { id: 1, label: "Comfort", isSelected: false },
            { id: 2, label: "Premium", isSelected: false },
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
          furniture: [{ id: 0, label: "No furniture", isSelected: true, isDisabled: false }],
          furnitureDetails: [{ id: 0, label: "Essential", isSelected: false }],
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
          furnitureDetails: [],
        },
      ],
    },
    setSelectedFormValues: mockSetSelectedFormValues,
    contactDetails: { firstName: "", email: "" },
    setContactDetails: jest.fn(),
  };

  function renderWithContext(contextValue = mockContextValue) {
    return render(
      <FormContext.Provider value={contextValue}>
        <FurnitureDetails />
      </FormContext.Provider>,
    );
  }

  it("displays error message when error.furnitureDetails is set", () => {
    const contextWithError = {
      ...mockContextValue,
      error: { furnitureDetails: "You must select a furniture detail!" },
    };
    renderWithContext(contextWithError);

    expect(screen.getByText("You must select a furniture detail!")).toBeInTheDocument();
  });
});
