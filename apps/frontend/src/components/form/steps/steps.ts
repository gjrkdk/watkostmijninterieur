import {
  Rooms,
  Floors,
  RoomSizes,
  WindowDecoration,
  WindowDecorationDetails,
  AmountWindows,
  WindowSizes,
  CurtainSizes,
  Furniture,
  FurnitureDetails,
} from "../../categories/index";
import { Contact } from "../Contact/Contact";
import { Confirmation } from "../Confirmation/Confirmation";

interface IStepConfig {
  id: number;
  component: React.ComponentType;
  title?: string;
  question?: string;
}

export const steps: IStepConfig[] = [
  {
    id: 0,
    component: Rooms,
    title: "Rooms",
    question: "Which room do you like to decorate?",
  },
  {
    id: 1,
    component: Floors,
    title: "Floors",
    question: "Which floor do you like to decorate?",
  },
  {
    id: 2,
    component: RoomSizes,
    title: "Room sizes",
    question: "What is the average m² for each selected room?",
  },
  {
    id: 3,
    component: WindowDecoration,
    title: "Window decoration",
    question: "Which window decoration would you like to choose?",
  },
  {
    id: 4,
    component: WindowDecorationDetails,
    title: "Window decoration details",
    question: "Select details for your window decoration",
  },
  {
    id: 5,
    component: AmountWindows,
    title: "Amount windows",
    question: "How many windows do you want to decorate?",
  },
  {
    id: 6,
    component: WindowSizes,
    title: "Window sizes",
    question: "Select sizes for each window",
  },
  {
    id: 7,
    component: CurtainSizes,
    title: "Curtain sizes",
    question: "Select one of the most common curtain or inbetween widths",
  },
  {
    id: 8,
    component: Furniture,
    title: "Furniture",
    question: "Which furniture would you like to choose?",
  },
  {
    id: 9,
    component: FurnitureDetails,
    title: "Furniture details",
    question: "Which furniture details would you like to choose?",
  },
  {
    id: 10,
    component: Contact,
    title: "Contact Details",
    question: "Please fill the form below to receive a price estimation",
  },
  {
    id: 11,
    component: Confirmation,
  },
];
