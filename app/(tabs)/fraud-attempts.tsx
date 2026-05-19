import { getFraudAttempts } from "@/src/services/frauds/fraudService";
import { fraudStyles as styles } from "@/src/styles/fraudStyles";
import { FraudAttempt } from "@/src/types/fraudAttempt";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, Text, TextInput, View } from "react-native";

export default function FraudAttemptsScreen() {
  const [frauds, setFrauds] = useState<FraudAttempt[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadFrauds();
  }, []);

  const loadFrauds = async () => {
    setLoading(true);
    const data = await getFraudAttempts();
    setFrauds(data);
    setLoading(false);
  };

  const filteredFrauds = frauds.filter((f) => {
    const query = searchQuery.toLowerCase();
    
    const ref = f.reference ? f.reference.toLowerCase() : "";
    const type = f.fraudType ? f.fraudType.toLowerCase() : "";
    const dateString = f.attemptDate ? new Date(f.attemptDate).toLocaleDateString() : "";

    return (
      ref.includes(query) ||
      type.includes(query) ||
      dateString.includes(query)
    );
  });

  const renderFraud = ({ item }: { item: FraudAttempt }) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.reference}>Ref: {item.reference}</Text>
          <Text style={styles.amount}>₡{item.amount}</Text>
        </View>

        <View style={styles.cardBody}>
          <Text style={styles.textRow}>📅 Fecha: {new Date(item.attemptDate).toLocaleString()}</Text>
          
          <View style={styles.badge}>
            <Text style={styles.badgeText}>⚠️ {item.fraudType}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Intentos de Fraude</Text>
        <Text style={styles.subtitle}>Registro de pagos bloqueados o sospechosos</Text>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="🔍 Buscar referencia, tipo o fecha..."
        placeholderTextColor="#6e6e80"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#E85D75" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={filteredFrauds}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderFraud}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              {searchQuery !== "" 
                ? "No se encontraron fraudes con esa búsqueda." 
                : "No se han detectado intentos de fraude."}
            </Text>
          }
        />
      )}
    </SafeAreaView>
  );
}