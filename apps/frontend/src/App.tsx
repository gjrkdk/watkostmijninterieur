import { Steps } from "./components/form/Steps/Steps";
import { FormProvider } from "./context/FormContext";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { theme } from "./theme";

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FormProvider>
        <Steps />
      </FormProvider>
    </ThemeProvider>
  );
};

export default App;
