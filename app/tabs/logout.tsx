// app/tabs/logout.tsx
import { storage } from "@/utils/storage";
import { router } from "expo-router";
import { useEffect } from "react";

export default function LogoutScreen() {
  useEffect(() => {
    const logout = async () => {
      await storage.removeToken();
      router.replace("/");
    };
    logout();
  }, []);

  return null; // aucun rendu nécessaire
}
