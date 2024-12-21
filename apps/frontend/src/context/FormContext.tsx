import React, { useState, createContext, ReactNode } from "react";
import { IFormData, IPrice } from "../types/types";

interface IFormContext {
  children: ReactNode;
}

interface IFormContextValue {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  selectedFormValues: IFormData;
  setSelectedFormValues: React.Dispatch<React.SetStateAction<IFormData>>;
  errors: { [key: string]: string };
  setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  price: IPrice;
  setPrice: React.Dispatch<React.SetStateAction<IPrice>>;
}

export const FormContext = createContext<IFormContextValue | null>(null);

export const FormProvider: React.FC<IFormContext> = ({ children }) => {
  const [activeStep, setActiveStep] = useState<number>(4);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [price, setPrice] = useState<IPrice>({ min: 0, max: 0 });
  const [selectedFormValues, setSelectedFormValues] = useState<IFormData>({
    rooms: [
      {
        name: "Livingroom",
        floor: "Hardwood",
        roomSize: "Big (30 m² - 50 m²)",
        windowDecoration: "Pleated Curtains",
        // amountWindows: "2",
        // windowSizes: ["100cm B x 200cm HG", "200cm B x 150cm HG"],
        // furniture: ["Couch", "Armchair", "Coffee table"],
        // furnitureDetails: "Premium",
      },
      {
        name: "Bedroom",
        floor: "Carpet",
        roomSize: "Big (30 m² - 50 m²)",
        windowDecoration: "Inbetweens",
        // windowDecorationDetails: "Comfort",
        // amountWindows: "2",
        // windowSizes: ["550cm B", "400cm B"],
        // furniture: ["No furniture"],
      },
    ],
    contactDetails: {
      firstName: "John",
      email: "JohnDoe@gmail.com",
      phone: "1234567890",
    },
    // contactDetails: {
    //   firstName: "",
    //   email: "",
    //   phone: "",
    // },
    // rooms: [],
  });

  console.log(selectedFormValues);

  return (
    <FormContext.Provider
      value={{
        activeStep,
        setActiveStep,
        selectedFormValues,
        setSelectedFormValues,
        errors,
        setErrors,
        price,
        setPrice,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
