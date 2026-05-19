import { apiConfig } from "@/src/constants/apiConfig";
import { ManualReviewTransaction } from "@/src/types/manualReview";

const API_URL = apiConfig.apiUrl;

export async function getManualReviews(): Promise<ManualReviewTransaction[]> {
  const response = await fetch(`${API_URL}/manual-review`);

  if (!response.ok) {
    throw new Error("Error al obtener transacciones.");
  }

  return response.json();
}

export async function getManualReviewById(
  id: number,
): Promise<ManualReviewTransaction> {
  const response = await fetch(`${API_URL}/manual-review/${id}`);

  if (!response.ok) {
    throw new Error("Transacción no encontrada.");
  }

  return response.json();
}

export async function approveReview(id: number) {
  const response = await fetch(`${API_URL}/manual-review/${id}/approve`, {
    method: "POST",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al aprobar.");
  }

  return data;
}

export async function rejectReview(id: number) {
  const response = await fetch(`${API_URL}/manual-review/${id}/reject`, {
    method: "POST",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al rechazar.");
  }

  return data;
}
