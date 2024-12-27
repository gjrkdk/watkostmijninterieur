import React, { useState } from "react";
import { FormContext, IFormDataType, IContactDetails } from "./FormContext";
import { initialRoomState } from "./initialRoomState";

interface IFormContext {
  children: React.ReactNode;
}

export const FormProvider: React.FC<IFormContext> = ({ children }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [selectedFormValues, setSelectedFormValues] = useState<IFormDataType>({
    rooms: initialRoomState,
  });
  const [contactDetails, setContactDetails] = useState<IContactDetails>({
    firstName: "",
    email: "",
    phone: "",
  });

  console.log("selectedFormValues", selectedFormValues);
  console.log("activeStep", activeStep);

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
