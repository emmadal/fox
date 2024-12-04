import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";
import i18n from "@/i18n";

export function DrawerMenu(props: any) {
  const router = useRouter();
  const colorScheme = useColorScheme();

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label={i18n.t("profile")}
        onPress={() => router.navigate("/(home)/profile")}
        icon={() => (
          <Ionicons
            name="person-outline"
            size={24}
            color={
              colorScheme === "light" ? Colors.light.text : Colors.dark.text
            }
          />
        )}
      />

      <DrawerItem
        label={i18n.t("settings")}
        onPress={() => router.navigate("/(home)/settings")}
        icon={() => (
          <Ionicons
            name="settings-outline"
            size={24}
            color={
              colorScheme === "light" ? Colors.light.text : Colors.dark.text
            }
          />
        )}
      />
      <TouchableOpacity
        style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}
        onPress={() => {}}
      >
        <Text style={{ fontSize: 16, color: "#666" }}>{i18n.t("logout")}</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}
