import { StyleSheet } from "react-native";

export const ordersStyles = StyleSheet.create({
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
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.05,
    shadowRadius: 8,

    elevation: 2,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  customerName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#14142B",
  },

  amount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4F46E5",
  },

  cardBody: {
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
  },

  badgeText: {
    fontSize: 12,
    fontWeight: "bold",
  },

  emptyText: {
    textAlign: "center",
    color: "#6e6e80",
    marginTop: 40,
    fontSize: 16,
  },

  searchInput: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#eaeaea",
    marginHorizontal: 20,
    marginBottom: 16,
    marginTop: 16,
    fontSize: 16,
    color: "#14142B",
  },
});
