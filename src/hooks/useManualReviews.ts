import { getManualReviews } from "@/src/services/manualReview/manualReviewService";
import { ManualReviewTransaction } from "@/src/types/manualReview";
import { useEffect, useState } from "react";

export function useManualReviews() {
  const [reviews, setReviews] = useState<ManualReviewTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReviews();
  }, []);

  async function loadReviews() {
    try {
      setLoading(true);

      const data = await getManualReviews();

      setReviews(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return {
    reviews,
    loading,
    loadReviews,
  };
}
