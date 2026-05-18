const API_URL = process.env.EXPO_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("Falta configurar EXPO_PUBLIC_API_URL en el archivo .env");
}

export const apiConfig = {
  apiUrl: API_URL,
  paymentHubUrl: `${API_URL}/paymentHub`,
};