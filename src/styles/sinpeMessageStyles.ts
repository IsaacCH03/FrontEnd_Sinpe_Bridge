import { StyleSheet } from "react-native";

export const sinpeMessageStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#EEF2FF",
  },
  container: {
    padding: 24,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 8,
  },
  helperText: {
    color: "#475569",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  input: {
    minHeight: 150,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 14,
    padding: 14,
    backgroundColor: "#F8FAFC",
    color: "#111827",
    fontSize: 15,
    lineHeight: 22,
    textAlignVertical: "top",
  },
  actions: {
    gap: 10,
    marginTop: 16,
  },
  button: {
    backgroundColor: "#7C3AED",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },
  secondaryButton: {
    backgroundColor: "#E0E7FF",
  },
  dangerButton: {
    backgroundColor: "#FEE2E2",
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
  secondaryButtonText: {
    color: "#3730A3",
  },
  dangerButtonText: {
    color: "#991B1B",
  },
  feedback: {
    marginTop: 16,
    borderRadius: 14,
    padding: 14,
  },
  successFeedback: {
    backgroundColor: "#DCFCE7",
  },
  errorFeedback: {
    backgroundColor: "#FEE2E2",
  },
  feedbackTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 6,
  },
  feedbackText: {
    color: "#334155",
    fontSize: 14,
    lineHeight: 20,
  },
  responseRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    marginTop: 6,
  },
  responseLabel: {
    color: "#64748B",
    fontSize: 14,
  },
  responseValue: {
    flex: 1,
    color: "#111827",
    fontSize: 14,
    fontWeight: "700",
    textAlign: "right",
  },
});
