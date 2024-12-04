import { Link, Stack } from "expo-router";
import { View, Text } from "react-native";

export default function NotFoundScreen() {
  return (
    <View>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View className="flex-1 items-center justify-center px-5 dark:bg-black">
        <Text>This screen doesn't exist.</Text>
        <Link href="/" className="mt-5 px-10">
          <Text className="text-black dark:text-white">Go to home screen!</Text>
        </Link>
      </View>
    </View>
  );
}
