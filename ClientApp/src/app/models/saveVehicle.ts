import { Contact } from "./contact";

export interface SaveVehicle {
  id: number;
  modelId: number;
  makeId: number;
  isRegistered: boolean;
  contact: Contact;
  features: number[];
}
