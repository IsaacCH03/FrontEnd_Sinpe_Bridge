import { StyleSheet } from "react-native";

export const modalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#14142B",
    marginBottom: 20,
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F4F5F9",
    paddingBottom: 10,
  },
  modalBody: {
    gap: 14,
    marginBottom: 24,
  },
  modalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F8F8FA",
    paddingBottom: 8,
  },
  modalRowVertical: {
    flexDirection: "column",
    gap: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#F8F8FA",
    paddingBottom: 8,
  },
  modalLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6E6E80",
  },
  modalValue: {
    fontSize: 14,
    color: "#14142B",
  },
  modalValueBlock: {
    fontSize: 14,
    color: "#14142B",
    marginTop: 2,
    lineHeight: 20,
  },
  closeButton: {
    backgroundColor: "#4F46E5",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});