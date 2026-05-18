import { apiConfig } from "@/src/constants/apiConfig";
import { PaymentNotification } from "@/src/types/paymentNotification";
import * as signalR from "@microsoft/signalr";

let connection: signalR.HubConnection | null = null;

export async function startPaymentHubConnection(
  orderId: number,
  onPaymentConfirmed: (data: PaymentNotification) => void
): Promise<signalR.HubConnection> {
  const newConnection = new signalR.HubConnectionBuilder()
    .withUrl(apiConfig.paymentHubUrl)
    .withAutomaticReconnect()
    .build();

  newConnection.on("PaymentConfirmed", onPaymentConfirmed);

  await newConnection.start();

  await newConnection.invoke("JoinOrderGroup", orderId.toString());

  connection = newConnection;

  return newConnection;
}

export async function stopPaymentHubConnection() {
  if (connection) {
    await connection.stop();
    connection = null;
  }
}