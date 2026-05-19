import { StyleSheet } from "react-native";

export const monitoringStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f5f9",
  },
  content: {
    padding: 20,
  },
  statusCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  indicator: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  statusTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#14142B",
  },
  lastSeen: {
    fontSize: 14,
    color: "#6e6e80",
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#14142B",
    marginBottom: 16,
    marginTop: 10,
  },
  historyCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#E85D75",
  },
  eventDate: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#14142B",
  },
  eventMessage: {
    fontSize: 13,
    color: "#4a4a5c",
    marginTop: 4,
  },
  emptyText: {
    textAlign: "center",
    color: "#6e6e80",
    marginTop: 20,
  }
});