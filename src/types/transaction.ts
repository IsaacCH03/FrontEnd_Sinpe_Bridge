export type Transaction = {
  id: number;
  reference: string;
  amount: number;
  paymentDate: string;
  senderNumber: string;
  status: string;
  verificationResult: string;
  orderId?: number;
};