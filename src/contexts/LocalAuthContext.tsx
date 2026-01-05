
import React, { createContext, useContext, useEffect, useState } from 'react';

interface LocalAuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
}

const LocalAuthContext = createContext<LocalAuthContextType | undefined>(undefined);

export const useLocalAuth = () => {
  const context = useContext(LocalAuthContext);
  if (context === undefined) {
    throw new Error('useLocalAuth must be used within a LocalAuthProvider');
  }
  return context;
};

// Simple admin credentials (in production, this should be environment-based)
const ADMIN_CREDENTIALS = {
  email: 'admin@example.com',
  password: 'admin123'
};

export const LocalAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    const authData = localStorage.getItem('local_auth');
    if (authData) {
      const { expiresAt } = JSON.parse(authData);
      if (new Date(expiresAt) > new Date()) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('local_auth');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    // Simple credential check
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      const authData = {
        email,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
      };
      localStorage.setItem('local_auth', JSON.stringify(authData));
      setIsAuthenticated(true);
      return { success: true, message: 'Login successful!' };
    }
    
    return { success: false, message: 'Invalid credentials' };
  };

  const logout = () => {
    localStorage.removeItem('local_auth');
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    isLoading,
    login,
    logout,
  };

  return (
    <LocalAuthContext.Provider value={value}>
      {children}
    </LocalAuthContext.Provider>
  );
};
