import React from "react";
import { View, Text } from "react-native";
import { Image, useImage } from "expo-image";
import i18n from "@/i18n";
export type AvatarProps = {
  source: string;
  size?: number;
  className?: string;
  position?: "center" | "flex-end" | "flex-start" | "baseline" | "auto";
};

const Avatar = ({
  source,
  size,
  className,
  position = "auto",
}: AvatarProps) => {
  const image = useImage(source, {
    maxWidth: size,
    maxHeight: size,
  });
  if (!image) {
    return <Text className="dark:white text-base">{i18n.t("loading")}</Text>;
  }
  return (
    <View
      className={`overflow-hidden rounded-full border-4 border-gray-100 justify-center items-center ${className}`}
      style={[{ width: size, height: size, alignSelf: position }]}
      testID="avatar-view"
    >
      <Image
        transition={2000}
        source={{ uri: source }}
        style={{ height: size, width: size }}
        cachePolicy="memory"
        className="rounded-full"
        testID="avatar-image"
      />
    </View>
  );
};

export default Avatar;
