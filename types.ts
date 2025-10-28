// FIX: Implemented the missing type definitions for the application, which resolves module import errors in other components.

// A slot of time for a chair booking
export interface TimeSlot {
  startTime: number;
  endTime: number;
  status: 'Available' | 'Booked';
}

export type ChairStatus = 'Available' | 'In Use' | 'Needs Cleaning';

export interface Chair {
  id: number;
  name: string;
  model: string;
  features: string[];
  schedule: TimeSlot[];
}

export interface Recommendation {
  chairName: string;
  duration: number;
  reasoning: string;
}

export interface Booking {
  id: number;
  chairName: string;
  location: string;
  startTime: number;
  endTime: number;
  duration: number;
}

export type Page = 'home' | 'bookings' | 'offers' | 'help' | 'contact' | 'login';

export interface User {
  name: string;
  email: string;
}

export interface Offer {
    id: number;
    title: string;
    description: string;
    code: string;
    userType: 'newUser' | 'existingUser' | 'all';
}