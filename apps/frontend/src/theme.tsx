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
      fontSize: "22px",
      fontWeight: "bold",
      color: "#170F49",
    },
    h2: {
      fontFamily: "DM Sans",
      fontSize: "18px",
      fontWeight: "normal",
      color: " #6F6C90",
      marginTop: "10px",
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
          padding: "20px 20px 100px 20px",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: "20px",
          height: "600px",
          borderRadius: "15px",
          boxShadow: "0px 5px 16px 0px rgba(8, 15, 52, 0.2)",
          width: "100%",
          overflowY: "auto",
        },
        elevation8: {
          height: "fit-content",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "56px",
          padding: "15px",
          width: "100px",
          background: "#4A3AFF",
          fontFamily: "DM Sans",
          fontSize: "14px",
          fontWeight: "bold",
          boxShadow: "0 3px 12px 0pxrgba(74, 58, 255, 0.18)",
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          width: "100%",
          marginTop: "20px",
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
          border: "1px solid #e0e0e0",
          borderRadius: "15px",
          boxShadow: "0 2px 11px 0px rgba(68, 65, 164, 0.2)",
          padding: "10px",
          margin: "0 0 10px 0",
          transition: "border 0.3s ease",
          "&.MuiFormControlLabel-selected": {
            border: "5px solid #4A3AFF",
            boxShadow: "0 2px 11px 0px rgba(74, 58, 255, 0.5)",
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontFamily: "DM Sans",
          fontSize: "18px",
          fontWeight: "bold",
          color: "#170F49",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          border: "none",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          border: "1px solid black",
          "&.MuiSelect-selected": {
            border: "5px solid #4A3AFF",
            boxShadow: "0 2px 11px 0px rgba(74, 58, 255, 0.5)",
          },
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "#170F49",
        },
      },
    },
  },
});
