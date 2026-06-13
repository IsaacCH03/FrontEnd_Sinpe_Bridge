import { requestJson } from "@/src/services/httpClient";
import { FraudAttempt } from "@/src/types/fraudAttempt";

export const getFraudAttempts = async (
  type?: string,
  reference?: string,
  date?: string,
): Promise<FraudAttempt[]> => {
  const params = new URLSearchParams();
  if (type) params.append("type", type);
  if (reference) params.append("reference", reference);
  if (date) params.append("date", date);

  const queryString = params.toString() ? `?${params.toString()}` : "";
  return requestJson<FraudAttempt[]>(`/fraud-attempts${queryString}`);
};

export const getFraudAttemptById = async (
  id: number,
): Promise<FraudAttempt | null> => {
  return requestJson<FraudAttempt | null>(`/fraud-attempts/${id}`, {
    notFoundReturnsNull: true,
  });
};
