import { render, screen } from "@testing-library/react";
import { Contact } from "./Contact";
import { FormContext, IFormContext } from "../../../context/FormContext";

describe("Contact Component", () => {
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
    setSelectedFormValues: jest.fn(),
    contactDetails: {
      firstName: "",
      email: "",
      phone: "",
    },
    setContactDetails: jest.fn(),
  };

  const renderWithContext = (contextValue = mockContextValue) => {
    return render(
      <FormContext.Provider value={contextValue}>
        <Contact />
      </FormContext.Provider>,
    );
  };

  it("renders all input fields", () => {
    renderWithContext();

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
  });

  it("displays validation errors when present in context", () => {
    const contextWithErrors = {
      ...mockContextValue,
      error: {
        firstName: "Don't forget your firstname",
        email: "Don't forget your email",
      },
    };

    renderWithContext(contextWithErrors);

    expect(screen.getByText("Don't forget your firstname")).toBeInTheDocument();
    expect(screen.getByText("Don't forget your email")).toBeInTheDocument();
  });

  it("displays initial contact details from context", () => {
    const contextWithValues = {
      ...mockContextValue,
      contactDetails: {
        firstName: "John Doe",
        email: "john@example.com",
        phone: "1234567890",
      },
    };

    renderWithContext(contextWithValues);

    expect(screen.getByLabelText(/name/i)).toHaveValue("John Doe");
    expect(screen.getByLabelText(/email/i)).toHaveValue("john@example.com");
    expect(screen.getByLabelText(/phone/i)).toHaveValue("1234567890");
  });
});
