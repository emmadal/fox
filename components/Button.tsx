import React from "react";
import { Pressable, Text, ActivityIndicator } from "react-native";

type ButtonProps = {
  text: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  testID?: string;
  className?: string;
};
/**
 * Button component for the app.
 *
 * @param text - The text to display on the button.
 * @param onPress - The function to call when the button is pressed.
 * @param disabled - Whether the button is disabled.
 * @param loading - Whether the button is loading.
 * @param testID - The test ID for the button.
 * @param className - The class name for the button.
 * @returns The button component.
 */
export default function Button({
  text,
  onPress,
  disabled,
  loading,
  testID,
  className,
}: ButtonProps) {
  return (
    <Pressable
      testID={testID}
      className={`bg-primary-1000 items-center justify-center rounded-lg py-3 px-5 ${className}`}
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
