import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

const DrawerMenu = (props: any) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Menu</Text>
      </View>
      <DrawerItem
        label="Profile"
        onPress={() => {}}
        icon={() => <Ionicons name="person-outline" size={24} color="#333" />}
      />
      <DrawerItem
        label="Settings"
        onPress={() => {}}
        icon={() => <Ionicons name="settings-outline" size={24} color="#333" />}
      />
      <TouchableOpacity
        style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}
      >
        <Text style={{ fontSize: 16, color: "#666" }}>Logout</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer drawerContent={(props) => <DrawerMenu {...props} />}>
        <Drawer.Screen
          name="index" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Home",
            title: "overview",
          }}
        />
        <Drawer.Screen
          name="profile" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Profile",
            title: "overview",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
