import { IFormDataType } from "../context/FormContext";

export const shouldRenderWindowDecorationDetails = (selectedFormValues: IFormDataType) => {
  return selectedFormValues.rooms.some((room) =>
    room.windowDecoration?.some(
      (decoration) => decoration.isSelected && decoration.label !== "No window decoration needed",
    ),
  );
};

export const shouldRenderFurnitureDetails = (selectedFormValues: IFormDataType) => {
  return selectedFormValues.rooms.some((room) =>
    room.furniture?.some((furniture) => furniture.isSelected && furniture.label !== "No furniture"),
  );
};

export const includesCurtainsInbetweens = (selectedFormValues: IFormDataType) => {
  return selectedFormValues.rooms.some((room) =>
    room.windowDecoration?.some(
      (decoration) =>
        decoration.isSelected &&
        decoration.label !== "Curtains" &&
        decoration.isSelected &&
        decoration.label !== "Inbetweens",
    ),
  );
};
