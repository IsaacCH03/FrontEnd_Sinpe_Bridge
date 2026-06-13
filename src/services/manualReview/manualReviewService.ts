import { requestJson } from "@/src/services/httpClient";
import { ManualReviewTransaction } from "@/src/types/manualReview";

export async function getManualReviews(): Promise<ManualReviewTransaction[]> {
  return requestJson<ManualReviewTransaction[]>("/manual-review");
}

export async function getManualReviewById(
  id: number,
): Promise<ManualReviewTransaction> {
  return requestJson<ManualReviewTransaction>(`/manual-review/${id}`);
}

export async function approveReview(id: number): Promise<{ message: string }> {
  return requestJson<{ message: string }>(`/manual-review/${id}/approve`, {
    method: "POST",
  });
}

export async function rejectReview(id: number): Promise<{ message: string }> {
  return requestJson<{ message: string }>(`/manual-review/${id}/reject`, {
    method: "POST",
  });
}
