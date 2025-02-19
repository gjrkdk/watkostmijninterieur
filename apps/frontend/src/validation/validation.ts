import { IContactDetails, IFormDataType } from "../context/FormContext";

export const roomValidation = (
  selectedFormValues: IFormDataType,
  setError: React.Dispatch<React.SetStateAction<Record<string, string>>>,
): boolean => {
  const roomIsSelected = selectedFormValues.rooms.some((room) => room.isSelected);

  if (!roomIsSelected) {
    setError({ rooms: "At least one room must be selected" });
    return false;
  }
  setError({});
  return true;
};

export const floorValidation = (
  selectedFormValues: IFormDataType,
  setError: React.Dispatch<React.SetStateAction<Record<string, string>>>,
): boolean => {
  const floorIsSelected = selectedFormValues.rooms.every(
    (room) => !room.isSelected || room.floors.some((floor) => floor.isSelected),
  );
  if (!floorIsSelected) {
    setError({ floors: "At least one floor must be selected" });
    return false;
  }
  setError({});
  return true;
};

export const roomSizeValidation = (
  selectedFormValues: IFormDataType,
  setError: React.Dispatch<React.SetStateAction<Record<string, string>>>,
): boolean => {
  const roomSizeIsSelected = selectedFormValues.rooms.every(
    (room) => !room.isSelected || room.roomSizes.some((size) => size.isSelected),
  );
  if (!roomSizeIsSelected) {
    setError({ roomSizes: "At least one floor size must be selected" });
    return false;
  }
  setError({});
  return true;
};

export const windowDecorationValidation = (
  selectedFormValues: IFormDataType,
  setError: React.Dispatch<React.SetStateAction<Record<string, string>>>,
): boolean => {
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
};

export const windowDecorationDetailsValidation = (
  selectedFormValues: IFormDataType,
  setError: React.Dispatch<React.SetStateAction<Record<string, string>>>,
) => {
  const windowDecorationDetailsSelected = selectedFormValues.rooms.every(
    (room) =>
      !room.isSelected ||
      room.windowDecoration?.some(
        (decoration) =>
          decoration.isSelected &&
          (decoration.label === "No window decoration needed" ||
            room.windowDecorationDetails?.some((detail) =>
              detail.details.some((details) => details.isSelected),
            )),
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
};

export const amountWindowsValidation = (
  selectedFormValues: IFormDataType,
  setError: React.Dispatch<React.SetStateAction<Record<string, string>>>,
): boolean => {
  const amountWindowSelected = selectedFormValues.rooms.some(
    (room) =>
      room.isSelected &&
      room.windowDecoration?.some(
        (decoration) =>
          decoration.isSelected &&
          decoration.label !== "Curtains" &&
          decoration.isSelected &&
          decoration.label !== "Inbetweens",
      ) &&
      room.amountWindows?.some((amount) => amount.isSelected),
  );

  if (!amountWindowSelected) {
    setError({ amountWindows: "At least one amount of windows must be selected" });
    return false;
  }
  setError({});
  return true;
};

export const windowSizeValidation = (
  selectedFormValues: IFormDataType,
  setError: React.Dispatch<React.SetStateAction<Record<string, string>>>,
): boolean => {
  const validationResults = selectedFormValues.rooms.map((room) => {
    const requiredWindows = parseInt(
      room.amountWindows?.find((window) => window.isSelected)?.amount || "0",
    );

    const selectedWindowSizes = room.windowSizes || [];
    const missingSizes = requiredWindows - selectedWindowSizes.length;

    return {
      roomLabel: room.label,
      missingSizes: missingSizes > 0 ? missingSizes : 0,
    };
  });

  const hasErrors = validationResults.some((result) => result.missingSizes > 0);
  if (hasErrors) {
    setError({ windowSizes: "All windows must have sizes selected" });
    return false;
  } else {
    setError({});
    return true;
  }
};

export const curtainInbetweenValidation = (
  selectedFormValues: IFormDataType,
  setError: React.Dispatch<React.SetStateAction<Record<string, string>>>,
): boolean => {
  const invalidCurtainInbetweenSize = selectedFormValues.rooms.filter(
    (room) =>
      room.isSelected &&
      room.windowDecoration?.some(
        (decoration) =>
          decoration.isSelected &&
          (decoration.label === "Curtains" || decoration.label === "Inbetweens"),
      ) &&
      (!room.curtainInbetweenSizes || !room.curtainInbetweenSizes.some((size) => size.isSelected)),
  );

  if (invalidCurtainInbetweenSize.length > 0) {
    setError({
      curtainInbetweenSizes: "At least one curtain or inbetween size must be selected",
    });
    return false;
  }

  setError({});
  return true;
};

export const furnitureValidation = (
  selectedFormValues: IFormDataType,
  setError: React.Dispatch<React.SetStateAction<Record<string, string>>>,
): boolean => {
  const furnitureSelected = selectedFormValues.rooms.every(
    (room) => !room.isSelected || room.furniture?.some((furniture) => furniture.isSelected),
  );

  if (!furnitureSelected) {
    setError({ furniture: "At least one furniture must be selected" });
    return false;
  }
  setError({});
  return true;
};

export const furnitureDetailsValidation = (
  selectedFormValues: IFormDataType,
  setError: React.Dispatch<React.SetStateAction<Record<string, string>>>,
): boolean => {
  const furnitureDetailsValid = selectedFormValues.rooms.every((room) => {
    if (!room.isSelected) return true;

    const selectedFurniture = room.furniture?.filter((furniture) => furniture.isSelected);
    if (!selectedFurniture || selectedFurniture.length === 0) return true;

    const hasValidFurniture = selectedFurniture.some(
      (furniture) => furniture.label !== "No furniture",
    );
    if (!hasValidFurniture) return true;

    return room.furnitureDetails?.some((detail) => detail.isSelected) || false;
  });

  if (!furnitureDetailsValid) {
    setError({ furnitureDetails: "At least one furniture detail should be selected" });
    return false;
  }
  setError({});
  return true;
};

export const contactValidation = (
  contactDetails: IContactDetails,
  setError: React.Dispatch<React.SetStateAction<Record<string, string>>>,
): boolean => {
  const errors: Record<string, string> = {};

  if (!contactDetails.firstName) {
    errors.firstName = "Don't forget your firstname";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!contactDetails.email) {
    errors.email = "Don't forget your email";
  } else if (!emailRegex.test(contactDetails.email)) {
    errors.email = "Please enter a valid email address";
  }

  setError(errors);

  console.log("Object", Object.keys(errors));

  return Object.keys(errors).length === 0;
};
