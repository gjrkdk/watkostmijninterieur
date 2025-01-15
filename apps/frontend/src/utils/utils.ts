import { IFormDataType } from "../context/FormContext";

export const stepFurniture = (selectedFormValues: IFormDataType) => {
  const selectedRooms = selectedFormValues.rooms.filter((room) => room.isSelected);

  const selectedNoWindowDecorationNeeded = selectedRooms.every(
    (room) =>
      room.isSelected &&
      room.windowDecoration?.some(
        (decoration) => decoration.isSelected && decoration.label === "No window decoration needed",
      ),
  );
  return selectedNoWindowDecorationNeeded;
};

export const stepCurtainsOrInbetweens = (selectedFormValues: IFormDataType) => {
  const selectedRooms = selectedFormValues.rooms.filter((room) => room.isSelected);

  const selectedCurtainsOrInbetweens = selectedRooms.every(
    (room) =>
      room.isSelected &&
      room.windowDecoration?.some(
        (decoration) =>
          (decoration.isSelected && decoration.label === "Curtains") ||
          (decoration.isSelected && decoration.label === "Inbetweens"),
      ),
  );
  return selectedCurtainsOrInbetweens;
};

export const skipWindowAmountDetails = (selectedFormValues: IFormDataType) => {
  const selectedRooms = selectedFormValues.rooms.filter((room) => room.isSelected);

  const selectedCurtainsInbetweensOrNoWindowDecoration = selectedRooms.every(
    (room) =>
      room.isSelected &&
      room.windowDecoration?.some((decoration) => {
        const selectedLabels = ["Curtains", "Inbetweens", "No window decoration needed"];
        return decoration.isSelected && selectedLabels.includes(decoration.label);
      }),
  );
  return selectedCurtainsInbetweensOrNoWindowDecoration;
};

export const skipCurtainInbetweens = (selectedFormValues: IFormDataType) => {
  const selectedRooms = selectedFormValues.rooms.filter((room) => room.isSelected);

  const selectedWindowDecorationNoWindowDecoration = selectedRooms.every(
    (room) =>
      room.isSelected &&
      room.windowDecoration?.some((decoration) => {
        const selectedLabels = ["No window decoration needed", "Wooden Blinds"];
        return decoration.isSelected && selectedLabels.includes(decoration.label);
      }),
  );
  return selectedWindowDecorationNoWindowDecoration;
};

export const stepContactDetails = (selectedFormValues: IFormDataType) => {
  const selectedRooms = selectedFormValues.rooms.filter((room) => room.isSelected);

  const selectedNoFurniture = selectedRooms.every(
    (room) =>
      room.isSelected && room.furniture?.some((f) => f.isSelected && f.label === "No furniture"),
  );
  return selectedNoFurniture;
};
