import { getManualReviews } from "@/src/services/manualReview/manualReviewService";
import { ManualReviewTransaction } from "@/src/types/manualReview";
import { useCallback, useEffect, useState } from "react";

export function useManualReviews() {
  const [reviews, setReviews] = useState<ManualReviewTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadReviews = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getManualReviews();
      setReviews(data);
    } catch (unknownError) {
      setError(
        unknownError instanceof Error
          ? unknownError.message
          : "Error inesperado al obtener revisiones.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadReviews();
  }, [loadReviews]);

  return {
    reviews,
    loading,
    error,
    loadReviews,
    reloadReviews: loadReviews,
  };
}
