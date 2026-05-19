import { getOrders, OrderResponse } from "@/src/services/orders/orderService";
import { useEffect, useState } from "react";

export function useOrders() {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      setLoading(true);

      const data = await getOrders();
      console.log(data);
      setOrders(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return {
    orders,
    loading,
    reloadOrders: loadOrders,
  };
}
