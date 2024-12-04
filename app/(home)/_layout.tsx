import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack screenOptions={{ animation: "slide_from_bottom" }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="profile"
        options={{
          autoHideHomeIndicator: true,
          headerBackButtonDisplayMode: "minimal",
          headerShadowVisible: false,
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen name="settings" options={{ title: "Settings" }} />
      <Stack.Screen name="notification" options={{ title: "Notifications" }} />
    </Stack>
  );
}
