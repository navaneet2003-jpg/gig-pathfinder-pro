import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { UserRole, BaseUser, KioskCentre, VerificationAdmin, Worker, Employer } from '@/types/user';
import { storageService } from '@/services/localStorage';

type User = KioskCentre | VerificationAdmin | Worker | Employer;

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  register: (userData: any, role: UserRole) => Promise<boolean>;
  updateProfile: (updates: any) => Promise<boolean>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on app start
  useEffect(() => {
    const savedUserId = localStorage.getItem('currentUserId');
    if (savedUserId) {
      const userData = storageService.getUserById(savedUserId);
      if (userData) {
        setUser(userData);
      }
    }
  }, []);

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    const userData = storageService.getUser(email, password, role);
    if (userData) {
      setUser(userData);
      localStorage.setItem('currentUserId', userData.id);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUserId');
  };

  const register = async (userData: any, role: UserRole): Promise<boolean> => {
    const success = storageService.createUser({ ...userData, role });
    if (success) {
      // Auto-login after registration
      const newUser = storageService.getUser(userData.email, userData.password, role);
      if (newUser) {
        setUser(newUser);
        localStorage.setItem('currentUserId', newUser.id);
      }
      return true;
    }
    return false;
  };

  const updateProfile = async (updates: any): Promise<boolean> => {
    if (!user) return false;
    
    const success = storageService.updateUser(user.id, updates);
    if (success) {
      const updatedUser = storageService.getUserById(user.id);
      if (updatedUser) {
        setUser(updatedUser);
      }
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        updateProfile,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}