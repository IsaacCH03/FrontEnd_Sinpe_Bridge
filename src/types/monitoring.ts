export type DeviceStatus = {
  id: number;
  deviceName: string;
  lastCommunication: string;
  isConnected: boolean;
};

export type MonitoringEvent = {
  id: number;
  disconnectedAt: string;
  message: string;
  isResolved: boolean;
};