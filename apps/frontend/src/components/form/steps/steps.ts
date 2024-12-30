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

interface IStepConfig {
  id: number;
  component: React.ComponentType;
}

export const steps: IStepConfig[] = [
  {
    id: 0,
    component: Rooms,
  },
  {
    id: 1,
    component: Floors,
  },
  {
    id: 2,
    component: RoomSizes,
  },
  {
    id: 3,
    component: WindowDecoration,
  },
  {
    id: 4,
    component: WindowDecorationDetails,
  },
  {
    id: 5,
    component: AmountWindows,
  },
  {
    id: 6,
    component: WindowSizes,
  },
  {
    id: 7,
    component: CurtainSizes,
  },
  {
    id: 8,
    component: Furniture,
  },
  {
    id: 9,
    component: FurnitureDetails,
  },
  {
    id: 10,
    component: Contact,
  },
];
