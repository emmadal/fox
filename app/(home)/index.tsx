import { View, Dimensions } from "react-native";
import React from "react";
import { FlashList } from "@shopify/flash-list";
import { SAMPLE_VIDEOS } from "@/data/video";
import { VideoPost } from "@/components/VideoPost";
import { Header } from "@/components/Header";

export default function HomeScreen() {
  return (
    <View className="flex-1 dark:bg-black">
      <Header />
      <FlashList
        data={SAMPLE_VIDEOS}
        renderItem={({ item }) => <VideoPost {...item} />}
        estimatedItemSize={20}
        keyExtractor={(item) => item.id}
        initialScrollIndex={0}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        snapToInterval={Dimensions.get("window").height}
        snapToAlignment="start"
        automaticallyAdjustContentInsets={true}
        contentInsetAdjustmentBehavior="automatic"
        onViewableItemsChanged={({ viewableItems }) => {
          console.log(viewableItems);
          if (viewableItems.length > 0) {
            const firstItem = viewableItems[0];
            console.log(firstItem.index);
          }
        }}
      />
    </View>
  );
}
