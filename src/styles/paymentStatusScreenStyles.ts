import { StyleSheet } from "react-native";

export const paymentStatusScreenStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#EEF2FF",
  },
  container: {
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 28,
  },
  logoCircle: {
    width: 105,
    height: 105,
    borderRadius: 60,
    backgroundColor: "#7C3AED",
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    color: "#FFFFFF",
    fontSize: 42,
    fontWeight: "800",
  },
  title: {
    marginTop: 24,
    fontSize: 28,
    fontWeight: "800",
    color: "#111827",
    textAlign: "center",
  },
  subtitle: {
    marginTop: 10,
    fontSize: 16,
    color: "#475569",
    textAlign: "center",
    lineHeight: 24,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#DC2626",
    textAlign: "center",
  },
  errorText: {
    marginTop: 10,
    fontSize: 15,
    color: "#64748B",
    textAlign: "center",
  },
  retryButton: {
  marginTop: 24,
  backgroundColor: "#7C3AED",
  paddingVertical: 15,
  paddingHorizontal: 20,
  borderRadius: 16,
  alignItems: "center",
},
retryButtonText: {
  color: "#FFFFFF",
  fontSize: 16,
  fontWeight: "800",
},
backButton: {
  marginBottom: 20,
},
backButtonText: {
  color: "#7C3AED",
  fontSize: 16,
  fontWeight: "800",
},
});