import { getPendingOrder, OrderResponse } from "@/src/services/orders/orderService";
import { useCallback, useEffect, useState } from "react";

export function usePendingOrder() {
  const [pendingOrder, setPendingOrder] = useState<OrderResponse | null>(null);
  const [isLoadingOrder, setIsLoadingOrder] = useState(true);
  const [orderError, setOrderError] = useState("");

  const loadPendingOrder = useCallback(async () => {
    try {
      setIsLoadingOrder(true);
      setOrderError("");

      const order = await getPendingOrder();
      setPendingOrder(order);
    } catch (error) {
      setOrderError(
        error instanceof Error
          ? error.message
          : "Error inesperado al cargar la orden pendiente."
      );
    } finally {
      setIsLoadingOrder(false);
    }
  }, []);

  useEffect(() => {
    loadPendingOrder();
  }, [loadPendingOrder]);

  return {
    pendingOrder,
    isLoadingOrder,
    orderError,
    reloadPendingOrder: loadPendingOrder,
  };
}