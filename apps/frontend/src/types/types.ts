export interface IQuestionItem {
  id: number;
  text: string;
  options: string[];
}

export interface IRoomData {
  name: string;
  floor?: string;
  roomSize?: string;
  windowDecoration?: string;
  windowDecorationDetails?: string;
  curtainSize?: string;
  amountWindows?: string;
  windowSizes?: string[];
  furniture?: string[];
  furnitureDetails?: string;
}

export interface IContactDetails {
  firstName: string;
  email: string;
  phone?: string;
}

export interface IFormData {
  rooms: IRoomData[];
  contactDetails: IContactDetails;
}

export interface IPrice {
  min: number;
  max: number;
}
