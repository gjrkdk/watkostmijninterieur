export interface IOptions {
  id: number;
  label: string;
  isSelected: boolean;
  floors: {
    id: number;
    label: string;
    isSelected: boolean;
  }[];
  roomSizes: {
    id: number;
    label: string;
    isSelected: boolean;
  }[];
}

export const initialRoomState: IOptions[] = [
  {
    id: 0,
    label: "Livingroom",
    isSelected: false,
    floors: [
      {
        id: 0,
        label: "Ground floor",
        isSelected: false,
      },
      {
        id: 1,
        label: "First floor",
        isSelected: false,
      },
      {
        id: 2,
        label: "Second floor",
        isSelected: false,
      },
    ],
    roomSizes: [
      {
        id: 0,
        label: "Small (15 m² - 20 m²)",
        isSelected: false,
      },
      {
        id: 1,
        label: "Mid-sized (20 m² - 30 m²)",
        isSelected: false,
      },
      {
        id: 2,
        label: "Big (30 m² - 50 m²)",
        isSelected: false,
      },
    ],
  },
  {
    id: 1,
    label: "Bedroom",
    isSelected: false,
    floors: [
      {
        id: 0,
        label: "Ground floor",
        isSelected: false,
      },
      {
        id: 1,
        label: "First floor",
        isSelected: false,
      },
      {
        id: 2,
        label: "Second floor",
        isSelected: false,
      },
    ],
    roomSizes: [
      {
        id: 0,
        label: "Small (15 m² - 20 m²)",
        isSelected: false,
      },
      {
        id: 1,
        label: "Mid-sized (20 m² - 30 m²)",
        isSelected: false,
      },
      {
        id: 2,
        label: "Big (30 m² - 50 m²)",
        isSelected: false,
      },
    ],
  },
  {
    id: 2,
    label: "Kitchen",
    isSelected: false,
    floors: [
      {
        id: 0,
        label: "Ground floor",
        isSelected: false,
      },
      {
        id: 1,
        label: "First floor",
        isSelected: false,
      },
      {
        id: 2,
        label: "Second floor",
        isSelected: false,
      },
    ],
    roomSizes: [
      {
        id: 0,
        label: "Small (15 m² - 20 m²)",
        isSelected: false,
      },
      {
        id: 1,
        label: "Mid-sized (20 m² - 30 m²)",
        isSelected: false,
      },
      {
        id: 2,
        label: "Big (30 m² - 50 m²)",
        isSelected: false,
      },
    ],
  },
];
