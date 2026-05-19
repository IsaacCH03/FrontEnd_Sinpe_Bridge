import { apiConfig } from "@/src/constants/apiConfig";

const API_URL = apiConfig.apiUrl;

export type CreateOrderRequest = {
  customerName: string;
  phone: string;
  details: {
    productId: number;
    quantity: number;
  }[];
};

export type OrderResponse = {
  id: number;
  customerName: string;
  phone: string;
  amount: number;
  status: string;
  createdAt: string;
};

export async function createOrder(
  data: CreateOrderRequest,
): Promise<OrderResponse> {
  const response = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Error al crear la orden.");
  }

  return response.json();
}

export async function getPendingOrder(): Promise<OrderResponse | null> {
  const response = await fetch(`${API_URL}/orders/pending`);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Error al obtener la orden pendiente.");
  }

  return response.json();
}
export async function getOrders(): Promise<OrderResponse[]> {
  const response = await fetch(`${API_URL}/orders`);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Error al obtener órdenes.");
  }

  return response.json();
}
