import { Rooms, Floors } from "../../categories/index";

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
];
