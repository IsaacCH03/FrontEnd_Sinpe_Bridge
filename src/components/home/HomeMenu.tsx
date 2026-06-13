import { Href, router } from "expo-router";
import { useState } from "react";
import { Alert, SafeAreaView, ScrollView, Text, View } from "react-native";

import { Header } from "@/src/components/home/Header";
import { MenuCard } from "@/src/components/home/MenuCard";
import { StatusCard } from "@/src/components/home/StatusCard";
import { PrimaryButton } from "@/src/components/ui/PrimaryButton";
import { menuItems } from "@/src/constants/menuItems";
import { homeStyles as styles } from "@/src/styles/homeStyles";

export function HomeMenu() {
  const [selected, setSelected] = useState<string | null>(null);

  const handleMenuPress = (item: (typeof menuItems)[number]) => {
    setSelected(item.title);
    router.push(item.route as Href);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Header />

        <StatusCard />

        <Text style={styles.sectionTitle}>Menu principal</Text>

        <View style={styles.grid}>
          {menuItems.map((item) => (
            <MenuCard
              key={item.title}
              title={item.title}
              description={item.description}
              icon={item.icon}
              color={item.color}
              selected={selected === item.title}
              onPress={() => handleMenuPress(item)}
            />
          ))}
        </View>

        <PrimaryButton
          title="Iniciar operacion"
          onPress={() => Alert.alert("POS", "Sistema listo para operar.")}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
