import { Platform } from "react-native";



export const API_URL =
  Platform.OS === "web"
    ? "http://localhost:5197/"
    : "https://fasciculate-shona-splurgily.ngrok-free.dev/";

export async function apiRequest<T = any>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body?: any,
  token?: string,
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    // 🔥 Safe JSON parsing
    let data;
    try {
      data = await response.json();
    } catch {
      data = null;
    }

    if (!response.ok) {
      const message =
        data?.message || data?.error || JSON.stringify(data) || "Erreur API";
      throw new Error(message);
    }

    return data as T;
  } catch (error: any) {
    // 🔥 Gestion réseau
    throw new Error(error.message || "Erreur réseau");
  }
}
