import { StyleSheet } from "react-native";

export const paymentNotificationCardStyles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  cardSuccess: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 2,
    borderColor: "#22C55E",
  },
  icon: {
    fontSize: 42,
    marginBottom: 12,
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#111827",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 22,
  },
  connection: {
    marginTop: 18,
    fontSize: 14,
    fontWeight: "700",
    color: "#7C3AED",
  },
  row: {
    marginTop: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingBottom: 10,
  },
  label: {
    fontSize: 13,
    color: "#64748B",
    marginBottom: 3,
  },
  value: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
});