import React, { useState } from "react";
import { FormContext, IFormDataType, IContactDetails } from "./FormContext";
import { initialRoomState } from "./initialRoomState";

interface IFormContext {
  children: React.ReactNode;
}

export const FormProvider: React.FC<IFormContext> = ({ children }) => {
  const [activeStep, setActiveStep] = useState<number>(10);
  const [error, setError] = useState<Record<string, string>>({});
  const [selectedFormValues, setSelectedFormValues] = useState<IFormDataType>({
    // rooms: initialRoomState,
    rooms: initialRoomState.map((room, index) => ({
      ...room,
      isSelected: index === 0 || index === 1,
      floors: room.floors.map((floor) => ({
        ...floor,
        isSelected:
          (index === 0 && floor.label === "Hardwood") || (index === 1 && floor.label === "Carpet"),
      })),
      roomSizes: room.roomSizes.map((roomSize) => ({
        ...roomSize,
        isSelected:
          (index === 0 && roomSize.label === "Small (15 m² - 20 m²)") ||
          (index === 1 && roomSize.label === "Big (30 m² - 50 m²)"),
      })),
      windowDecoration: room.windowDecoration?.map((windowDecoration) => ({
        ...windowDecoration,
        isSelected:
          (index === 0 && windowDecoration.label === "Wooden Blinds") ||
          (index === 1 && windowDecoration.label === "Duet Curtains"),
      })),
      windowDecorationDetails: room.windowDecorationDetails?.map((windowDecorationDetail) => ({
        ...windowDecorationDetail,
        details: windowDecorationDetail.details.map((detail) => ({
          ...detail,
          isSelected:
            (index === 0 && detail.label === "50mm") || (index === 1 && detail.label === "32mm"),
        })),
      })),
      amountWindows: room.amountWindows?.map((amountWindow) => ({
        ...amountWindow,
        isSelected:
          (index === 0 && amountWindow.amount === "1") ||
          (index === 1 && amountWindow.amount === "2"),
      })),
      windowSizes:
        index === 0
          ? ["100cm B x 200cm HG"]
          : index === 1
            ? ["250cm B x 200cm HG", "150cm B x 100cm HG"]
            : [],
      curtainInbetweenSizes: room.curtainInbetweenSizes?.map((curtainAndInbetweenSize) => ({
        ...curtainAndInbetweenSize,
        isSelected:
          (index === 0 && curtainAndInbetweenSize.label === "550cm B") ||
          (index === 1 && curtainAndInbetweenSize.label === "250cm B"),
      })),
      furniture: room.furniture?.map((furniture) => ({
        ...furniture,
        isSelected:
          (index === 0 && furniture.label === "Couch") ||
          (index === 1 && furniture.label === "Carpet"),
      })),
      furnitureDetails: room.furnitureDetails?.map((furnitureDetail) => ({
        ...furnitureDetail,
        isSelected:
          (index === 0 && furnitureDetail.label === "Premium") ||
          (index === 1 && furnitureDetail.label === "Essential"),
      })),
    })),
  });

  const [contactDetails, setContactDetails] = useState<IContactDetails>({
    firstName: "",
    email: "",
    phone: "",
    // firstName: "John",
    // email: "john.doe@example.com",
    // phone: "123456789",
  });

  const [response, setResponse] = useState<string>("");

  return (
    <FormContext.Provider
      value={{
        activeStep,
        setActiveStep,
        error,
        setError,
        selectedFormValues,
        setSelectedFormValues,
        contactDetails,
        setContactDetails,
        response,
        setResponse,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
