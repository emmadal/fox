import React from "react";
import { View, Dimensions, TouchableOpacity, AppState } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { SAMPLE_VIDEOS } from "@/data/video";
import { VideoPost } from "@/components/VideoPost";
import { Header } from "@/components/Header";
import Icon from "@expo/vector-icons/MaterialIcons";
import { useIsFocused } from "@react-navigation/native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();
  const isFocused = useIsFocused();
  const appState = AppState.currentState;
  const isActive = isFocused && appState === "active";
  return (
    <View className="flex-1 dark:bg-black">
      <Header />
      {isActive && (
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
      )}

      <TouchableOpacity
        className="bg-primary-1000 items-center justify-center w-14 h-14 rounded-full absolute bottom-14 right-10 elevation-xl"
        onPress={() => router.navigate("/(home)/record-video")}
        testID="camera-button"
      >
        <Icon name="camera" size={27} color="white" testID="icon-camera" />
      </TouchableOpacity>
    </View>
  );
}
