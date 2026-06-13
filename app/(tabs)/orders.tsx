import { useOrders } from "@/src/hooks/useOrders";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

export default function OrdersScreen() {
  const { orders, loading, error } = useOrders();

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Cargando ordenes...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Ordenes</Text>
        <Text style={styles.errorText}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Ordenes</Text>

        {orders.length === 0 ? (
          <Text style={styles.emptyText}>No hay ordenes registradas.</Text>
        ) : (
          orders.map((order) => (
            <View key={order.id} style={styles.card}>
              <Text>Cliente: {order.customerName}</Text>
              <Text>Telefono: {order.phone}</Text>
              <Text>Monto: CRC {order.amount}</Text>
              <Text>Estado: {order.status}</Text>
              <Text>Fecha: {order.createdAt}</Text>
            </View>
          ))
        )}
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
  emptyText: {
    color: "#64748B",
    fontSize: 16,
  },
  errorText: {
    color: "#B91C1C",
    fontSize: 16,
  },
});
