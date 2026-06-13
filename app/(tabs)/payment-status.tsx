import { usePaymentNotifications } from "@/hooks/usePaymentNotifications";
import { usePendingOrder } from "@/hooks/usePendingOrder";
import { PaymentNotificationCard } from "@/src/components/payments/PaymentNotificationCard";
import { paymentStatusScreenStyles as styles } from "@/src/styles/paymentStatusScreenStyles";
import { router } from "expo-router";
import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";

export default function PaymentStatusScreen() {
  const { pendingOrder, isLoadingOrder, orderError, reloadPendingOrder } =
    usePendingOrder();

  const { notification, isConnected, connectionError } =
    usePaymentNotifications(pendingOrder?.id ?? null);

  if (isLoadingOrder) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.center}>
          <Text style={styles.title}>Buscando orden pendiente...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (orderError) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.center}>
          <Text style={styles.errorTitle}>Error</Text>
          <Text style={styles.errorText}>{orderError}</Text>

          <Pressable style={styles.retryButton} onPress={reloadPendingOrder}>
            <Text style={styles.retryButtonText}>Reintentar</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  if (!pendingOrder) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.center}>
          <Text style={styles.title}>No hay ordenes pendientes</Text>
          <Text style={styles.errorText}>
            Cuando se cree una nueva orden, aparecera aqui.
          </Text>

          <Pressable style={styles.retryButton} onPress={reloadPendingOrder}>
            <Text style={styles.retryButtonText}>Actualizar</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Volver</Text>
        </Pressable>
        <View style={styles.header}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>CRC</Text>
          </View>

          <Text style={styles.title}>Confirmacion de pago</Text>

          <Text style={styles.subtitle}>
            Orden #{pendingOrder.id} pendiente por CRC {pendingOrder.amount}
          </Text>
        </View>

        <PaymentNotificationCard
          orderId={pendingOrder.id}
          notification={notification}
          isConnected={isConnected}
          connectionError={connectionError}
        />

        <Pressable style={styles.retryButton} onPress={reloadPendingOrder}>
          <Text style={styles.retryButtonText}>Buscar nueva orden</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
