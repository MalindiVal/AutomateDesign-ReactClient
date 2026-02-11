import { storage } from "@/utils/storage";
import { apiRequest } from "./apiClient";

function normalizeAutomate(raw: any) {
  if (!raw) return null;

  // Extraire les tableaux
  const etats = raw.etats?.$values || [];
  const transitions = raw.transitions?.$values || [];

  // Créer un index par $id
  const etatByRef: any = {};
  etats.forEach((e: any) => {
    if (e.$id) {
      etatByRef[e.$id] = e;
    }
  });

  // Remplacer les $ref dans les transitions
  const fixedTransitions = transitions.map((t: any, index: number) => ({
    id: t.$id || index,
    condition: t.condition,
    etatDebut: etatByRef[t.etatDebut?.$ref],
    etatFinal: etatByRef[t.etatFinal?.$ref],
  }));

  return {
    id: raw.id,
    nom: raw.nom,
    etats,
    transitions: fixedTransitions,
  };
}

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
    // .NET retourne { $values: [...] }
    const automatesArray = data?.$values || [];

    // Normaliser chaque automate
    return automatesArray.map((a: any) => normalizeAutomate(a));
  },
  getAutomateById: async (id: string) => {
    const token = await storage.getToken();
    if (!token) throw new Error("Token manquant");
    const raw = await apiRequest(
      `Automate/GetAutomateById?id=${id}`,
      "GET",
      null,
      token,
    );
    return normalizeAutomate(raw);
  },
};
