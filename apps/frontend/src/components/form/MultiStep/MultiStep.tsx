import { steps } from "../steps/steps";
import { useFormContext } from "../../../context/FormContext";

export const MultiStep = () => {
  const { activeStep, setActiveStep } = useFormContext();

  if (steps.length === 0) {
    return <div>Error: No steps available</div>;
  }

  const safeActivesStep = Math.min(activeStep, steps.length - 1);

  if (safeActivesStep < 0 || safeActivesStep >= steps.length) {
    return <div>Error: Invalid step</div>;
  }

  const StepComponent = steps[safeActivesStep].component;

  if (!StepComponent) {
    return <div>Error: No component found</div>;
  }

  const handleNextStep = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
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
