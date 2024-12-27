import { Rooms, Floors, RoomSizes, WindowDecoration } from "../../categories/index";

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
];
