import { Stack } from 'expo-router';
import { SettingsProvider } from './context/SettingsContext';

export default function RootLayout() {
  return (
    <SettingsProvider>
      <Stack>
        {/* Auth Screens */}
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />

        {/* Main App */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* Other Screens */}
        <Stack.Screen name="camera" />
        <Stack.Screen name="save_meal" />
        <Stack.Screen name="save_macros" />
        <Stack.Screen name="+not-found" />
      </Stack>
    </SettingsProvider>
  );
}
