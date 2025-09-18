// User type definitions
export type UserRole = 'kiosk' | 'admin' | 'worker' | 'employer';

export interface BaseUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface KioskCentre extends BaseUser {
  role: 'kiosk';
  location: string;
  address: string;
}

export interface VerificationAdmin extends BaseUser {
  role: 'admin';
}

export interface Worker extends BaseUser {
  role: 'worker';
  birthdate?: Date;
  location?: string;
  address?: string;
  aadhaarNumber: string;
  panNumber?: string;
  voterCard?: string;
  preferredLanguage: string;
  travellableDistance: number;
  workCategory: string[];
  skills: string[];
  createdBy: 'self' | 'kiosk';
  updatedBy: string;
  gigLevel: number;
  wageRange: { min: number; max: number };
}

export interface Employer extends BaseUser {
  role: 'employer';
  type: 'individual' | 'business';
  // Business-specific fields
  panCard?: string;
  gstinNumber?: string;
  cinNumber?: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  verified: boolean;
  uploadedAt: Date;
}

export interface Job {
  id: string;
  employerId: string;
  title: string;
  category: string;
  description: string;
  timeEstimated: string;
  workersRequired: number;
  budgetRange: { min: number; max: number };
  status: 'open' | 'closed' | 'completed' | 'deleted';
  createdAt: Date;
  applicants: string[];
}

export interface JobApplication {
  id: string;
  jobId: string;
  workerId: string;
  status: 'applied' | 'accepted' | 'rejected' | 'completed';
  appliedAt: Date;
}