import React from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { ThemedText } from "./ThemedText";
import { Colors } from "@/constants/Colors";

interface Props extends PressableProps {
  /**
   * The label that will be rendered inside the component
   */
  title: string;
  /**
   * show a spinner beside the title. (optional)
   */
  loading?: boolean;
  /**
   * Styles
   */
  style?: StyleProp<ViewStyle>;
}

const Button: React.FC<Props> = ({
  title,
  loading,
  style,
  onPress,
  ...props
}: Props) => {
  return (
    <Pressable
      style={[styles.button, style]}
      android_disableSound
      testID="button"
      onPress={onPress}
      {...props}
      aria-label={title}
      role="button"
      android_ripple={{
        radius: 95,
        color: "white",
        borderless: false,
      }}
    >
      <ThemedText
        type="default"
        style={{ fontSize: 16, color: "white", fontWeight: "600" }}
      >
        {title}{" "}
      </ThemedText>
      {loading && typeof loading === "boolean" ? (
        <ActivityIndicator
          size="small"
          color="white"
          testID="loading"
          accessibilityRole="spinbutton"
        />
      ) : null}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 0,
    borderColor: "transparent",
    maxWidth: "50%",
    backgroundColor: Colors.primaryColor,
    justifyContent: "center",
    padding: 8.5,
  },
});

export default Button;
