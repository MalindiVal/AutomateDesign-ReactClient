import { apiRequest } from "./apiClient";

export const utilisateurDao = {
  login: async (login: string, mdp: string) => {
    return await apiRequest("Utilisateur/Login", "POST", { login, mdp });
  },
};
