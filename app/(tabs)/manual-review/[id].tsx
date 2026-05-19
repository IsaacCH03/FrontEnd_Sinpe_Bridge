import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
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

  const [review, setReview] = useState<any>(null);

  useEffect(() => {
    loadReview();
  }, []);

  async function loadReview() {
    const data = await getManualReviewById(Number(id));
    console.log(data);
    setReview(data);
  }

  async function handleApprove() {
    try {
      const response = await approveReview(Number(id));

      Alert.alert("Éxito", response.message);

      loadReview();
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  }

  async function handleReject() {
    try {
      const response = await rejectReview(Number(id));

      Alert.alert("Éxito", response.message);

      loadReview();
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  }

  if (!review) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text>ID: {review.id}</Text>
        <Text>Orden: {review.orderId}</Text>
        <Text>Estado: {review.actionType}</Text>
        <Text>{review.description}</Text>

        <Pressable style={styles.approveButton} onPress={handleApprove}>
          <Text style={styles.buttonText}>Aprobar</Text>
        </Pressable>

        <Pressable style={styles.rejectButton} onPress={handleReject}>
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

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
