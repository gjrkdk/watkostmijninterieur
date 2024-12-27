export interface IOptions {
  id: number;
  label: string;
  isSelected: boolean;
  floors: {
    id: number;
    label: string;
    isSelected: boolean;
  }[];
}

export const initialState: IOptions[] = [
  {
    id: 1,
    label: "Livingroom",
    isSelected: false,
    floors: [
      {
        id: 1,
        label: "Ground floor",
        isSelected: false,
      },
      {
        id: 2,
        label: "First floor",
        isSelected: false,
      },
      {
        id: 3,
        label: "Second floor",
        isSelected: false,
      },
    ],
  },
  {
    id: 2,
    label: "Bedroom",
    isSelected: false,
    floors: [
      {
        id: 1,
        label: "Ground floor",
        isSelected: false,
      },
      {
        id: 2,
        label: "First floor",
        isSelected: false,
      },
      {
        id: 3,
        label: "Second floor",
        isSelected: false,
      },
    ],
  },
  {
    id: 3,
    label: "Kitchen",
    isSelected: false,
    floors: [
      {
        id: 1,
        label: "Ground floor",
        isSelected: false,
      },
      {
        id: 2,
        label: "First floor",
        isSelected: false,
      },
      {
        id: 3,
        label: "Second floor",
        isSelected: false,
      },
    ],
  },
];
