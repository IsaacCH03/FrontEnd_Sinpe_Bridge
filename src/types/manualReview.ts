export type ManualReviewTransaction = {
  id: number;
  orderId: number | null;
  actionType: string;
  description: string;
  createdAt: string;
};
