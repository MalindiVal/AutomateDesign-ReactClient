// app/_layout.tsx
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />{" "}
      {/* Login */}
      <Stack.Screen name="tabs" options={{ headerShown: false }} /> {/* App */}
    </Stack>
  );
}
