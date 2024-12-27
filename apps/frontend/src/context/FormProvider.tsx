import React, { useState } from "react";
import { FormContext, IFormDataType, IContactDetails } from "./FormContext";
import { initialStateRooms } from "./initialState";

interface IFormContext {
  children: React.ReactNode;
}

export const FormProvider: React.FC<IFormContext> = ({ children }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [selectedFormValues, setSelectedFormValues] = useState<IFormDataType>({
    rooms: initialStateRooms,
    // floors: "",
    // roomSizes: "",
    // windowDecoration: "",
    // windowDecorationDetails: "",
    // curtainSize: "",
    // amountWindows: "",
    // windowSizes: [],
    // furniture: [],
    // furnitureDetails: "",
  });
  const [contactDetails, setContactDetails] = useState<IContactDetails>({
    firstName: "",
    email: "",
    phone: "",
  });

  return (
    <FormContext.Provider
      value={{
        activeStep,
        setActiveStep,
        selectedFormValues,
        setSelectedFormValues,
        contactDetails,
        setContactDetails,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
