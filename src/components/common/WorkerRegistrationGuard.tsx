import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useWorkerRegistration } from '@/contexts/WorkerRegistrationContext';
import { useToast } from '@/hooks/use-toast';

const workerRoutes = [
  '/worker/registration',
  '/worker/documents',
  '/worker/background-check',
  '/worker/qr-generation'
];

type StepType = 'registration' | 'documents' | 'background-check' | 'qr-generation';

export default function WorkerRegistrationGuard({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile } = useWorkerRegistration();
  const { toast } = useToast();

  // Map routes to steps
  const routeToStep: Record<string, StepType> = {
    '/worker/registration': 'registration',
    '/worker/documents': 'documents',
    '/worker/background-check': 'background-check',
    '/worker/qr-generation': 'qr-generation'
  };

  // Get current step from route
  const currentRoute = workerRoutes.find(route => location.pathname === route);
  const currentStep = currentRoute ? routeToStep[currentRoute] : null;

  const canAccessStep = (step: StepType): boolean => {
    switch (step) {
      case 'registration':
        return true; // Always accessible
      case 'documents':
        return !!profile.name && !!profile.phone && !!profile.aadhaarNumber;
      case 'background-check':
        return !!profile.aadhaarCard || !!profile.panCard || !!profile.voterCardDoc;
      case 'qr-generation':
        return profile.isBackgroundVerified;
      default:
        return false;
    }
  };

  const getRedirectPath = (): string => {
    if (!profile.name || !profile.phone || !profile.aadhaarNumber) {
      return '/worker/registration';
    }
    if (!profile.aadhaarCard && !profile.panCard && !profile.voterCardDoc) {
      return '/worker/documents';
    }
    if (!profile.isBackgroundVerified) {
      return '/worker/background-check';
    }
    return '/worker/qr-generation';
  };

  useEffect(() => {
    if (currentStep && !canAccessStep(currentStep)) {
      const redirectPath = getRedirectPath();
      toast({
        title: "Access Denied",
        description: "Please complete the previous steps first.",
        variant: "destructive",
      });
      navigate(redirectPath);
    }
  }, [location.pathname, profile]);

  return <>{children}</>;
}