import { getTransactionHistory } from "@/src/services/transactions/transactionService";
import { historyStyles as styles } from "@/src/styles/transactionHistoryStyles";
import { Transaction } from "@/src/types/transaction";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, Text, TextInput, View } from "react-native";

export default function TransactionHistoryScreen() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    setLoading(true);
    const data = await getTransactionHistory();
    setTransactions(data);
    setLoading(false);
  };

  const getBadgeStyle = (status: string) => {
    const isApproved = status === "Aprobado";
    return {
      backgroundColor: isApproved ? "#d1fae5" : "#fee2e2",
      color: isApproved ? "#065f46" : "#991b1b"
    };
  };

  const filteredTransactions = transactions.filter((t) => {
    const query = searchQuery.toLowerCase();
    
    const ref = t.reference ? t.reference.toLowerCase() : "";
    const sender = t.senderNumber ? t.senderNumber.toLowerCase() : "";

    return (
      ref.includes(query) ||
      sender.includes(query)
    );
  });

  const renderTransaction = ({ item }: { item: Transaction }) => {
    const badgeColors = getBadgeStyle(item.status);
    
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.reference}>Ref: {item.reference}</Text>
          <Text style={styles.amount}>₡{item.amount}</Text>
        </View>

        <View style={styles.cardBody}>
          <Text style={styles.textRow}>
            📱 Origen: {item.senderNumber ? item.senderNumber : "No registrado"}
          </Text>
          <Text style={styles.textRow}>📅 Fecha: {new Date(item.paymentDate).toLocaleString()}</Text>
          <Text style={styles.textRow}>📝 Detalle: {item.verificationResult}</Text>
          
          <View style={[styles.badge, { backgroundColor: badgeColors.backgroundColor }]}>
            <Text style={[styles.badgeText, { color: badgeColors.color }]}>
              {item.status}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Historial</Text>
        <Text style={styles.subtitle}>Consulta de órdenes y pagos procesados</Text>
      </View>

      {/* 3. NUEVO: El campo de texto visual */}
      <TextInput
        style={styles.searchInput}
        placeholder="🔍 Buscar por referencia o celular..."
        placeholderTextColor="#6e6e80"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#4F46E5" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={filteredTransactions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderTransaction}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              {searchQuery !== "" 
                ? "No se encontraron coincidencias." 
                : "No hay transacciones registradas."}
            </Text>
          }
        />
      )}
    </SafeAreaView>
  );
}