import i18n from "@/i18n";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

export default function HomeLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        animation: "slide_from_bottom",
        headerBackButtonDisplayMode: "minimal",
        headerShadowVisible: false,
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="profile"
        options={{
          title: i18n.t("profile"),
          headerTitleAlign: "left",
          headerTitleStyle: {
            color: colorScheme === "light" ? "black" : "white",
          },
          headerStyle: {
            backgroundColor: colorScheme === "light" ? "white" : "black",
          },
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          title: i18n.t("settings"),
          headerTitleAlign: "left",
          headerTitleStyle: {
            color: colorScheme === "light" ? "black" : "white",
          },
          headerStyle: {
            backgroundColor: colorScheme === "light" ? "white" : "black",
          },
        }}
      />
      <Stack.Screen
        name="notification"
        options={{
          title: i18n.t("notification"),
          headerTitleAlign: "left",
          headerTitleStyle: {
            color: colorScheme === "light" ? "black" : "white",
          },
          headerStyle: {
            backgroundColor: colorScheme === "light" ? "white" : "black",
          },
        }}
      />
      <Stack.Screen
        name="edit-profile"
        options={{
          title: i18n.t("editprofile"),
          headerTitleAlign: "left",
          headerTitleStyle: {
            color: colorScheme === "light" ? "black" : "white",
          },
          headerStyle: {
            backgroundColor: colorScheme === "light" ? "white" : "black",
          },
        }}
      />
    </Stack>
  );
}
