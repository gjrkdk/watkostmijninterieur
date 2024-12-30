import { createContext, useContext, Dispatch, SetStateAction } from "react";
import { IOptions } from "./initialRoomState";

export interface IFormContext {
  activeStep: number;
  setActiveStep: (step: number) => void;
  selectedFormValues: IFormDataType;
  setSelectedFormValues: Dispatch<SetStateAction<IFormDataType>>;
  contactDetails: IContactDetails;
  setContactDetails: (details: IContactDetails) => void;
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
