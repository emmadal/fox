import { Stack } from "expo-router";

export default function UnAuthorizedLayout() {
  return (
    <Stack initialRouteName="signin" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="signin" />
      <Stack.Screen name="register" />
      <Stack.Screen name="forgot" />
    </Stack>
  );
}
