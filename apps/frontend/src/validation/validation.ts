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
    const floorIsSelected = selectedFormValues.rooms.some((room) =>
      room.floors.some((floor) => floor.isSelected),
    );
    console.log(floorIsSelected);
    if (!floorIsSelected) {
      setError({ floors: "At least one floor must be selected" });
      return false;
    }
    setError({});
    return true;
  }
  return true;
};
