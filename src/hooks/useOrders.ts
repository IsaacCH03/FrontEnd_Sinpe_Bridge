import { getOrders, OrderResponse } from "@/src/services/orders/orderService";
import { useEffect, useState } from "react";

export function useOrders() {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    void loadOrders();
  }, []);

  async function loadOrders() {
    try {
      setLoading(true);
      setError("");

      const data = await getOrders();
      setOrders(data);
    } catch (unknownError) {
      setError(
        unknownError instanceof Error
          ? unknownError.message
          : "Error inesperado al obtener ordenes.",
      );
    } finally {
      setLoading(false);
    }
  }

  return {
    orders,
    loading,
    error,
    reloadOrders: loadOrders,
  };
}
