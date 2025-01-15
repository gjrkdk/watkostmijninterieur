import { Box, Typography } from "@mui/material";

export const Confirmation = () => {
  return (
    <Box>
      <Typography variant="h1">Thank you for your request!</Typography>
      {/* TODO: Create and add Summary component */}
      <Typography variant="body1">You will receive an email with the estimations.</Typography>
    </Box>
  );
};
