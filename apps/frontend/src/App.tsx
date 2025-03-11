import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { FormProvider } from "./context/FormProvider";
import { CssBaseline } from "@mui/material";
import { MultiStep } from "./components/form/MultiStep/MultiStep";
import { theme } from "./theme";
import { ComingSoon } from "./ComingSoon";

export const App = () => {
  const [isComingSoon, setIsComingSoon] = useState(false);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isComingSoon ? (
        <ComingSoon />
      ) : (
        <FormProvider>
          <MultiStep />
        </FormProvider>
      )}
    </ThemeProvider>
  );
};

export default App;
