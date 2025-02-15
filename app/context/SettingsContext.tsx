import React, { createContext, useContext, useState } from 'react';

type SettingsContextType = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  setCalories: (value: number) => void;
  setProtein: (value: number) => void;
  setCarbs: (value: number) => void;
  setFat: (value: number) => void;
};

// Create Context
const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

// Provider Component
export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [calories, setCalories] = useState<number>(2000);
  const [protein, setProtein] = useState<number>(150);
  const [carbs, setCarbs] = useState<number>(250);
  const [fat, setFat] = useState<number>(70);

  return (
    <SettingsContext.Provider value={{ calories, protein, carbs, fat, setCalories, setProtein, setCarbs, setFat }}>
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
