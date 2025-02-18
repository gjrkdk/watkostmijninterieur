import { IFormDataType } from "../context/FormContext";

/**
 * Checks if all selected rooms have "No window decoration needed" selected.
 * Returns true if all selected rooms have "No window decoration needed" selected, otherwise false.
 */

export const stepFurniture = (selectedFormValues: IFormDataType) => {
  const selectedRooms = selectedFormValues.rooms.filter((room) => room.isSelected);

  const selectedNoWindowDecorationNeeded = selectedRooms.every(
    (room) =>
      room.isSelected &&
      room.windowDecoration?.some((decoration) => {
        const selectedLabels = ["No window decoration needed"];
        return decoration.isSelected && selectedLabels.includes(decoration.label);
      }),
  );
  return selectedNoWindowDecorationNeeded;
};

/**
 * Checks if all selected rooms have either "Curtains" or "Inbetweens" selected.
 * Returns true if all selected rooms have either "Curtains" or "Inbetweens" selected, otherwise false.
 */

export const stepCurtainsOrInbetweens = (selectedFormValues: IFormDataType) => {
  const selectedRooms = selectedFormValues.rooms.filter((room) => room.isSelected);

  const selectedCurtainsOrInbetweens = selectedRooms.every(
    (room) =>
      room.isSelected &&
      room.windowDecoration?.some((decoration) => {
        const selectedLabels = ["Curtains", "Inbetweens"];
        return decoration.isSelected && selectedLabels.includes(decoration.label);
      }),
  );
  return selectedCurtainsOrInbetweens;
};

/**
 * Checks if all selected rooms have either "Curtains", "Inbetweens", or "No window decoration needed" selected.
 * Returns true if all selected rooms have either "Curtains", "Inbetweens", or "No window decoration needed" selected, otherwise false.
 */

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

/**
 * Checks if all selected rooms have window decorations that do not require curtains or inbetweens.
 * Returns true if all selected rooms have window decorations that do not require curtains or inbetweens, otherwise false.
 */

export const skipCurtainInbetweens = (selectedFormValues: IFormDataType) => {
  const selectedRooms = selectedFormValues.rooms.filter((room) => room.isSelected);

  const selectedWindowDecorationNoWindowDecoration = selectedRooms.every(
    (room) =>
      room.isSelected &&
      room.windowDecoration?.some((decoration) => {
        const selectedLabels = [
          "No window decoration needed",
          "Wooden Blinds",
          "Aluminium Blinds",
          "Duet Curtains",
          "Pleated Curtains",
        ];
        return decoration.isSelected && selectedLabels.includes(decoration.label);
      }),
  );
  return selectedWindowDecorationNoWindowDecoration;
};

/**
 * Checks if all selected rooms have "No furniture" selected.
 * Returns true if all selected rooms have "No furniture" selected, otherwise false.
 */

export const stepContactDetails = (selectedFormValues: IFormDataType) => {
  const selectedRooms = selectedFormValues.rooms.filter((room) => room.isSelected);

  const selectedNoFurniture = selectedRooms.every(
    (room) =>
      room.isSelected &&
      room.furniture?.some((f) => {
        const selectedLabels = ["No furniture"];
        return f.isSelected && selectedLabels.includes(f.label);
      }),
  );
  return selectedNoFurniture;
};
