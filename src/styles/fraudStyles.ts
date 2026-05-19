import { StyleSheet } from "react-native";

export const fraudStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f5f9",
  },
  headerContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eaeaea",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#14142B",
  },
  subtitle: {
    fontSize: 14,
    color: "#6e6e80",
    marginTop: 5,
  },
  listContent: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: "#E85D75", // Borde rojo para indicar alerta
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  reference: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#14142B",
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E85D75", // Monto en rojo
  },
  cardBody: {
    flexDirection: "column",
    gap: 6,
  },
  textRow: {
    fontSize: 14,
    color: "#4a4a5c",
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
    backgroundColor: "#fee2e2",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#991b1b",
  },
  emptyText: {
    textAlign: "center",
    color: "#6e6e80",
    marginTop: 40,
    fontSize: 16,
  }
});