import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import React from "react";
import { DrawerContentScrollView } from "@react-navigation/drawer";

const DrawerMenu = (props: any) => {
  return (
    <DrawerContentScrollView
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
      style={{ flex: 1 }}
      {...props}
    />
  );
};

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer drawerContent={(props) => <DrawerMenu {...props} />} />
    </GestureHandlerRootView>
  );
}
