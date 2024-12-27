export interface IOption {
  id: number;
  label: string;
  isSelected: boolean;
}

export const initialStateRooms: IOption[] = [
  { id: 1, label: "Livingroom", isSelected: false },
  { id: 2, label: "Bathroom", isSelected: false },
  { id: 3, label: "Bedroom", isSelected: false },
];
