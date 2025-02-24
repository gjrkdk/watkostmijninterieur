import { Box, Typography } from "@mui/material";
import { useFormContext } from "../../../context/FormContext";

export const Confirmation = () => {
  const { contactDetails, response } = useFormContext();

  const name = contactDetails?.firstName || "";

  return (
    <Box>
      <Typography variant="h1">{`Thank you ${name}, for submitting the form!`}</Typography>
      <Typography variant="body1">You will receive an email with the estimations.</Typography>
      <Typography variant="body1">{response}</Typography>
    </Box>
  );
};
