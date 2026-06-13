import { useLocalSearchParams } from "expo-router";
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

      Alert.alert("Exito", response.message);
      await loadReview();
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
        <Text style={styles.errorText}>{error}</Text>
        <Pressable style={styles.retryButton} onPress={loadReview}>
          <Text style={styles.buttonText}>Reintentar</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  if (!review) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>No se encontro la revision.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text>ID: {review.id}</Text>
        <Text>Orden: {review.orderId ?? "Sin orden"}</Text>
        <Text>Estado: {review.actionType}</Text>
        <Text>{review.description}</Text>

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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  approveButton: {
    backgroundColor: "green",
    padding: 15,
    marginTop: 20,
    borderRadius: 10,
  },
  rejectButton: {
    backgroundColor: "red",
    padding: 15,
    marginTop: 10,
    borderRadius: 10,
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
  },
  errorText: {
    color: "#B91C1C",
    fontSize: 16,
  },
});
