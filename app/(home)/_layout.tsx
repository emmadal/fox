import i18n from "@/i18n";
import { Stack } from "expo-router";

export default function HomeLayout() {
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
      <Stack.Screen name="profile" options={{ title: i18n.t("profile") }} />
      <Stack.Screen name="settings" options={{ title: i18n.t("settings") }} />
      <Stack.Screen
        name="notification"
        options={{ title: i18n.t("notification") }}
      />
      <Stack.Screen
        name="edit-profile"
        options={{ title: i18n.t("editprofile") }}
      />
    </Stack>
  );
}
