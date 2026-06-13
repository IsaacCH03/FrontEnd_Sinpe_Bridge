import { router, useFocusEffect } from "expo-router";
import { useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from "react-native";

import { useManualReviews } from "@/src/hooks/useManualReviews";
import { manualReviewStyles as styles } from "@/src/styles/manualReviewStyles";
import { ManualReviewTransaction } from "@/src/types/manualReview";

export default function ManualReviewScreen() {
  const { reviews, loading, error, loadReviews } = useManualReviews();

  useFocusEffect(
    useCallback(() => {
      void loadReviews();
    }, [loadReviews]),
  );

  const getBadgeStyle = (actionType: string) => {
    const isApproved = actionType === "APPROVED";

    return {
      backgroundColor: isApproved ? "#d1fae5" : "#fee2e2",
      color: isApproved ? "#065f46" : "#991b1b",
    };
  };

  const renderReview = ({ item }: { item: ManualReviewTransaction }) => {
    const badgeColors = getBadgeStyle(item.actionType);

    return (
      <Pressable
        style={styles.card}
        onPress={() => router.push(`/(tabs)/manual-review/${item.id}`)}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.reviewId}>Revision #{item.id}</Text>
          <Text style={styles.orderId}>Orden #{item.orderId ?? "N/A"}</Text>
        </View>

        <View style={styles.cardBody}>
          <Text style={styles.textRow}>{item.description}</Text>

          <View
            style={[
              styles.badge,
              { backgroundColor: badgeColors.backgroundColor },
            ]}
          >
            <Text style={[styles.badgeText, { color: badgeColors.color }]}>
              {item.actionType}
            </Text>
          </View>
        </View>
      </Pressable>
    );
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Revisiones Manuales</Text>
        <Text style={styles.subtitle}>Transacciones sospechosas detectadas</Text>
      </View>

      {error ? (
        <Text style={styles.emptyText}>{error}</Text>
      ) : (
        <FlatList
          data={reviews}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderReview}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No hay revisiones pendientes.</Text>
          }
        />
      )}
    </SafeAreaView>
  );
}
