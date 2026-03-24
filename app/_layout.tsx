// app/_layout.tsx
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="register" />
          <Stack.Screen name="tabs" />
          <Stack.Screen
            name="automateviewer"
            options={{
              headerShown: true,
              title: "Détails de l'automate",
            }}
          />
        </Stack>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
