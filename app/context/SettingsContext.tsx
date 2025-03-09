import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

type SettingsContextType = {
  userId: string | null;
  isAuthenticated: boolean;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  isLoading: boolean;
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
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const isAuthenticated = !!userId; //Used by the layout to direct user to login page if not logged in

  // Load saved settings from AsyncStorage on mounting
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        const storedCalories = await AsyncStorage.getItem('calories');
        const storedProtein = await AsyncStorage.getItem('protein');
        const storedCarbs = await AsyncStorage.getItem('carbs');
        const storedFat = await AsyncStorage.getItem('fat');

        if (storedUserId) setUserId(storedUserId);
        if (storedCalories) setCalories(Number(storedCalories));
        if (storedProtein) setProtein(Number(storedProtein));
        if (storedCarbs) setCarbs(Number(storedCarbs));
        if (storedFat) setFat(Number(storedFat));
      } catch (error) {
        console.error('Failed to load settings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

   // Save settings to AsyncStorage when they change from the user
   useEffect(() => {
    if (!isLoading) {
      const saveSettings = async () => {
        try {
          await AsyncStorage.setItem('userId', userId || '');
          await AsyncStorage.setItem('calories', String(calories));
          await AsyncStorage.setItem('protein', String(protein));
          await AsyncStorage.setItem('carbs', String(carbs));
          await AsyncStorage.setItem('fat', String(fat));
        } catch (error) {
          console.error('Failed to save settings:', error);
        }
      };

      saveSettings();
    }
  }, [userId, calories, protein, carbs, fat, isLoading]);

  // Clear all settings and reset to defaults
  const clearAllSettings = async () => {
    try {
      await AsyncStorage.multiRemove(['userId', 'calories', 'protein', 'carbs', 'fat']);
      setUserId(null);
      setCalories(2000);
      setProtein(150);
      setCarbs(250);
      setFat(70);
    } catch (error) {
      console.error('Failed to clear settings:', error);
    }
  };

  return (
    <SettingsContext.Provider value={{ userId, isLoading, isAuthenticated, setUserId, calories, protein, carbs, fat, setCalories, setProtein, setCarbs, setFat, clearAllSettings }}>
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