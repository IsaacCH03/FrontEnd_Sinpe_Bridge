import { homeStyles as styles } from "@/src/styles/homeStyles";
import { Text, View } from "react-native";

export function StatusCard() {
  return (
    <View style={styles.statusCard}>
      <View>
        <Text style={styles.statusTitle}>Estado del sistema</Text>
        <Text style={styles.statusText}>Listo para operar</Text>
      </View>

      <View style={styles.statusBadge}>
        <Text style={styles.statusBadgeText}>Activo</Text>
      </View>
    </View>
  );
}