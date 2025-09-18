import { createContext, useContext, useState, ReactNode } from 'react';
import { UserRole, BaseUser, KioskCentre, VerificationAdmin, Worker, Employer } from '@/types/user';

type User = KioskCentre | VerificationAdmin | Worker | Employer;

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  register: (userData: any, role: UserRole) => Promise<boolean>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Chaitanya',
    email: 'chaitanya@gmail.com',
    phone: '',
    password: 'syntaacs',
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date(),
  } as VerificationAdmin,
  {
    id: '2',
    name: 'Anil Kumar',
    email: 'anilkumar@gmail.com',
    phone: '',
    password: 'syntaacs',
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date(),
  } as VerificationAdmin,
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    // For admin, check hardcoded credentials
    if (role === 'admin') {
      const adminUser = mockUsers.find(
        u => u.email === email && u.password === password && u.role === 'admin'
      );
      if (adminUser) {
        setUser(adminUser);
        return true;
      }
      return false;
    }

    // For other roles, implement mock authentication
    // In a real app, this would make API calls
    const mockUser: User = {
      id: Date.now().toString(),
      name: 'Mock User',
      email,
      phone: '1234567890',
      password,
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as any;

    setUser(mockUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (userData: any, role: UserRole): Promise<boolean> => {
    // Mock registration - in real app, this would make API calls
    const newUser: User = {
      id: Date.now().toString(),
      ...userData,
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as any;

    setUser(newUser);
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
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