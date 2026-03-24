// app/_layout.tsx
import { Stack } from "expo-router";
import "react-native-gesture-handler"; // 🔥 important
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="tabs" options={{ headerShown: false }} />
        <Stack.Screen
          name="automateviewer"
          options={{ title: "Détails de l'automate" }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}
