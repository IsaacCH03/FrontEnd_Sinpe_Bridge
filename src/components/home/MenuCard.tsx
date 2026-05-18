import { homeStyles as styles } from "@/src/styles/homeStyles";
import { Pressable, Text, View } from "react-native";

type MenuCardProps = {
  title: string;
  description: string;
  icon: string;
  color: string;
  selected: boolean;
  onPress: () => void;
};

export function MenuCard({
  title,
  description,
  icon,
  color,
  selected,
  onPress,
}: MenuCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.menuCard,
        pressed && styles.cardPressed,
        selected && styles.cardSelected,
      ]}
    >
      <View style={[styles.iconCircle, { backgroundColor: `${color}22` }]}>
        <Text style={[styles.iconText, { color }]}>{icon}</Text>
      </View>

      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
    </Pressable>
  );
}