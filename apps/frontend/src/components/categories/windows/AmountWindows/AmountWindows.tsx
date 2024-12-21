import React, { useContext } from "react";
import { Questions } from "../../../../translations/questions";
import { Box, Button, Typography } from "@mui/material";
import { FormContext } from "../../../../context/FormContext";

export const AmountWindows = () => {
  const formContext = useContext(FormContext);

  if (!formContext) {
    return null;
  }

  const { setActiveStep } = formContext;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        overflow: "auto",
        height: "100%",
      }}
    >
      <Typography variant="h1">{Questions[10].text}</Typography>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          marginTop: "auto",
          justifyContent: "space-between",
        }}
      >
        <Button variant="contained" color="primary" size="medium" onClick={handleBack}>
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginLeft: "auto" }}
          onClick={handleNext}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};
