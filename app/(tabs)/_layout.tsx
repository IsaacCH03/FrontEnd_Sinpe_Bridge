import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "Ordenes",
          headerShown: true,
          href: null,
        }}
      />
      <Tabs.Screen
        name="manual-review"
        options={{
          title: "Revision manual",
          headerShown: true,
          href: null,
        }}
      />
      <Tabs.Screen
        name="manual-review/[id]"
        options={{
          title: "Detalle de revision",
          headerShown: true,
          href: null,
        }}
      />
      <Tabs.Screen
        name="payment-status"
        options={{
          title: "Notificaciones",
          headerShown: true,
          href: null,
        }}
      />
      <Tabs.Screen
        name="sinpe-message"
        options={{
          title: "Registrar pago SINPE",
          headerShown: true,
          href: null,
        }}
      />
      <Tabs.Screen
        name="transaction-history"
        options={{
          title: "Historial",
          headerShown: true,
          href: null,
        }}
      />
      <Tabs.Screen
        name="fraud-attempts"
        options={{
          title: "Fraudes",
          headerShown: true,
          href: null,
        }}
      />
      <Tabs.Screen
        name="device-status"
        options={{
          title: "Monitoreo",
          headerShown: true,
          href: null,
        }}
      />
    </Tabs>
  );
}
