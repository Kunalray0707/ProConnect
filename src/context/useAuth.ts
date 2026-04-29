import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import type { AppUser } from './AuthContext';

interface AuthContextValue {
  currentUser: AppUser | null;
  profiles: any[];
  loading: boolean;
  isDemoMode: boolean;
  isAuthenticated: boolean;
  signIn: (identifier: string, password: string) => Promise<AppUser | null>;
  signUp: (data: any) => Promise<AppUser | null>;
  socialSignIn: (provider: 'Google' | 'GitHub' | 'Phone') => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<boolean>;
  resendVerification: (email: string) => Promise<boolean>;
  updateProfile: (updates: Partial<AppUser>) => Promise<AppUser | null>;
  loadProfessionals: () => Promise<any[]>;
  addProfessional: (profile: any) => Promise<any | null>;
  refreshSession: () => Promise<void>;
}

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
