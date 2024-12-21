import { createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: grey[900],
    },
  },
  typography: {
    h1: {
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          margin: 0,
          padding: 0,
          height: "100vh",
        },
        body: {
          margin: 0,
          padding: 0,
        },
      },
    },
  },
});
