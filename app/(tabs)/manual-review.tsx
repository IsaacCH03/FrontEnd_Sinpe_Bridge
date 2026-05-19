import { router } from "expo-router";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";

import { useManualReviews } from "@/src/hooks/useManualReviews";

export default function ManualReviewScreen() {
  const { reviews, loading } = useManualReviews();

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Cargando...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Transacciones sospechosas</Text>

        {reviews.map((review) => (
          <Pressable
            key={review.id}
            style={styles.card}
            onPress={() => router.push(`/(tabs)/manual-review/${review.id}`)}
          >
            <Text>ID: {review.id}</Text>
            <Text>Orden: {review.orderId}</Text>
            <Text>Estado: {review.actionType}</Text>
            <Text>{review.description}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
});
