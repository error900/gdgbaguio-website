export interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  administrator: boolean;
  primary_volunteer: boolean;
  secondary_volunteer: boolean;
  participant: boolean;
}