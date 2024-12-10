import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  View,
  Dimensions,
  TouchableOpacity,
  AppState,
  useColorScheme,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SAMPLE_VIDEOS } from "@/data/video";
import VideoPost from "@/components/VideoPost";
import { Header } from "@/components/Header";
import Icon from "@expo/vector-icons/MaterialIcons";
import { useIsFocused } from "@react-navigation/native";
import { useRouter } from "expo-router";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { comment_users } from "@/data/comments";
import Comment from "@/components/Comment";

export default function HomeScreen() {
  const router = useRouter();
  const isFocused = useIsFocused();
  const appState = AppState.currentState;
  const isActive = isFocused && appState === "active";
  const ref = useRef<BottomSheet>(null);
  const [comments, setComments] = useState<any[]>([]);
  const colorScheme = useColorScheme();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const snapPoints = useMemo(() => ["60%"], []);
  const openBottomSheet = useCallback(() => {
    setIsSheetOpen(true);
    ref.current?.expand();
  }, []);

  return (
    <View className="flex-1 dark:bg-black">
      <Header />
      {isActive && (
        <FlatList
          data={SAMPLE_VIDEOS}
          renderItem={({ item }) => (
            <VideoPost {...item} openBottomSheet={openBottomSheet} />
          )}
          keyExtractor={(item) => item.id}
          initialScrollIndex={0}
          decelerationRate="fast"
          showsVerticalScrollIndicator={false}
          snapToInterval={Dimensions.get("window").height}
          snapToAlignment="start"
          automaticallyAdjustContentInsets={true}
          contentInsetAdjustmentBehavior="automatic"
          onViewableItemsChanged={({ viewableItems }) => {
            const results = comment_users.filter(
              (item) => item.videoId === viewableItems[0].item.id,
            );
            setComments(results);
          }}
        />
      )}

      <BottomSheet
        ref={ref}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        onClose={() => setIsSheetOpen(false)}
        index={-1}
        backgroundStyle={{
          backgroundColor: colorScheme === "light" ? "#fff" : "#000",
        }}
      >
        <BottomSheetFlatList
          testID="flat-list"
          showsVerticalScrollIndicator={false}
          contentInsetAdjustmentBehavior="automatic"
          data={comments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Comment {...item} />}
        />
      </BottomSheet>

      {!isSheetOpen ? (
        <TouchableOpacity
          className="bg-primary-1000 items-center justify-center w-14 h-14 rounded-full absolute bottom-14 right-10 elevation-xl"
          onPress={() => router.navigate("/(home)/record-video")}
          testID="camera-button"
        >
          <Icon name="camera" size={27} color="white" testID="icon-camera" />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}
