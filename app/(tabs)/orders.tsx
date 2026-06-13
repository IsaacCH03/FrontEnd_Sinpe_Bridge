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
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    void loadOrders();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      void handleSearch(searchQuery);
    }, 250);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getOrders();
      setOrders(data);
    } catch (unknownError) {
      setError(
        unknownError instanceof Error
          ? unknownError.message
          : "Error inesperado al obtener ordenes.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    try {
      setError("");

      if (query.trim() === "") {
        const data = await getOrders();
        setOrders(data);
        return;
      }

      const data = await searchOrders(query);
      setOrders(data);
    } catch (unknownError) {
      setError(
        unknownError instanceof Error
          ? unknownError.message
          : "Error inesperado al buscar ordenes.",
      );
    }
  };

  const getBadgeStyle = (status: string) => {
    switch (status.toUpperCase()) {
      case "PAID":
      case "APPROVED":
        return { backgroundColor: "#d1fae5", color: "#065f46" };
      case "REJECTED":
        return { backgroundColor: "#fee2e2", color: "#991b1b" };
      case "SUSPECTED":
        return { backgroundColor: "#fef3c7", color: "#92400e" };
      case "PENDING":
        return { backgroundColor: "#e0f2fe", color: "#0369a1" };
      default:
        return { backgroundColor: "#f3f4f6", color: "#374151" };
    }
  };

  const renderOrder = ({ item }: { item: OrderResponse }) => {
    const badgeColors = getBadgeStyle(item.status);

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.customerName}>{item.customerName}</Text>
          <Text style={styles.amount}>CRC {item.amount}</Text>
        </View>

        <View style={styles.cardBody}>
          <Text style={styles.textRow}>Telefono: {item.phone}</Text>
          <Text style={styles.textRow}>
            Fecha: {new Date(item.createdAt).toLocaleString()}
          </Text>

          <View
            style={[
              styles.badge,
              { backgroundColor: badgeColors.backgroundColor },
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
        <Text style={styles.title}>Ordenes</Text>
        <Text style={styles.subtitle}>Consulta de ordenes registradas</Text>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Buscar por nombre o telefono..."
        placeholderTextColor="#6e6e80"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {error ? (
        <Text style={styles.emptyText}>{error}</Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderOrder}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              {searchQuery !== ""
                ? "No se encontraron coincidencias."
                : "No hay ordenes registradas."}
            </Text>
          }
        />
      )}
    </SafeAreaView>
  );
}
