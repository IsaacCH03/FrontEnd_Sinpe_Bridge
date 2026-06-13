import {
  getDeviceStatus,
  getMonitoringHistory,
} from "@/src/services/monitoring/monitoringService";
import { monitoringStyles as styles } from "@/src/styles/monitoringStyles";
import { DeviceStatus, MonitoringEvent } from "@/src/types/monitoring";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function DeviceStatusScreen() {
  const [status, setStatus] = useState<DeviceStatus | null>(null);
  const [history, setHistory] = useState<MonitoringEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      setError("");
      const [statusData, historyData] = await Promise.all([
        getDeviceStatus(),
        getMonitoringHistory(),
      ]);
      setStatus(statusData);
      setHistory(historyData);
    } catch (unknownError) {
      setError(
        unknownError instanceof Error
          ? unknownError.message
          : "Error inesperado al cargar monitoreo.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
          Monitoreo
        </Text>

        {error ? <Text style={styles.emptyText}>{error}</Text> : null}

        <View style={styles.statusCard}>
          <View
            style={[
              styles.indicator,
              { backgroundColor: status?.isConnected ? "#d1fae5" : "#fee2e2" },
            ]}
          >
            <Text style={{ fontSize: 18 }}>
              {status?.isConnected ? "ON" : "OFF"}
            </Text>
          </View>
          <Text style={styles.statusTitle}>
            {status?.isConnected
              ? "Dispositivo conectado"
              : "Dispositivo desconectado"}
          </Text>
          <Text style={styles.lastSeen}>
            Ultima senal:{" "}
            {status
              ? new Date(status.lastCommunication).toLocaleString()
              : "Sin datos"}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Historial de fallos</Text>

        {history.length > 0 ? (
          history.map((event) => (
            <View key={event.id} style={styles.historyCard}>
              <Text style={styles.eventDate}>
                {new Date(event.disconnectedAt).toLocaleString()}
              </Text>
              <Text style={styles.eventMessage}>{event.message}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>
            No se han registrado caidas de conexion.
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
