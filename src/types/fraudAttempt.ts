export type FraudAttempt = {
  id: number;
  reference: string;
  amount: number;
  fraudType: string;
  attemptDate: string;
  orderId?: number;
};