
import { City, FoundItem } from './types';

export const FOUND_ITEMS_DATABASE: FoundItem[] = [
  {
    id: 'FI-001',
    name: 'Black Leather Wallet',
    description: 'A black bifold wallet containing a British passport and some cash. Found near the King Fahd Gate.',
    foundLocation: 'King Fahd Gate, Masjid al-Haram',
    city: City.MECCA,
    dateFound: '2024-05-10',
    pickupOffice: 'Main Security Office (Gate 1)',
    pickupInstructions: 'Proceed to the security desk at Gate 1. Provide your original passport for verification.'
  },
  {
    id: 'FI-002',
    name: 'Samsung Smartphone',
    description: 'Blue Galaxy S23 with a clear case. Lock screen shows a picture of a family.',
    foundLocation: 'Mataf Area',
    city: City.MECCA,
    dateFound: '2024-05-11',
    pickupOffice: 'Lost & Found Center - South Piazza',
    pickupInstructions: 'Visit the electronic items counter. You will be asked to unlock the phone or provide the IMEI.'
  },
  {
    id: 'FI-003',
    name: 'Gold Rimmed Prescription Glasses',
    description: 'Ray-Ban brand glasses in a brown leather case.',
    foundLocation: 'Near the Rawdah entrance',
    city: City.MADINA,
    dateFound: '2024-05-09',
    pickupOffice: 'Masjid an-Nabawi Security Office (Gate 25)',
    pickupInstructions: 'Go to the lost property office near Gate 25. Identify the brand and case details.'
  },
  {
    id: 'FI-004',
    name: 'Beige Prayer Mat',
    description: 'Padded prayer rug with floral patterns. Made in Turkey.',
    foundLocation: 'Upper Deck, Masjid an-Nabawi',
    city: City.MADINA,
    dateFound: '2024-05-12',
    pickupOffice: 'General Services Office',
    pickupInstructions: 'Located at the northern parking exit. Bring a valid ID.'
  },
  {
    id: 'FI-005',
    name: 'Backpack (Gray)',
    description: 'A gray North Face backpack containing clothing and a water bottle.',
    foundLocation: 'Sa\'i Gallery (Safa side)',
    city: City.MECCA,
    dateFound: '2024-05-10',
    pickupOffice: 'Clock Tower Level 1 Security',
    pickupInstructions: 'Security verification required. Describe contents of the bag to the officer.'
  }
];

export const SYSTEM_COLORS = {
  primary: '#064e3b', // Deep Emerald
  secondary: '#d97706', // Golden Amber
  accent: '#10b981', // Bright Green
};
