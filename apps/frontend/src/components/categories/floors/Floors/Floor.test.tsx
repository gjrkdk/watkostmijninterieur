import { render, screen, within } from "@testing-library/react";
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
          isSelected: true,
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
            { id: 0, label: "Hardwood", isSelected: false },
            { id: 1, label: "Carpet", isSelected: true },
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

  it("renders radio buttons for each room at floor selection step", () => {
    renderWithContext();
    const livingRoomSection = screen.getByRole("radiogroup", { name: "Living Room" });
    expect(within(livingRoomSection).getByRole("radio", { name: "Hardwood" })).toBeInTheDocument();
    expect(within(livingRoomSection).getByRole("radio", { name: "Carpet" })).toBeInTheDocument();
    expect(within(livingRoomSection).getByRole("radio", { name: "Tile" })).toBeInTheDocument();
  });

  it("displays error messages if error.floors is set", () => {
    const contextWithError = {
      ...mockContextValue,
      error: { floors: "At least one floor must be selected" },
    };
    renderWithContext(contextWithError);
    expect(screen.getAllByText("At least one floor must be selected")).toHaveLength(2);
  });
});
