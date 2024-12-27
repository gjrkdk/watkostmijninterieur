import { ThemeProvider } from "@mui/material/styles";
import { FormProvider } from "./context/FormProvider";
import { CssBaseline } from "@mui/material";
import { MultiStep } from "./components/form/MultiStep/MultiStep";
import { theme } from "./theme";

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FormProvider>
        <MultiStep />
      </FormProvider>
    </ThemeProvider>
  );
};

export default App;
