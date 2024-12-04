import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MyVideos from "../app/(top-tab)/my-videos";
import LikedVideos from "../app/(top-tab)/liked-videos";
import RetweetVideos from "../app/(top-tab)/retweet-videos";
import PinnedVideos from "../app/(top-tab)/pinned-videos";
import { MaterialIcons } from "@expo/vector-icons";

const Tab = createMaterialTopTabNavigator();

export default function MaterialTopTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: "#f97316", height: 4 },
        tabBarActiveTintColor: "#f97316",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: { fontSize: 12, fontWeight: "bold" },
        tabBarStyle: { backgroundColor: "transparent" },
        tabBarPressColor: "transparent",
      }}
    >
      <Tab.Screen
        name="my-videos"
        key="my-videos"
        component={MyVideos}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="video-library" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="liked-videos"
        component={LikedVideos}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="favorite" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="retweet-videos"
        component={RetweetVideos}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="repeat" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="pinned-videos"
        component={PinnedVideos}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="push-pin" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
