import { requestJson } from "@/src/services/httpClient";

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
  return requestJson<OrderResponse>("/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function getPendingOrder(): Promise<OrderResponse | null> {
  return requestJson<OrderResponse | null>("/orders/pending", {
    notFoundReturnsNull: true,
  });
}

export async function getOrders(): Promise<OrderResponse[]> {
  return requestJson<OrderResponse[]>("/orders");
}

export async function searchOrders(query: string): Promise<OrderResponse[]> {
  return requestJson<OrderResponse[]>(
    `/orders/search?query=${encodeURIComponent(query)}`,
  );
}
