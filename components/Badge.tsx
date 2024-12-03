import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

interface BadgeProps {
  text: string;
  color?: "primary" | "secondary" | "success" | "danger";
}

export const Badge: React.FC<BadgeProps> = ({ text, color = "primary" }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const getBadgeColor = () => {
    const baseColor = isDark ? Colors.dark : Colors.light;
    switch (color) {
      case "primary":
        return baseColor.tint;
      case "secondary":
        return baseColor.tabIconDefault;
      case "success":
        return "#4caf50";
      case "danger":
        return "#f44336";
      default:
        return baseColor.tint;
    }
  };

  return (
    <View
      style={[styles.badge, { backgroundColor: getBadgeColor() }]}
      testID="badge"
    >
      <Text className="text-center text-xs text-white">{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: 50,
    height: 22,
    width: 22,
    position: "absolute",
    top: -10,
    right: -7,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
