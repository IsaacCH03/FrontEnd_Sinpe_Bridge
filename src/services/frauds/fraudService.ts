const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const getFraudAttempts = async (type?: string, reference?: string, date?: string) => {
  try {
    // Construir los parámetros de búsqueda para los filtros (Tarea #92)
    const params = new URLSearchParams();
    if (type) params.append("type", type);
    if (reference) params.append("reference", reference);
    if (date) params.append("date", date);

    const queryString = params.toString() ? `?${params.toString()}` : "";
    
    const response = await fetch(`${API_URL}/fraud-attempts${queryString}`);
    if (!response.ok) throw new Error("Error al obtener los fraudes");
    return await response.json();
  } catch (error) {
    console.error("Error en getFraudAttempts:", error);
    return [];
  }
};

export const getFraudAttemptById = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/fraud-attempts/${id}`);
    if (!response.ok) throw new Error("Error al obtener el detalle del fraude");
    return await response.json();
  } catch (error) {
    console.error("Error en getFraudAttemptById:", error);
    return null;
  }
};