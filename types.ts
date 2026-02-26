
export enum City {
  MECCA = 'Mecca',
  MADINA = 'Madina'
}

export type Language = 'en' | 'ar';

export interface User {
  passportNumber: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
}

export interface FoundItem {
  id: string;
  name: string;
  description: string;
  foundLocation: string;
  city: City;
  dateFound: string;
  pickupOffice: string;
  pickupInstructions: string;
}

export interface LostItemReport {
  name: string;
  description: string;
  city: City;
}

export interface MatchResult {
  itemId: string;
  matchScore: number;
  reason: string;
}

export type View = 'HOME' | 'SEARCH' | 'REPORT' | 'PROFILE' | 'HELP';
export type Step = 'AUTH' | 'MAIN';
