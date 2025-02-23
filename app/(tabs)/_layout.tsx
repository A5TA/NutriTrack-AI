import { Tabs } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import TabBar from '../components/TabBar';
import { SettingsProvider, useSettings } from '../context/SettingsContext';
import LoginScreen from '../login';

export default function TabLayout() {
  const { isAuthenticated } = useSettings();

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="progress" options={{ title: 'Progress' }} />
      <Tabs.Screen name="meals" options={{ title: 'Meals' }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
    </Tabs>
  );
};
