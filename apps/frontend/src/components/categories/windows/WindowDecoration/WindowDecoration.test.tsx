import { render, screen, within } from "@testing-library/react";
import { WindowDecoration } from "./WindowDecoration";
import { FormContext, IFormContext } from "../../../../context/FormContext";

describe("WindowDecoration Component", () => {
  const mockContextValue: IFormContext = {
    activeStep: 3,
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
            { id: 3, label: "Duet Curtains", isSelected: false },
            { id: 4, label: "Pleated Curtains", isSelected: false },
            { id: 5, label: "Inbetweens", isSelected: false },
            { id: 6, label: "No window decoration needed", isSelected: false },
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
            { id: 2, label: "Aluminium Blinds", isSelected: false },
            { id: 3, label: "Duet Curtains", isSelected: false },
            { id: 4, label: "Pleated Curtains", isSelected: false },
            { id: 5, label: "Inbetweens", isSelected: false },
            { id: 6, label: "No window decoration needed", isSelected: false },
          ],
        },
        {
          id: 2,
          label: "Bedroom",
          isSelected: false,
          floors: [],
          roomSizes: [],
          windowDecoration: [
            { id: 0, label: "Curtains", isSelected: false },
            { id: 1, label: "Wooden Blinds", isSelected: false },
            { id: 2, label: "Aluminium Blinds", isSelected: false },
            { id: 3, label: "Duet Curtains", isSelected: false },
            { id: 4, label: "Pleated Curtains", isSelected: false },
            { id: 5, label: "Inbetweens", isSelected: false },
            { id: 6, label: "No window decoration needed", isSelected: false },
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
        <WindowDecoration />
      </FormContext.Provider>,
    );
  }

  it("renders radio buttons for each selected room at window decoration selection step", () => {
    renderWithContext();
    const livingRoomSection = screen.getByRole("radiogroup", { name: "Living Room" });
    expect(within(livingRoomSection).getByRole("radio", { name: "Curtains" })).toBeInTheDocument();
    expect(
      within(livingRoomSection).getByRole("radio", { name: "Wooden Blinds" }),
    ).toBeInTheDocument();
    expect(
      within(livingRoomSection).getByRole("radio", { name: "Aluminium Blinds" }),
    ).toBeInTheDocument();
  });

  it("displays error messages if error.windowDecoration is set", () => {
    const contextWithError = {
      ...mockContextValue,
      error: { windowDecoration: "At least one window decoration must be selected" },
    };
    renderWithContext(contextWithError);
    expect(screen.getAllByText("At least one window decoration must be selected")).toHaveLength(2);
  });
});
