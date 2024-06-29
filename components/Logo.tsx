import { ImageStyle, StyleProp, StyleSheet } from "react-native";
import { Image } from "expo-image";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export function Logo({ style }: { style?: StyleProp<ImageStyle> }) {
  return (
    <Image
      style={[styles.image, style]}
      source={require("@/assets/images/icon.png")}
      placeholder={{ blurhash }}
      contentFit="contain"
      transition={1000}
      testID="logo"
      alt="logo"
      aria-label="logo"
      cachePolicy="memory-disk"
    />
  );
}

const styles = StyleSheet.create({
  image: {
    aspectRatio: 1,
    height: 130,
  },
});
