import { createContext, useContext, Dispatch, SetStateAction } from "react";
import { IOptions } from "./initialRoomState";

export interface IFormContext {
  activeStep: number;
  setActiveStep: (step: number) => void;
  error: Record<string, string>;
  setError: Dispatch<SetStateAction<Record<string, string>>>;
  selectedFormValues: IFormDataType;
  setSelectedFormValues: Dispatch<SetStateAction<IFormDataType>>;
  contactDetails: IContactDetails;
  setContactDetails: Dispatch<SetStateAction<IContactDetails>>;
}

export interface IFormDataType {
  rooms: IOptions[];
}

export interface IContactDetails {
  firstName: string;
  email: string;
  phone?: string;
}

export const FormContext = createContext<IFormContext | undefined>(undefined);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
