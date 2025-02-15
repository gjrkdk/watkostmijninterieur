import { render, screen, within } from "@testing-library/react";
import { FormContext, IFormContext } from "../../../../context/FormContext";
import { RoomSizes } from "./RoomSizes";

describe("RoomSizes Component", () => {
  const mockContextValue: IFormContext = {
    activeStep: 2,
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
          roomSizes: [
            { id: 0, label: "Small (15 m² - 20 m²)", isSelected: false },
            { id: 1, label: "Mid-sized (20 m² - 30 m²)", isSelected: false },
            { id: 2, label: "Big (30 m² - 50 m²)", isSelected: true },
          ],
        },
        {
          id: 1,
          label: "Kitchen",
          isSelected: true,
          floors: [],
          roomSizes: [
            { id: 0, label: "Small (15 m² - 20 m²)", isSelected: false },
            { id: 1, label: "Mid-sized (20 m² - 30 m²)", isSelected: true },
            { id: 2, label: "Big (30 m² - 50 m²)", isSelected: false },
          ],
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
          roomSizes: [
            { id: 0, label: "Small (15 m² - 20 m²)", isSelected: false },
            { id: 1, label: "Mid-sized (20 m² - 30 m²)", isSelected: false },
            { id: 2, label: "Big (30 m² - 50 m²)", isSelected: false },
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
        <RoomSizes />
      </FormContext.Provider>,
    );
  }

  it("renders radio buttons for each room at room size selection step", () => {
    renderWithContext();
    const livingRoomSection = screen.getByRole("radiogroup", { name: "Living Room" });
    expect(
      within(livingRoomSection).getByRole("radio", { name: "Small (15 m² - 20 m²)" }),
    ).toBeInTheDocument();
    expect(
      within(livingRoomSection).getByRole("radio", { name: "Mid-sized (20 m² - 30 m²)" }),
    ).toBeInTheDocument();
    expect(
      within(livingRoomSection).getByRole("radio", { name: "Big (30 m² - 50 m²)" }),
    ).toBeInTheDocument();
  });

  it("shows Big (30 m² - 50 m²) already selected for Living Room", () => {
    renderWithContext();
    const livingRoomSection = screen.getByRole("radiogroup", { name: "Living Room" });
    expect(
      within(livingRoomSection).getByRole("radio", { name: "Big (30 m² - 50 m²)" }),
    ).toBeChecked();
  });

  it("shows Mid-sized (20 m² - 30 m²) already selected for Kitchen", () => {
    renderWithContext();
    const kitchenSection = screen.getByRole("radiogroup", { name: "Kitchen" });
    expect(
      within(kitchenSection).getByRole("radio", { name: "Mid-sized (20 m² - 30 m²)" }),
    ).toBeChecked();
  });

  it("displays error messages if error.roomSizes is set", () => {
    const contextWithError = {
      ...mockContextValue,
      error: { roomSizes: "At least one floor size must be selected" },
    };
    renderWithContext(contextWithError);
    expect(screen.getAllByText("At least one floor size must be selected")).toHaveLength(2);
  });
});
