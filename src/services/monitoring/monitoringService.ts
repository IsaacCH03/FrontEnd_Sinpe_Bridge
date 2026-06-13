import { requestJson } from "@/src/services/httpClient";
import { DeviceStatus, MonitoringEvent } from "@/src/types/monitoring";

export const getDeviceStatus = async (): Promise<DeviceStatus | null> => {
  return requestJson<DeviceStatus | null>("/device-status", {
    notFoundReturnsNull: true,
  });
};

export const getMonitoringHistory = async (): Promise<MonitoringEvent[]> => {
  return requestJson<MonitoringEvent[]>("/monitoring-history");
};

export const sendDeviceHeartbeat = async (): Promise<DeviceStatus> => {
  return requestJson<DeviceStatus>("/device-heartbeat", {
    method: "POST",
  });
};
