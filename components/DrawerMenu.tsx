import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";
import i18n from "@/i18n";

export function DrawerMenu(props: any) {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label={i18n.t("profile")}
        onPress={() => navigation.navigate("(home)", { screen: "profile" })}
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
        label="Settings"
        onPress={() => navigation.navigate("(home)", { screen: "settings" })}
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
      <DrawerItem
        label="Chat"
        onPress={() => navigation.navigate("(home)", { screen: "chat" })}
        icon={() => (
          <Ionicons
            name="chatbox-outline"
            size={24}
            color={
              colorScheme === "light" ? Colors.light.text : Colors.dark.text
            }
          />
        )}
      />
      <DrawerItem
        label={i18n.t("language")}
        onPress={() => navigation.navigate("(home)", { screen: "language" })}
        icon={() => (
          <Ionicons
            name="earth-outline"
            size={24}
            color={
              colorScheme === "light" ? Colors.light.text : Colors.dark.text
            }
          />
        )}
      />
      <DrawerItem
        label={i18n.t("accessibility")}
        onPress={() => navigation.navigate("(home)", { screen: "language" })}
        icon={() => (
          <View>
            <Ionicons
              name="accessibility-outline"
              size={24}
              color={
                colorScheme === "light" ? Colors.light.text : Colors.dark.text
              }
            />
          </View>
        )}
      />
      <TouchableOpacity
        style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}
        onPress={() => {}}
      >
        <Text style={{ fontSize: 16, color: "#666" }}>Logout</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}
