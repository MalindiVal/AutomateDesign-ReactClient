import { storage } from "@/utils/storage";
import { apiRequest } from "./apiClient";

export const automateDao = {
  getAllAutomate: async () => {
    const token = await storage.getToken();
    if (!token) throw new Error("Token manquant");
    const data = await apiRequest(
      "Automate/GetAllAutomates",
      "GET",
      null,
      token,
    );
    return Array.isArray(data.$values) ? data.$values : [];
  },
  getAutomateById: async (id: string) => {
    const token = await storage.getToken();
    if (!token) throw new Error("Token manquant");
    return await apiRequest(
      `Automate/GetAutomateById?id=${id}`,
      "GET",
      null,
      token,
    );
  },
};
