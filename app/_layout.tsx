import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="camera" />
      <Stack.Screen name ="save_meal" />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
