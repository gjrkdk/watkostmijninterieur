import { Box, Typography } from "@mui/material";
export const ComingSoon = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h1" sx={{ color: "black" }}>
        Coming soon...
      </Typography>
    </Box>
  );
};
