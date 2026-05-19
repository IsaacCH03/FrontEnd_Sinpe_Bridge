const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const getTransactionHistory = async () => {
  try {
    const response = await fetch(`${API_URL}/transaction-history`);
    if (!response.ok) throw new Error("Error al obtener el historial de transacciones");
    return await response.json();
  } catch (error) {
    console.error("Error en getTransactionHistory:", error);
    return [];
  }
};