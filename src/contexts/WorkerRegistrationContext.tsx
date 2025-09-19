import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface WorkerProfile {
  // Personal Information
  name: string;
  birthdate: string;
  email: string;
  phone: string;
  password: string;
  location: string;
  address: string;
  
  // Identity Documents
  aadhaarNumber: string;
  panNumber: string;
  voterCard: string;
  
  // Work Preferences
  preferredLanguage: string;
  travellableDistance: number;
  workCategory: string[];
  skills: string[];
  
  // Document Upload Status
  aadhaarCard?: File;
  panCard?: File;
  voterCardDoc?: File;
  profilePhoto?: File;
  
  // Verification Status
  isBackgroundVerified: boolean;
  backgroundCheckDate?: string;
  verificationStatus: 'pending' | 'in-progress' | 'completed' | 'failed';
  
  // Registration Progress
  currentStep: 'registration' | 'documents' | 'background-check' | 'qr-generation';
  isProfileComplete: boolean;
}

interface WorkerRegistrationContextType {
  profile: WorkerProfile;
  updateProfile: (data: Partial<WorkerProfile>) => void;
  canProceedToNextStep: () => boolean;
  currentStep: string;
  setCurrentStep: (step: WorkerProfile['currentStep']) => void;
}

const defaultProfile: WorkerProfile = {
  name: '',
  birthdate: '',
  email: '',
  phone: '',
  password: '',
  location: '',
  address: '',
  aadhaarNumber: '',
  panNumber: '',
  voterCard: '',
  preferredLanguage: '',
  travellableDistance: 10,
  workCategory: [],
  skills: [],
  isBackgroundVerified: false,
  verificationStatus: 'pending',
  currentStep: 'registration',
  isProfileComplete: false,
};

const WorkerRegistrationContext = createContext<WorkerRegistrationContextType | undefined>(undefined);

export function WorkerRegistrationProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<WorkerProfile>(defaultProfile);
  const navigate = useNavigate();

  const updateProfile = (data: Partial<WorkerProfile>) => {
    setProfile(prev => ({ ...prev, ...data }));
  };

  const canProceedToNextStep = () => {
    switch (profile.currentStep) {
      case 'registration':
        return !!(profile.name && profile.phone && profile.aadhaarNumber && profile.preferredLanguage);
      case 'documents':
        return !!(profile.aadhaarCard || profile.panCard || profile.voterCardDoc);
      case 'background-check':
        return profile.isBackgroundVerified;
      case 'qr-generation':
        return profile.isProfileComplete;
      default:
        return false;
    }
  };

  useEffect(() => {
    // Save to localStorage whenever profile changes
    localStorage.setItem('workerProfile', JSON.stringify(profile));
  }, [profile]);

  return (
    <WorkerRegistrationContext.Provider
      value={{
        profile,
        updateProfile,
        canProceedToNextStep,
        currentStep: profile.currentStep,
        setCurrentStep: (step) => updateProfile({ currentStep: step })
      }}
    >
      {children}
    </WorkerRegistrationContext.Provider>
  );
}

export function useWorkerRegistration() {
  const context = useContext(WorkerRegistrationContext);
  if (context === undefined) {
    throw new Error('useWorkerRegistration must be used within a WorkerRegistrationProvider');
  }
  return context;
}