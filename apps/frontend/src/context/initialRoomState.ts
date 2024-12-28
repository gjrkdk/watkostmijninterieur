interface IBase {
  id: number;
  label: string;
  isSelected: boolean;
}

export interface IOptions extends IBase {
  floors: IBase[];
  roomSizes: IBase[];
  windowDecoration?: IBase[];
  windowDecorationDetails?: IBase[];
}

const floors: IBase[] = [
  { id: 0, label: "Ground floor", isSelected: false },
  { id: 1, label: "First floor", isSelected: false },
  { id: 2, label: "Second floor", isSelected: false },
];

const roomSizes: IBase[] = [
  { id: 0, label: "Small (15 m² - 20 m²)", isSelected: false },
  { id: 1, label: "Mid-sized (20 m² - 30 m²)", isSelected: false },
  { id: 2, label: "Big (30 m² - 50 m²)", isSelected: false },
];

const windowDecorations: IBase[] = [
  { id: 0, label: "Curtains", isSelected: false },
  { id: 1, label: "Wooden Blinds", isSelected: false },
  { id: 2, label: "Aluminum Blinds", isSelected: false },
  { id: 3, label: "Duet Curtains", isSelected: false },
  { id: 4, label: "Pleated Curtains", isSelected: false },
  { id: 5, label: "Inbetweens", isSelected: false },
  { id: 6, label: "No window decoration needed", isSelected: false },
];

interface IWindowDecorationDetail extends IBase {
  details: IBase[];
}

const windowDecorationDetails: IWindowDecorationDetail[] = [
  {
    id: 0,
    label: "Curtains",
    isSelected: false,
    details: [
      { id: 0, label: "Essential", isSelected: false },
      { id: 1, label: "Comfort", isSelected: false },
      { id: 2, label: "Premium", isSelected: false },
    ],
  },
  {
    id: 1,
    label: "Wooden Blinds",
    isSelected: false,
    details: [
      { id: 0, label: "50mm", isSelected: false },
      { id: 1, label: "60mm", isSelected: false },
    ],
  },
  {
    id: 2,
    label: "Aluminum Blinds",
    isSelected: false,
    details: [
      { id: 0, label: "25mm", isSelected: false },
      { id: 1, label: "50mm", isSelected: false },
    ],
  },
  {
    id: 3,
    label: "Duet Curtains",
    isSelected: false,
    details: [
      { id: 0, label: "25mm", isSelected: false },
      { id: 1, label: "32mm", isSelected: false },
    ],
  },
  {
    id: 4,
    label: "Pleated Curtains",
    isSelected: false,
    details: [
      { id: 0, label: "20mm", isSelected: false },
      { id: 1, label: "32mm", isSelected: false },
    ],
  },
  {
    id: 5,
    label: "Inbetweens",
    isSelected: false,
    details: [
      { id: 0, label: "Essential", isSelected: false },
      { id: 1, label: "Comfort", isSelected: false },
      { id: 2, label: "Premium", isSelected: false },
    ],
  },
];

const rooms: string[] = ["Livingroom", "Bedroom", "Kitchen"];

export const initialRoomState: IOptions[] = rooms.map((room, index) => ({
  id: index,
  label: room,
  isSelected: false,
  floors: [...floors],
  roomSizes: [...roomSizes],
  windowDecoration: [...windowDecorations],
  windowDecorationDetails: [...windowDecorationDetails],
}));
