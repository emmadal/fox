import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  View,
  Dimensions,
  TouchableOpacity,
  AppState,
  useColorScheme,
  TextInput,
  Platform,
  KeyboardAvoidingView,
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
import i18n from "@/i18n";

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

  const handleItemChange = useCallback(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      const results = comment_users.filter(
        (item) => item.videoId === viewableItems[0].item.id,
      );
      setComments(results);
    }
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
          onViewableItemsChanged={handleItemChange}
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
        <View className="flex-row items-center gap-5 px-5 ios:mb-12 my-2">
          <TextInput
            placeholder={i18n.t("writecomment")}
            className="border border-1 dark:border-white border-gray-400 rounded-lg dark:bg-white bg-transparent  text-black h-14 px-3 text-lg w-[90%]"
            maxLength={100}
          />
          <TouchableOpacity>
            <Icon
              name="send"
              size={30}
              color={colorScheme === "light" ? "black" : "white"}
            />
          </TouchableOpacity>
        </View>
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
