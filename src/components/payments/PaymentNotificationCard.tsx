import { paymentNotificationCardStyles as styles } from "@/src/styles/paymentNotificationCardStyles";
import { PaymentNotification } from "@/src/types/paymentNotification";
import { Text, View } from "react-native";

type Props = {
  notification: PaymentNotification | null;
  isConnected: boolean;
  orderId: number;
  connectionError?: string;
};

export function PaymentNotificationCard({
  notification,
  isConnected,
  orderId,
  connectionError,
}: Props) {
  if (!notification) {
    return (
      <View style={styles.card}>
        <Text style={styles.icon}>...</Text>

        <Text style={styles.title}>Esperando pago</Text>

        <Text style={styles.description}>
          Orden #{orderId}. Cuando el SINPE sea confirmado, aparecera aqui.
        </Text>

        <Text style={styles.connection}>
          SignalR: {isConnected ? "Conectado" : "Desconectado"}
        </Text>

        {connectionError ? (
          <Text style={styles.connection}>{connectionError}</Text>
        ) : null}
      </View>
    );
  }

  return (
    <View style={styles.cardSuccess}>
      <Text style={styles.icon}>OK</Text>

      <Text style={styles.title}>Pago confirmado</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Orden</Text>
        <Text style={styles.value}>#{notification.orderId}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Monto</Text>
        <Text style={styles.value}>CRC {notification.amount}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Telefono</Text>
        <Text style={styles.value}>{notification.senderNumber}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Referencia</Text>
        <Text style={styles.value}>{notification.reference}</Text>
      </View>
    </View>
  );
}
