import { render, screen, within } from "@testing-library/react";
import { WindowDecorationDetails } from "./WindowDecorationDetails";
import { FormContext, IFormContext } from "../../../../context/FormContext";

describe("WindowDecoration Component", () => {
  const mockContextValue: IFormContext = {
    activeStep: 4,
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
            { id: 1, label: "Wooden Blinds", isSelected: false },
            { id: 2, label: "Aluminium Blinds", isSelected: true },
          ],
          windowDecorationDetails: [
            {
              id: 2,
              label: "Aluminium Blinds",
              details: [
                { id: 0, label: "25mm", isSelected: false },
                { id: 1, label: "50mm", isSelected: true },
              ],
            },
          ],
        },
        {
          id: 1,
          label: "Kitchen",
          isSelected: true,
          floors: [],
          roomSizes: [],
          windowDecoration: [
            { id: 0, label: "Curtains", isSelected: false },
            { id: 1, label: "Wooden Blinds", isSelected: true },
          ],
          windowDecorationDetails: [
            {
              id: 1,
              label: "Wooden Blinds",
              details: [
                { id: 0, label: "50mm", isSelected: true },
                { id: 1, label: "60mm", isSelected: false },
              ],
            },
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
        <WindowDecorationDetails />
      </FormContext.Provider>,
    );
  }

  it("renders radio buttons for each selected room's window decoration details", () => {
    renderWithContext();

    const livingRoomSection = screen.getByRole("radiogroup", { name: "Living Room" });
    expect(within(livingRoomSection).getByRole("radio", { name: "25mm" })).toBeInTheDocument();
    expect(within(livingRoomSection).getByRole("radio", { name: "50mm" })).toBeInTheDocument();

    const kitchenSection = screen.getByRole("radiogroup", { name: "Kitchen" });
    expect(within(kitchenSection).getByRole("radio", { name: "50mm" })).toBeInTheDocument();
    expect(within(kitchenSection).getByRole("radio", { name: "60mm" })).toBeInTheDocument();
  });

  it("displays error messages if error.windowDecorationDetails is set", () => {
    const contextWithError = {
      ...mockContextValue,
      error: { windowDecorationDetails: "At least one window decoration detail must be selected" },
    };
    renderWithContext(contextWithError);
    expect(
      screen.getAllByText("At least one window decoration detail must be selected"),
    ).toHaveLength(2);
  });
});
