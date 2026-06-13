import { getFraudAttempts } from "@/src/services/frauds/fraudService";
import { fraudStyles as styles } from "@/src/styles/fraudStyles";
import { FraudAttempt } from "@/src/types/fraudAttempt";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";

export default function FraudAttemptsScreen() {
  const [frauds, setFrauds] = useState<FraudAttempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    void loadFrauds();
  }, []);

  const loadFrauds = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getFraudAttempts();
      setFrauds(data);
    } catch (unknownError) {
      setError(
        unknownError instanceof Error
          ? unknownError.message
          : "Error inesperado al obtener intentos de fraude.",
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredFrauds = frauds.filter((fraud) => {
    const query = searchQuery.toLowerCase();
    const reference = fraud.reference?.toLowerCase() ?? "";
    const type = fraud.fraudType?.toLowerCase() ?? "";
    const dateString = fraud.attemptDate
      ? new Date(fraud.attemptDate).toLocaleDateString()
      : "";

    return (
      reference.includes(query) ||
      type.includes(query) ||
      dateString.includes(query)
    );
  });

  const renderFraud = ({ item }: { item: FraudAttempt }) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.reference}>Ref: {item.reference}</Text>
          <Text style={styles.amount}>CRC {item.amount}</Text>
        </View>

        <View style={styles.cardBody}>
          <Text style={styles.textRow}>
            Fecha: {new Date(item.attemptDate).toLocaleString()}
          </Text>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.fraudType}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Intentos de fraude</Text>
        <Text style={styles.subtitle}>
          Registro de pagos bloqueados o sospechosos
        </Text>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Buscar referencia, tipo o fecha..."
        placeholderTextColor="#6e6e80"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#E85D75"
          style={{ marginTop: 40 }}
        />
      ) : error ? (
        <Text style={styles.emptyText}>{error}</Text>
      ) : (
        <FlatList
          data={filteredFrauds}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderFraud}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              {searchQuery !== ""
                ? "No se encontraron fraudes con esa busqueda."
                : "No se han detectado intentos de fraude."}
            </Text>
          }
        />
      )}
    </SafeAreaView>
  );
}
