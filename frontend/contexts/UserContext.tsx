import React, { createContext, useContext, useState, ReactNode } from 'react';
import { apiService } from '@/services/api';

interface UserData {
  id?: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  resumeUploaded: boolean;
}

interface UserContextType {
  user: UserData | null;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, phone: string, password: string) => Promise<{ success: boolean; error?: string }>;
  selectRole: (role: string) => Promise<void>;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(() => {
    const saved = localStorage.getItem('vantage_user');
    try{
        return saved ? JSON.parse(saved) : null;
    }catch{
        return null
    }
  });

  const login = async (email: string, password: string) => {
    try {
      const response = await apiService.login({ email, password });
      if (response.data) {
        const userData: UserData = {
          id: response.data.userId,
          name: response.data.user.name,
          email: response.data.user.email,
          phone: response.data.user.phone,
          role: response.data.user.role || '',
          resumeUploaded: response.data.user.resumeUploaded || false,
        };
        if (response.token) {
          localStorage.setItem('authToken', response.token);
        }
        setUser(userData);
        localStorage.setItem('vantage_user', JSON.stringify(userData));
        return { success: true };
      }
      return { success: false, error: response.message || 'Login failed' };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Login failed' };
    }
  };

  const signup = async (name: string, email: string, phone: string, password: string) => {
    try {
      const response = await apiService.signup({ name, email, phone, password });
      if (response.data) {
        const userData: UserData = {
          id: response.data.userId,
          name: response.data.user.name,
          email: response.data.user.email,
          phone: response.data.user.phone,
          role: response.data.user.role || '',
          resumeUploaded: false,
        };
        if (response.token) {
          localStorage.setItem('authToken', response.token);
        }
        setUser(userData);
        localStorage.setItem('vantage_user', JSON.stringify(userData));
        return { success: true };
      }
      return { success: false, error: response.message || 'Signup failed' };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Signup failed' };
    }
  };

  const selectRole = async (role: string) => {
    if (user && user.id) {
      try {
        await apiService.selectRole({ userId: user.id, role });
        const updated = { ...user, role };
        setUser(updated);
        localStorage.setItem('vantage_user', JSON.stringify(updated));
      } catch (error) {
        console.error('Failed to select role:', error);
      }
    }
  };

  const logout = async () => {
    try {
      await apiService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
    setUser(null);
    localStorage.removeItem('vantage_user');
    localStorage.removeItem('authToken');
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, signup, selectRole, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
};
