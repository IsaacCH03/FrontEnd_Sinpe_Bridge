import { homeStyles as styles } from "@/src/styles/homeStyles";
import { Text, View } from "react-native";

export function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.logoCircle}>
        <Text style={styles.logoText}>POS</Text>
      </View>

      <Text style={styles.title}>Sistema de Punto de Venta</Text>

      <Text style={styles.subtitle}>
        Gestiona ordenes, pagos y confirmaciones SINPE desde un solo lugar.
      </Text>
    </View>
  );
}
