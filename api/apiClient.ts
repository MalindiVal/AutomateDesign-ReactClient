const API_URL = "https://localhost:7294/";

export async function apiRequest(
  endpoint: string,
  method: string = "GET",
  body?: any,
  token?: string,
) {
  const headers: any = {
    "Content-Type": "application/json",
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data || "Erreur API");
  return data;
}
