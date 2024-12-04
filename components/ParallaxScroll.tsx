import React from "react";
import { ScrollView, useWindowDimensions } from "react-native";

export default function ParallaxScroll({
  children,
  className,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { height } = useWindowDimensions();
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={200}
      decelerationRate="fast"
      snapToInterval={height}
      snapToAlignment="start"
      automaticallyAdjustContentInsets
      contentInsetAdjustmentBehavior="automatic"
      className={`p-5 dark:bg-black bg-white ${className}`}
      testID="parallax-scroll-view"
    >
      {children}
    </ScrollView>
  );
}
