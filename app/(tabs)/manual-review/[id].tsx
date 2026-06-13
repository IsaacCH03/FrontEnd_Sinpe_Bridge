import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  approveReview,
  getManualReviewById,
  rejectReview,
} from "@/src/services/manualReview/manualReviewService";
import { ManualReviewTransaction } from "@/src/types/manualReview";

export default function ReviewDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const reviewId = Number(id);

  const [review, setReview] = useState<ManualReviewTransaction | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const loadReview = useCallback(async () => {
    if (!Number.isFinite(reviewId)) {
      setError("El id de revision no es valido.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");
      const data = await getManualReviewById(reviewId);
      setReview(data);
    } catch (unknownError) {
      setError(
        unknownError instanceof Error
          ? unknownError.message
          : "Error inesperado al cargar la revision.",
      );
    } finally {
      setLoading(false);
    }
  }, [reviewId]);

  useEffect(() => {
    void loadReview();
  }, [loadReview]);

  async function handleAction(action: "approve" | "reject") {
    try {
      setSubmitting(true);
      const response =
        action === "approve"
          ? await approveReview(reviewId)
          : await rejectReview(reviewId);

      Alert.alert(
        action === "approve" ? "Aprobado" : "Rechazado",
        response.message || "Revision procesada correctamente.",
        [{ text: "OK", onPress: () => router.back() }],
      );
    } catch (unknownError) {
      Alert.alert(
        "Error",
        unknownError instanceof Error
          ? unknownError.message
          : "No se pudo procesar la revision.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  const getBadgeStyle = (actionType: string) => {
    const isApproved = actionType === "APPROVED";

    return {
      backgroundColor: isApproved ? "#d1fae5" : "#fee2e2",
      color: isApproved ? "#065f46" : "#991b1b",
    };
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.errorText}>{error}</Text>
          <Pressable style={styles.retryButton} onPress={loadReview}>
            <Text style={styles.buttonText}>Reintentar</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  if (!review) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.emptyText}>No se encontro la revision.</Text>
      </SafeAreaView>
    );
  }

  const badgeColors = getBadgeStyle(review.actionType);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Detalle de Revision</Text>
        <Text style={styles.subtitle}>Validacion manual de transaccion</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.reviewId}>Revision #{review.id}</Text>
            <Text style={styles.orderId}>Orden #{review.orderId ?? "N/A"}</Text>
          </View>

          <View style={styles.cardBody}>
            <Text style={styles.textRow}>{review.description}</Text>

            <View
              style={[
                styles.badge,
                { backgroundColor: badgeColors.backgroundColor },
              ]}
            >
              <Text style={[styles.badgeText, { color: badgeColors.color }]}>
                {review.actionType}
              </Text>
            </View>
          </View>

          <Pressable
            disabled={submitting}
            style={[styles.approveButton, submitting && styles.disabledButton]}
            onPress={() => handleAction("approve")}
          >
            <Text style={styles.buttonText}>Aprobar</Text>
          </Pressable>

          <Pressable
            disabled={submitting}
            style={[styles.rejectButton, submitting && styles.disabledButton]}
            onPress={() => handleAction("reject")}
          >
            <Text style={styles.buttonText}>Rechazar</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f5f9",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  reviewId: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#14142B",
  },
  orderId: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4F46E5",
  },
  cardBody: {
    gap: 10,
    marginBottom: 25,
  },
  textRow: {
    fontSize: 15,
    color: "#4a4a5c",
    lineHeight: 22,
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginTop: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  approveButton: {
    backgroundColor: "#10B981",
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  rejectButton: {
    backgroundColor: "#EF4444",
    paddingVertical: 14,
    borderRadius: 12,
  },
  retryButton: {
    backgroundColor: "#4F46E5",
    padding: 15,
    marginTop: 20,
    borderRadius: 10,
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#6e6e80",
  },
  errorText: {
    color: "#B91C1C",
    fontSize: 16,
  },
});
