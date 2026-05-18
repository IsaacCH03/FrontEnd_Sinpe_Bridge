import {
    startPaymentHubConnection,
    stopPaymentHubConnection,
} from "@/src/services/signalr/paymentHubService";
import { PaymentNotification } from "@/src/types/paymentNotification";
import { useEffect, useState } from "react";

export function usePaymentNotifications(orderId: number | null) {
  const [notification, setNotification] = useState<PaymentNotification | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
  if (!orderId) {
    return;
  }

  let mounted = true;

  const connect = async () => {
    try {
      await startPaymentHubConnection(orderId, (data) => {
        if (mounted) {
          setNotification(data);
        }
      });

      if (mounted) {
        setIsConnected(true);
      }
    } catch (error) {
      console.log("Error conectando a SignalR:", error);
      setIsConnected(false);
    }
  };

  connect();

  return () => {
    mounted = false;
    stopPaymentHubConnection();
  };
}, [orderId]);

  return {
    notification,
    isConnected,
  };
}