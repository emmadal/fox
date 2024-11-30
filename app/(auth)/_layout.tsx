import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="login"
        options={{
          title: "Login",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "#fff" },
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          title: "Sign Up",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "#fff" },
        }}
      />
      <Stack.Screen
        name="reset-password"
        options={{
          title: "Reset Password",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "#fff" },
        }}
      />
    </Stack>
  );
}
