import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  getOrders,
  OrderResponse,
  searchOrders,
} from "@/src/services/orders/orderService";
import { ordersStyles as styles } from "@/src/styles/ordersStyles";

export default function OrdersScreen() {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  const loadOrders = async () => {
    setLoading(true);

    const data = await getOrders();

    setOrders(data);

    setLoading(false);
  };

  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      loadOrders();
      return;
    }

    const data = await searchOrders(searchQuery);

    setOrders(data);
  };

  const getBadgeStyle = (status: string) => {
    switch (status.toUpperCase()) {
      case "PAID":
      case "APPROVED":
        return { backgroundColor: "#d1fae5", color: "#065f46" }; // Verde
      case "REJECTED":
        return { backgroundColor: "#fee2e2", color: "#991b1b" }; // Rojo
      case "SUSPECTED":
        return { backgroundColor: "#fef3c7", color: "#92400e" }; // Amarillo
      case "PENDING":
        return { backgroundColor: "#e0f2fe", color: "#0369a1" }; // Azul claro para distinguir las pendientes
      default:
        return { backgroundColor: "#f3f4f6", color: "#374151" }; // Gris por si llega un estado desconocido
    }
  };

  const renderOrder = ({ item }: any) => {
    const badgeColors = getBadgeStyle(item.status);

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.customerName}>{item.customerName}</Text>

          <Text style={styles.amount}>Total Orden: ₡{item.amount}</Text>
        </View>

        <View style={styles.cardBody}>
          <Text style={styles.textRow}>📱 Teléfono: {item.phone}</Text>

          <Text style={styles.textRow}>
            📅 Fecha: {new Date(item.createdAt).toLocaleString()}
          </Text>

          <View
            style={[
              styles.badge,
              {
                backgroundColor: badgeColors.backgroundColor,
              },
            ]}
          >
            <Text style={[styles.badgeText, { color: badgeColors.color }]}>
              {item.status}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator
          size="large"
          color="#4F46E5"
          style={{ marginTop: 40 }}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Órdenes</Text>

        <Text style={styles.subtitle}>Consulta de órdenes registradas</Text>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="🔍 Buscar por nombre o teléfono..."
        placeholderTextColor="#6e6e80"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={orders}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={renderOrder}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {searchQuery !== ""
              ? "No se encontraron coincidencias."
              : "No hay órdenes registradas."}
          </Text>
        }
      />
    </SafeAreaView>
  );
}
