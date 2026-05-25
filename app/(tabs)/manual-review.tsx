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

export default function ManualReviewScreen() {
  const { reviews, loading, loadReviews } = useManualReviews();
  useFocusEffect(
    useCallback(() => {
      loadReviews();
    }, []),
  );
  const getBadgeStyle = (actionType: string) => {
    const isApproved = actionType === "APPROVED";

    return {
      backgroundColor: isApproved ? "#d1fae5" : "#fee2e2",
      color: isApproved ? "#065f46" : "#991b1b",
    };
  };

  const renderReview = ({ item }: any) => {
    const badgeColors = getBadgeStyle(item.actionType);

    return (
      <Pressable
        style={styles.card}
        onPress={() => router.push(`/(tabs)/manual-review/${item.id}`)}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.reviewId}>Revisión #{item.id}</Text>

          <Text style={styles.orderId}>Orden #{item.orderId}</Text>
        </View>

        <View style={styles.cardBody}>
          <Text style={styles.textRow}>📝 {item.description}</Text>

          <View
            style={[
              styles.badge,
              {
                backgroundColor: badgeColors.backgroundColor,
              },
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

        <Text style={styles.subtitle}>
          Transacciones sospechosas detectadas
        </Text>
      </View>

      <FlatList
        data={reviews}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={renderReview}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay revisiones pendientes.</Text>
        }
      />
    </SafeAreaView>
  );
}
