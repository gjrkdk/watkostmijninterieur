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
    return selectedFormValues.rooms.some((room) =>
      room.windowDecoration?.some(
        (decoration) => decoration.isSelected && decoration.label !== "No window decoration needed",
      ),
    );
  };

  const shouldRenderFurnitureDetails = () => {
    return selectedFormValues.rooms.some((room) =>
      room.furniture?.some(
        (furniture) => furniture.isSelected && furniture.label !== "No furniture",
      ),
    );
  };

  const includesCurtainsInbetweens = () => {
    return selectedFormValues.rooms.some((room) =>
      room.windowDecoration?.some(
        (decoration) =>
          decoration.isSelected &&
          decoration.label !== "Curtains" &&
          decoration.isSelected &&
          decoration.label !== "Inbetweens",
      ),
    );
  };

  console.log(includesCurtainsInbetweens());

  const handleNextStep = () => {
    if (activeStep < steps.length - 1) {
      let nextStep = activeStep + 1;
      if (activeStep === 3 && !shouldRenderWindowDecorationDetails()) {
        nextStep += 4;
      } else if (activeStep === 4 && !includesCurtainsInbetweens()) {
        nextStep += 3;
      } else if (activeStep === 8 && !shouldRenderFurnitureDetails()) {
        nextStep += 1;
      }
      setActiveStep(nextStep);
    }
  };

  const handlePreviousStep = () => {
    if (activeStep > 0) {
      let previousStep = activeStep - 1;

      if (activeStep === 8 && !shouldRenderWindowDecorationDetails()) {
        previousStep -= 4;
      } else if (activeStep === 7 && !includesCurtainsInbetweens()) {
        previousStep -= 2;
      } else if (activeStep === 10 && !shouldRenderFurnitureDetails()) {
        previousStep -= 1;
      }

      setActiveStep(previousStep);
    }
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
