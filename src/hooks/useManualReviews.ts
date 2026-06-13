import { getManualReviews } from "@/src/services/manualReview/manualReviewService";
import { ManualReviewTransaction } from "@/src/types/manualReview";
import { useEffect, useState } from "react";

export function useManualReviews() {
  const [reviews, setReviews] = useState<ManualReviewTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    void loadReviews();
  }, []);

  async function loadReviews() {
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
  }

  return {
    reviews,
    loading,
    error,
    reloadReviews: loadReviews,
  };
}
