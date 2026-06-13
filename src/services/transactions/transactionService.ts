import { requestJson } from "@/src/services/httpClient";
import { Transaction } from "@/src/types/transaction";

export const getTransactionHistory = async (): Promise<Transaction[]> => {
  return requestJson<Transaction[]>("/transaction-history");
};
