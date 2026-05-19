import { useOrders } from "@/src/hooks/useOrders";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

export default function OrdersScreen() {
  const { orders, loading } = useOrders();

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Cargando órdenes...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Órdenes</Text>

        {orders.map((order) => (
          <View key={order.id} style={styles.card}>
            <Text>Cliente: {order.customerName}</Text>
            <Text>Teléfono: {order.phone}</Text>
            <Text>Monto: ₡{order.amount}</Text>
            <Text>Estado: {order.status}</Text>
            <Text>Fecha: {order.createdAt}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
  },
});
