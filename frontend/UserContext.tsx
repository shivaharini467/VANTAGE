import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserData {
  name: string;
  email: string;
  phone: string;
  role: string;
  resumeUploaded: boolean;
}

interface UserContextType {
  user: UserData | null;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, phone: string, password: string) => boolean;
  selectRole: (role: string) => void;
  logout: () => void;
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

  const login = (email: string, _password: string) => {
    const accounts = JSON.parse(localStorage.getItem('vantage_accounts') || '[]');
    const found = accounts.find((a: any) =>(a.email === email || a.phone === email) &&
    a.password === _password
);
    if (found) {
      const userData = { name: found.name, email: found.email, phone: found.phone, role: found.role || '', resumeUploaded: false };
      setUser(userData);
      localStorage.setItem('vantage_user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const signup = (name: string, email: string, phone: string, _password: string) => {
    const accounts = JSON.parse(localStorage.getItem('vantage_accounts') || '[]');
    accounts.push({ name, email, phone, password: _password, role: '' });
    localStorage.setItem('vantage_accounts', JSON.stringify(accounts));
    const userData = { name, email, phone, role: '', resumeUploaded: false };
    setUser(userData);
    localStorage.setItem('vantage_user', JSON.stringify(userData));
    return true;
  };

  const selectRole = (role: string) => {
    if (user) {
      const updated = { ...user, role };
      setUser(updated);
      localStorage.setItem('vantage_user', JSON.stringify(updated));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vantage_user');
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