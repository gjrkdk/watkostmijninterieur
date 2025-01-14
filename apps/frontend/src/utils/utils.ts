import { IFormDataType } from "../context/FormContext";

export const stepWindowDecorationDetails = (selectedFormValues: IFormDataType) => {
  const checkValue = selectedFormValues.rooms.some((room) =>
    room.windowDecoration?.some(
      (decoration) => decoration.isSelected && decoration.label === "No window decoration needed",
    ),
  );
  console.log("no window decoration", checkValue);
  return checkValue;
};
