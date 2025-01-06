import { createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true;
    tablet: true;
    laptop: true;
    desktop: true;
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: grey[900],
    },
  },
  typography: {
    h1: {
      fontFamily: "DM Sans",
      fontSize: "20px",
      fontWeight: "bold",
    },
    body1: {
      fontFamily: "DM Sans",
      fontSize: "16px",
      fontWeight: "normal",
    },
  },
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1200,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          margin: 0,
          padding: 0,
        },
        body: {
          margin: 0,
          padding: "20px 20px 120px 20px",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: "20px",
          height: "550px",
          borderRadius: "15px",
          boxShadow: "0px 5px 16px 0px rgba(8, 15, 52, 0.2)",
          overflowY: "auto",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "15px",
          padding: "10px",
          width: "100px",
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          width: "100%",
        },
      },
    },
    MuiFormGroup: {
      styleOverrides: {
        root: {
          flexDirection: "row",
          display: "flex",
          width: "100%",
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          width: "100%",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "black",
        },
      },
    },
  },
});
