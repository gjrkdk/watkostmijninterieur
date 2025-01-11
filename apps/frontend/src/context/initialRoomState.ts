interface IBase {
  id: number;
  label: string;
  isSelected: boolean;
  isDisabled?: boolean;
}

interface IWindowDecorationDetail {
  id: number;
  label: string;
  details: IBase[];
}

interface IAmountWindows {
  id: number;
  amount: string;
  isSelected: boolean;
}

export interface IOptions extends IBase {
  floors: IBase[];
  roomSizes: IBase[];
  windowDecoration?: IBase[];
  windowDecorationDetails?: IWindowDecorationDetail[];
  amountWindows?: IAmountWindows[];
  windowSizes?: string[];
  curtainInbetweenSizes?: IBase[];
  furniture?: IBase[];
  furnitureDetails?: IBase[];
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

const windowDecorationDetails: IWindowDecorationDetail[] = [
  {
    id: 0,
    label: "Curtains",
    details: [
      { id: 0, label: "Essential", isSelected: false },
      { id: 1, label: "Comfort", isSelected: false },
      { id: 2, label: "Premium", isSelected: false },
    ],
  },
  {
    id: 1,
    label: "Wooden Blinds",
    details: [
      { id: 0, label: "50mm", isSelected: false },
      { id: 1, label: "60mm", isSelected: false },
    ],
  },
  {
    id: 2,
    label: "Aluminum Blinds",
    details: [
      { id: 0, label: "25mm", isSelected: false },
      { id: 1, label: "50mm", isSelected: false },
    ],
  },
  {
    id: 3,
    label: "Duet Curtains",
    details: [
      { id: 0, label: "25mm", isSelected: false },
      { id: 1, label: "32mm", isSelected: false },
    ],
  },
  {
    id: 4,
    label: "Pleated Curtains",
    details: [
      { id: 0, label: "20mm", isSelected: false },
      { id: 1, label: "32mm", isSelected: false },
    ],
  },
  {
    id: 5,
    label: "Inbetweens",
    details: [
      { id: 0, label: "Essential", isSelected: false },
      { id: 1, label: "Comfort", isSelected: false },
      { id: 2, label: "Premium", isSelected: false },
    ],
  },
];

const amountWindows: IAmountWindows[] = [
  { id: 0, amount: "1", isSelected: false },
  { id: 1, amount: "2", isSelected: false },
  { id: 2, amount: "3", isSelected: false },
  { id: 3, amount: "4", isSelected: false },
  { id: 4, amount: "5", isSelected: false },
  { id: 5, amount: "6", isSelected: false },
];

export const windowSizes: string[] = [
  "100cm B x 200cm HG",
  "200cm B x 150cm HG",
  "150cm B x 100cm HG",
  "70cm B x 250cm HG",
  "250cm B x 200cm HG",
];

export const curtainInbetweenSizes: IBase[] = [
  { id: 0, label: "550cm B", isSelected: false },
  { id: 1, label: "400cm B", isSelected: false },
  { id: 2, label: "250cm B", isSelected: false },
  { id: 3, label: "150cm B", isSelected: false },
  { id: 4, label: "80cm B", isSelected: false },
];

const furniture: IBase[] = [
  { id: 0, label: "Couch", isSelected: false },
  { id: 1, label: "Armhair", isSelected: false },
  { id: 2, label: "Coffee table", isSelected: false },
  { id: 3, label: "Dining room table", isSelected: false },
  { id: 4, label: "Dining room chair", isSelected: false },
  { id: 5, label: "TV furniture", isSelected: false },
  { id: 6, label: "Carpet", isSelected: false },
  { id: 7, label: "No furniture", isSelected: false, isDisabled: false },
];

export const furnitureDetails: IBase[] = [
  { id: 0, label: "Essential", isSelected: false },
  { id: 1, label: "Comfort", isSelected: false },
  { id: 2, label: "Premium", isSelected: false },
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
  amountWindows: [...amountWindows],
  windowSizes: [],
  curtainInbetweenSizes: [...curtainInbetweenSizes],
  furniture: [...furniture],
  furnitureDetails: [...furnitureDetails],
}));
