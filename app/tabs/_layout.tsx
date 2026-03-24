// app/tabs/_layout.tsx
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import "react-native-gesture-handler";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#ff003c",
        headerStyle: { backgroundColor: "#25292e" },
        headerShadowVisible: false,
        headerTintColor: "#fff",
        tabBarStyle: { backgroundColor: "#25292e" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="logout"
        options={{
          title: "Déconnexion",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "log-out-sharp" : "log-out-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}
