import { IFormDataType } from "../context/FormContext";

export const roomValidation = (
  activeStep: number,
  selectedFormValues: IFormDataType,
  setError: React.Dispatch<React.SetStateAction<Record<string, string>>>,
): boolean => {
  if (activeStep === 0) {
    const roomIsSelected = selectedFormValues.rooms.some((room) => room.isSelected);
    if (!roomIsSelected) {
      setError({ rooms: "At least one room must be selected." });
      return false;
    }
    setError({});
    return true;
  }
  return true;
};

export const floorValidation = (
  activeStep: number,
  selectedFormValues: IFormDataType,
  setError: React.Dispatch<React.SetStateAction<Record<string, string>>>,
): boolean => {
  if (activeStep === 1) {
    const floorIsSelected = selectedFormValues.rooms.every(
      (room) => !room.isSelected || room.floors.some((floor) => floor.isSelected),
    );
    if (!floorIsSelected) {
      setError({ floors: "At least one floor must be selected" });
      return false;
    }
    setError({});
    return true;
  }
  return true;
};

export const roomSizeValidation = (
  activeStep: number,
  selectedFormValues: IFormDataType,
  setError: React.Dispatch<React.SetStateAction<Record<string, string>>>,
): boolean => {
  if (activeStep === 2) {
    const roomSizeIsSelected = selectedFormValues.rooms.every(
      (room) => !room.isSelected || room.roomSizes.some((size) => size.isSelected),
    );
    if (!roomSizeIsSelected) {
      setError({ roomSizes: "At least one floor size must be selected" });
      return false;
    }
    setError({});
    return true;
  }
  return true;
};

export const windowDecorationValidation = (
  activeStep: number,
  selectedFormValues: IFormDataType,
  setError: React.Dispatch<React.SetStateAction<Record<string, string>>>,
): boolean => {
  if (activeStep === 3) {
    const windowDecorationSelected = selectedFormValues.rooms.every(
      (room) =>
        !room.isSelected || room.windowDecoration?.some((decoration) => decoration.isSelected),
    );
    if (!windowDecorationSelected) {
      setError({ windowDecoration: "At least one window decoration must be selected" });
      return false;
    }
    setError({});
    return true;
  }
  return true;
};

export const windowDecorationDetailsValidation = (
  activeStep: number,
  selectedFormValues: IFormDataType,
  setError: React.Dispatch<React.SetStateAction<Record<string, string>>>,
): boolean => {
  if (activeStep === 4) {
    const windowDecorationDetailsSelected = selectedFormValues.rooms.every(
      (room) =>
        !room.isSelected ||
        room.windowDecorationDetails?.some((detail) =>
          detail.details.some((details) => details.isSelected),
        ),
    );
    if (!windowDecorationDetailsSelected) {
      setError({
        windowDecorationDetails: "At least one window decoration detail must be selected",
      });
      return false;
    }
    setError({});
    return true;
  }
  return true;
};
