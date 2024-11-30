import React from "react";
import { Pressable, Text, ActivityIndicator } from "react-native";

type ButtonProps = {
  text: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  testID?: string;
};
/**
 * Button component for the app.
 *
 * @param text - The text to display on the button.
 * @param onPress - The function to call when the button is pressed.
 * @param disabled - Whether the button is disabled.
 * @param loading - Whether the button is loading.
 * @param testID - The test ID for the button.
 * @returns The button component.
 */
export default function Button({
  text,
  onPress,
  disabled,
  loading,
  testID,
}: ButtonProps) {
  return (
    <Pressable
      testID={testID}
      className="bg-primary-1000 rounded-lg p-4 justify-center items-center content-center disabled:opacity-50"
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text className="text-white text-lg font-medium">{text}</Text>
      )}
    </Pressable>
  );
}
