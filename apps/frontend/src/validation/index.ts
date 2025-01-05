import {
  roomValidation,
  floorValidation,
  roomSizeValidation,
  windowDecorationValidation,
  windowDecorationDetailsValidation,
  amountWindowsValidation,
  windowSizeValidation,
  curtainInbetweenValidation,
  furnitureValidation,
  furnitureDetailsValidation,
  contactValidation,
} from "./validation";

export const stepValidation = [
  roomValidation,
  floorValidation,
  roomSizeValidation,
  windowDecorationValidation,
  windowDecorationDetailsValidation,
  amountWindowsValidation,
  windowSizeValidation,
  curtainInbetweenValidation,
  furnitureValidation,
  furnitureDetailsValidation,
];

export const contactFormValidation = contactValidation;
