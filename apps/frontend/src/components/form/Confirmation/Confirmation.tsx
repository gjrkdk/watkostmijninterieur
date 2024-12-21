import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { FormContext } from "../../../context/FormContext";
import { Summary } from "../Summary/Summary";

export const Confirmation = () => {
  const formContext = useContext(FormContext);

  if (!formContext) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        gap: 2,
        overflow: "auto",
        height: "100%",
      }}
    >
      <Typography variant="h1">Thank you for your request!</Typography>
      <Typography variant="body1">
        You will receive an email with the estimations. Here is a summary of your selection:
      </Typography>
      <Summary />
    </Box>
  );
};
