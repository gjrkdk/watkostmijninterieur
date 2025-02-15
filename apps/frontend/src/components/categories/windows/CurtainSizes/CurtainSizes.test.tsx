import { render, screen, within } from "@testing-library/react";
import { FormContext, IFormContext } from "../../../../context/FormContext";
import { CurtainSizes } from "./CurtainSizes";

describe("CurtainSizes Component", () => {
  const mockContextValue: IFormContext = {
    activeStep: 7,
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
            { id: 0, label: "Curtains", isSelected: true },
            { id: 1, label: "Wooden Blinds", isSelected: false },
          ],
          windowDecorationDetails: [],
          amountWindows: [],
          windowSizes: [],
          curtainInbetweenSizes: [
            { id: 0, label: "550cm B", isSelected: true },
            { id: 1, label: "400cm B", isSelected: false },
            { id: 2, label: "250cm B", isSelected: false },
            { id: 3, label: "150cm B", isSelected: false },
            { id: 4, label: "80cm B", isSelected: false },
          ],
        },
        {
          id: 1,
          label: "Kitchen",
          isSelected: true,
          floors: [],
          roomSizes: [],
          windowDecoration: [
            { id: 0, label: "Inbetweens", isSelected: true },
            { id: 1, label: "Wooden Blinds", isSelected: false },
          ],
          windowDecorationDetails: [],
          amountWindows: [],
          windowSizes: [],
          curtainInbetweenSizes: [
            { id: 0, label: "550cm B", isSelected: false },
            { id: 1, label: "400cm B", isSelected: true },
            { id: 2, label: "250cm B", isSelected: false },
            { id: 3, label: "150cm B", isSelected: false },
            { id: 4, label: "80cm B", isSelected: false },
          ],
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
        <CurtainSizes />
      </FormContext.Provider>,
    );
  }

  it("renders radio buttons for each room at curtain inbetween selection step", () => {
    renderWithContext();
    const kitchenRoomSection = screen.getByRole("radiogroup", { name: "Kitchen" });
    expect(within(kitchenRoomSection).getByRole("radio", { name: "550cm B" })).toBeInTheDocument();
    expect(within(kitchenRoomSection).getByRole("radio", { name: "400cm B" })).toBeInTheDocument();
    expect(within(kitchenRoomSection).getByRole("radio", { name: "250cm B" })).toBeInTheDocument();
    expect(within(kitchenRoomSection).getByRole("radio", { name: "150cm B" })).toBeInTheDocument();
    expect(within(kitchenRoomSection).getByRole("radio", { name: "80cm B" })).toBeInTheDocument();
  });

  it("displays error messages if error.curtainInbetweenSizes is set", () => {
    const contextWithError = {
      ...mockContextValue,
      error: { curtainInbetweenSizes: "At least one curtain or inbetween size must be selected" },
    };
    renderWithContext(contextWithError);
    expect(
      screen.getAllByText("At least one curtain or inbetween size must be selected"),
    ).toHaveLength(2);
  });
});
