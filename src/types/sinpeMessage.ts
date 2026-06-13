export type SinpeMessageRequest = {
  message: string;
};

export type ParsedSinpeMessage = {
  amount: number;
  payerName: string;
  senderPhone: string;
  reference: string;
};

export type SinpeMessageResponse = {
  message?: string;
  ignored?: boolean;
  logId?: number;
  sender?: string;
  receivedAt?: string;
  parsedData?: ParsedSinpeMessage;
};
