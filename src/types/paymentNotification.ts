export type PaymentNotification = {
  orderId: number;
  amount: number;
  senderNumber: string;
  reference: string;
  message: string;
};