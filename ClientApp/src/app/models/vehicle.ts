import { KeyValuePair } from "./keyValuePair";
import { Contact } from "./contact";

export interface Vehicle {
  id: number;
  model: KeyValuePair;
  make: KeyValuePair;
  isRegistered: boolean;
  contact: Contact;
  features: KeyValuePair[];
  lastUpdate: string;
}
