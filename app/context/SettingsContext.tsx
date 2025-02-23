import React, { createContext, useContext, useState } from 'react';

type SettingsContextType = {
  userId: string | null;
  isAuthenticated: boolean;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  setUserId: (id: string | null) => void;
  setCalories: (value: number) => void;
  setProtein: (value: number) => void;
  setCarbs: (value: number) => void;
  setFat: (value: number) => void;
  clearAllSettings: () => void;
};

// Create Context
const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

// Provider Component
export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [calories, setCalories] = useState<number>(2000);
  const [protein, setProtein] = useState<number>(150);
  const [carbs, setCarbs] = useState<number>(250);
  const [fat, setFat] = useState<number>(70);

  const isAuthenticated = !!userId;

  // Clear all settings and reset to defaults
  const clearAllSettings = () => {
    setUserId(null);
    setCalories(2000);
    setProtein(150);
    setCarbs(250);
    setFat(70);
  };

  return (
    <SettingsContext.Provider value={{ userId, isAuthenticated, setUserId, calories, protein, carbs, fat, setCalories, setProtein, setCarbs, setFat, clearAllSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

// Hook to Use Settings Context
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
