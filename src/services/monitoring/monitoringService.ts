const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const getDeviceStatus = async () => {
  try {
    const response = await fetch(`${API_URL}/device-status`);
    if (!response.ok) throw new Error("Error al obtener el estado del dispositivo");
    return await response.json();
  } catch (error) {
    console.error("Error en getDeviceStatus:", error);
    return null;
  }
};

export const getMonitoringHistory = async () => {
  try {
    const response = await fetch(`${API_URL}/monitoring-history`);
    if (!response.ok) throw new Error("Error al obtener el historial de monitoreo");
    return await response.json();
  } catch (error) {
    console.error("Error en getMonitoringHistory:", error);
    return [];
  }
};

export const sendDeviceHeartbeat = async () => {
  try {
    const response = await fetch(`${API_URL}/device-heartbeat`, {
      method: "POST",
    });
    if (!response.ok) throw new Error("Error al enviar el heartbeat");
    return await response.json();
  } catch (error) {
    console.error("Error en sendDeviceHeartbeat:", error);
    return null;
  }
};