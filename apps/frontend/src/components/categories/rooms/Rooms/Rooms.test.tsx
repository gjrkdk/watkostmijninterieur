import { render, screen } from "@testing-library/react";
import { Rooms } from "./Rooms";
import { FormContext } from "../../../../context/FormContext";

describe("Rooms Component", () => {
  const mockSetSelectedFormValues = jest.fn();

  const mockContextValue = {
    selectedFormValues: {
      rooms: [
        { id: 1, label: "Living Room", isSelected: false, floors: [], roomSizes: [] },
        { id: 2, label: "Kitchen", isSelected: true, floors: [], roomSizes: [] },
      ],
    },
    setSelectedFormValues: mockSetSelectedFormValues,
    activeStep: 0,
    setActiveStep: jest.fn(),
    error: {},
    setError: jest.fn(),
    contactDetails: { firstName: "", email: "" },
    setContactDetails: jest.fn(),
  };

  const renderRooms = () => {
    return render(
      <FormContext.Provider value={mockContextValue}>
        <Rooms />
      </FormContext.Provider>,
    );
  };

  it("renders checkboxes for each room", () => {
    renderRooms();
    expect(screen.getByRole("checkbox", { name: "Living Room" })).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "Kitchen" })).toBeInTheDocument();
  });
});
