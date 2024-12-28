import { steps } from "../steps/steps";
import { useFormContext } from "../../../context/FormContext";

export const MultiStep = () => {
  const { activeStep, setActiveStep, selectedFormValues } = useFormContext();

  if (steps.length === 0) {
    return <div>Error: No steps available</div>;
  }

  const safeActiveStep = Math.min(activeStep, steps.length - 1);

  if (safeActiveStep < 0 || safeActiveStep >= steps.length) {
    return <div>Error: Invalid step</div>;
  }

  const StepComponent = steps[safeActiveStep].component;

  if (!StepComponent) {
    return <div>Error: No component found</div>;
  }

  const shouldRenderWindowDecorationDetails = () => {
    // Return true if any room has a selected window decoration other than "No window decoration needed"
    return selectedFormValues.rooms.some((room) =>
      room.windowDecoration?.some(
        (decoration) => decoration.isSelected && decoration.label !== "No window decoration needed",
      ),
    );
  };

  const handleNextStep = () => {
    if (activeStep < steps.length - 1) {
      if (activeStep === 3 && !shouldRenderWindowDecorationDetails()) {
        // Skip WindowDecorationDetails if no room has a valid decoration
        setActiveStep(activeStep + 2);
      } else {
        // Proceed to the next step as usual
        setActiveStep(activeStep + 1);
      }
    }
  };

  const handlePreviousStep = () => {
    setActiveStep(Math.max(activeStep - 1, 0));
  };

  return (
    <div>
      <StepComponent />
      <button onClick={handlePreviousStep} disabled={activeStep === 0}>
        Previous
      </button>
      <button onClick={handleNextStep} disabled={activeStep >= steps.length - 1}>
        Next
      </button>
    </div>
  );
};
