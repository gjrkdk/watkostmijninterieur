import { Fragment } from "react/jsx-runtime";
import { steps } from "../steps/steps";
import { useFormContext } from "../../../context/FormContext";
import {
  stepFurniture,
  stepCurtainsOrInbetweens,
  skipWindowAmountDetails,
  skipCurtainInbetweens,
  stepContactDetails,
} from "../../../utils/utils";
import { Box, Button, Paper, styled, Typography } from "@mui/material";
import { stepValidation, contactFormValidation } from "../../../validation";

const ButtonContainer = styled(Box)({
  marginTop: "16px",
  display: "flex",
  justifyContent: "space-between",
});

export const MultiStep = () => {
  const { activeStep, setActiveStep, selectedFormValues, contactDetails, setError, setResponse } =
    useFormContext();

  if (steps.length === 0) {
    return <div>Error: No steps available</div>;
  }

  const safeActiveStep = Math.min(activeStep, steps.length - 1);

  if (safeActiveStep < 0 || safeActiveStep >= steps.length) {
    return <div>Error: Invalid step</div>;
  }

  const StepTitle = steps[safeActiveStep].title;
  const StepQuestion = steps[safeActiveStep].question;
  const StepComponent = steps[safeActiveStep].component;

  if (!StepComponent) {
    return <div>Error: No component found</div>;
  }

  const contactFormStep = activeStep === 10;
  const finalStep = activeStep === steps.length - 1;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!contactFormValidation(contactDetails, setError)) {
      console.log("handleSubmit failed");
      return false;
    }

    try {
      const response = await fetch(`${process.env.API_URL}/hello`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        // body: JSON.stringify(selectedFormValues),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log(result);

      if (setResponse) {
        setResponse(result);
      } else {
        console.log("undefined jongen");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    handleNextStep();
    return true;
  };

  const handleNextStep = () => {
    if (activeStep < steps.length - 1) {
      let nextStep = activeStep + 1;

      const currentValidation = stepValidation[activeStep];

      if (currentValidation) {
        const isValid = currentValidation(selectedFormValues, setError);
        if (!isValid) {
          return;
        }
      }

      if (activeStep === 3 && stepFurniture(selectedFormValues)) {
        nextStep += 4;
      }

      if (activeStep === 4 && stepCurtainsOrInbetweens(selectedFormValues)) {
        nextStep += 2;
      }

      if (activeStep === 4 && skipWindowAmountDetails(selectedFormValues)) {
        nextStep += 2;
      }

      if (activeStep === 6 && skipCurtainInbetweens(selectedFormValues)) {
        nextStep += 1;
      }

      if (activeStep === 8 && stepContactDetails(selectedFormValues)) {
        nextStep += 1;
      }

      setActiveStep(nextStep);
    }
  };

  const handlePreviousStep = () => {
    if (activeStep > 0) {
      let previousStep = activeStep - 1;

      if (activeStep === 8 && stepFurniture(selectedFormValues)) {
        previousStep -= 2;
      }

      if (activeStep === 7 && stepCurtainsOrInbetweens(selectedFormValues)) {
        previousStep -= 2;
      }

      if (activeStep === 7 && skipWindowAmountDetails(selectedFormValues)) {
        previousStep -= 2;
      }

      if (activeStep === 8 && skipCurtainInbetweens(selectedFormValues)) {
        previousStep -= 2;
      }

      if (activeStep === 10 && stepContactDetails(selectedFormValues)) {
        previousStep -= 1;
      }

      setActiveStep(previousStep);
    }
  };

  return (
    <Fragment>
      <Typography variant="h1">{StepTitle}</Typography>
      <Typography variant="h2">{StepQuestion}</Typography>
      <Paper>
        <Box component="form" onSubmit={handleSubmit} id="multi-step-form">
          <StepComponent />
        </Box>
      </Paper>
      <ButtonContainer>
        <Button onClick={handlePreviousStep} disabled={activeStep === 0} variant="contained">
          Previous
        </Button>
        {!contactFormStep && !finalStep && (
          <Button onClick={handleNextStep} variant="contained">
            Next
          </Button>
        )}
        {contactFormStep && (
          <Button type="submit" form="multi-step-form" variant="contained">
            Submit
          </Button>
        )}
      </ButtonContainer>
    </Fragment>
  );
};
