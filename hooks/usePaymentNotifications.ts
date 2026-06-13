import {
  startPaymentHubConnection,
  stopPaymentHubConnection,
} from "@/src/services/signalr/paymentHubService";
import { PaymentNotification } from "@/src/types/paymentNotification";
import { useEffect, useState } from "react";

export function usePaymentNotifications(orderId: number | null) {
  const [notification, setNotification] = useState<PaymentNotification | null>(
    null,
  );
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState("");

  useEffect(() => {
    setNotification(null);
    setIsConnected(false);
    setConnectionError("");

    if (!orderId) {
      void stopPaymentHubConnection();
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
        if (mounted) {
          setConnectionError(
            error instanceof Error
              ? error.message
              : "No se pudo conectar con SignalR.",
          );
          setIsConnected(false);
        }
      }
    };

    void connect();

    return () => {
      mounted = false;
      void stopPaymentHubConnection();
    };
  }, [orderId]);

  return {
    notification,
    isConnected,
    connectionError,
  };
}
