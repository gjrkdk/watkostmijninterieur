import { steps } from "../steps/steps";
import { useFormContext } from "../../../context/FormContext";
import {
  shouldRenderWindowDecorationDetails,
  includesCurtainsInbetweens,
  shouldRenderFurnitureDetails,
} from "../../../utils/utils";
import { Box, Button } from "@mui/material";
import { contactFormSchema } from "../../../validation/schema";

export const MultiStep = () => {
  const { activeStep, setActiveStep, selectedFormValues, contactDetails, setError } =
    useFormContext();

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

  const contactFormStep = activeStep === 10;
  const finalStep = activeStep === steps.length - 1;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = contactFormSchema.safeParse(contactDetails);

    if (!result.success) {
      const formattedErrors: Record<string, string> = {};
      result.error.errors.forEach((error) => {
        if (error.path[0]) {
          formattedErrors[error.path[0]] = error.message;
        }
        setError(formattedErrors);
        console.log("Form has errors: ", formattedErrors);
      });
    } else {
      setError({});
      handleNextStep();
      console.log("Form submitted with values: ", selectedFormValues);
    }
  };

  const handleNextStep = () => {
    if (activeStep < steps.length - 1) {
      let nextStep = activeStep + 1;

      if (activeStep === 3 && !shouldRenderWindowDecorationDetails(selectedFormValues)) {
        nextStep += 4;
      } else if (activeStep === 4 && !includesCurtainsInbetweens(selectedFormValues)) {
        nextStep += 2;
      } else if (activeStep === 8 && !shouldRenderFurnitureDetails(selectedFormValues)) {
        nextStep += 1;
      }
      setActiveStep(nextStep);
    }
  };

  const handlePreviousStep = () => {
    if (activeStep > 0) {
      let previousStep = activeStep - 1;

      if (activeStep === 8 && !shouldRenderWindowDecorationDetails(selectedFormValues)) {
        previousStep -= 4;
      } else if (activeStep === 7 && !includesCurtainsInbetweens(selectedFormValues)) {
        previousStep -= 2;
      } else if (activeStep === 10 && !shouldRenderFurnitureDetails(selectedFormValues)) {
        previousStep -= 1;
      }
      setActiveStep(previousStep);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <StepComponent />
      <Button onClick={handlePreviousStep} disabled={activeStep === 0}>
        Previous
      </Button>
      {!contactFormStep && !finalStep && <Button onClick={handleNextStep}>Next</Button>}
      {contactFormStep && <Button type="submit">Submit</Button>}
    </Box>
  );
};
