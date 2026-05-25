import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import AwesomeAlert from "react-native-awesome-alerts";

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

export default function ReviewDetailScreen() {
  const { id } = useLocalSearchParams();
  const [showAlert, setShowAlert] = useState(false);

  const [alertTitle, setAlertTitle] = useState("");

  const [alertMessage, setAlertMessage] = useState("");

  const [review, setReview] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadReview();
    }
  }, [id]);

  async function loadReview() {
    try {
      setLoading(true);

      setReview(null);

      const data = await getManualReviewById(Number(id));

      setReview(data);
    } catch (error: any) {
      Alert.alert("Error", error.message || "No se pudo cargar la revisión.");
    } finally {
      setLoading(false);
    }
  }
  async function handleApprove() {
    try {
      const response = await approveReview(Number(id));

      setAlertTitle("Aprobado");

      setAlertMessage(response.message || "Revisión aprobada correctamente.");

      setShowAlert(true);
    } catch (error: any) {
      setAlertTitle("Error");

      setAlertMessage(error.message || "No se pudo aprobar.");

      setShowAlert(true);
    }
  }

  async function handleReject() {
    try {
      const response = await rejectReview(Number(id));

      setAlertTitle("Rechazado");

      setAlertMessage(response.message || "Revisión rechazada correctamente.");

      setShowAlert(true);
    } catch (error: any) {
      setAlertTitle("Error");

      setAlertMessage(error.message || "No se pudo rechazar.");

      setShowAlert(true);
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
      <SafeAreaView style={styles.container}>
        <ActivityIndicator
          size="large"
          color="#4F46E5"
          style={{ marginTop: 40 }}
        />
      </SafeAreaView>
    );
  }

  if (!review) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.emptyText}>No se encontró la revisión.</Text>
      </SafeAreaView>
    );
  }

  const badgeColors = getBadgeStyle(review.actionType);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Detalle de Revisión</Text>

          <Text style={styles.subtitle}>Validación manual de transacción</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.reviewId}>Revisión #{review.id}</Text>

              <Text style={styles.orderId}>Orden #{review.orderId}</Text>
            </View>

            <View style={styles.cardBody}>
              <Text style={styles.textRow}>📝 {review.description}</Text>

              <View
                style={[
                  styles.badge,
                  {
                    backgroundColor: badgeColors.backgroundColor,
                  },
                ]}
              >
                <Text style={[styles.badgeText, { color: badgeColors.color }]}>
                  {review.actionType}
                </Text>
              </View>
            </View>

            <Pressable style={styles.approveButton} onPress={handleApprove}>
              <Text style={styles.buttonText}>Aprobar</Text>
            </Pressable>

            <Pressable style={styles.rejectButton} onPress={handleReject}>
              <Text style={styles.buttonText}>Rechazar</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>

      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title={alertTitle}
        message={alertMessage}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="OK"
        confirmButtonColor="#4F46E5"
        onConfirmPressed={() => {
          setShowAlert(false);

          router.back();
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
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

  content: {
    padding: 20,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,

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
});
