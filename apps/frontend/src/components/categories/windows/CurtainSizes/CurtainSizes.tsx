import { Box, Button } from "@mui/material";

export const CurtainSizes = () => {
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
      <Box
        sx={{
          display: "flex",
          width: "100%",
          marginTop: "auto",
          justifyContent: "space-between",
        }}
      >
        <Button variant="contained" color="primary" size="medium">
          Back
        </Button>
        <Button variant="contained" color="primary" sx={{ marginLeft: "auto" }}>
          Next
        </Button>
      </Box>
    </Box>
  );
};
