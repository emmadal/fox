import { ImageStyle, StyleProp, StyleSheet, Image } from "react-native";

export function Logo({ style }: { style?: StyleProp<ImageStyle> }) {
  return (
    <Image
      style={[styles.image, style]}
      source={require("@/assets/images/icon.png")}
      resizeMode="contain"
      testID="logo"
      alt="logo"
      aria-label="logo"
    />
  );
}

const styles = StyleSheet.create({
  image: {
    aspectRatio: 1,
    height: 130,
  },
});
