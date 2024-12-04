import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
  MaterialTopTabNavigationEventMap,
} from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { withLayoutContext } from "expo-router";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

const TabLayout = () => {
  return (
    <MaterialTopTabs
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: "green" },
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: { fontSize: 12, fontWeight: "bold" },
        tabBarStyle: { backgroundColor: "#000" },
      }}
    >
      <MaterialTopTabs.Screen
        name="my-videos"
        options={{ title: "My Videos" }}
      />
      <MaterialTopTabs.Screen
        name="liked-videos"
        options={{ title: "Liked Videos" }}
      />
      <MaterialTopTabs.Screen
        name="retweet-videos"
        options={{ title: "Retweet Videos" }}
      />
      <MaterialTopTabs.Screen
        name="pinned-videos"
        options={{ title: "Pinned Videos" }}
      />
    </MaterialTopTabs>
  );
};

export default TabLayout;
