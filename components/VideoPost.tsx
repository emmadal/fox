import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";
import { Image } from "expo-image";
import Icon from "@expo/vector-icons/Feather";
import i18n from "@/i18n";
import Button from "./Button";

interface VideoPostProps {
  username: string;
  caption: string;
  videoUrl: string;
  likes: number;
  comments: number;
  shares: number;
  sponsored: boolean;
  userAvatar: string;
  retweet: number;
}

export function VideoPost({
  username,
  caption,
  videoUrl,
  likes,
  comments,
  shares,
  sponsored,
  userAvatar,
  retweet,
}: VideoPostProps) {
  const player = useVideoPlayer(videoUrl, (player) => {
    player.loop = true;
    player.play();
    player.audioMixingMode = "doNotMix";
  });

  return (
    <View
      className="flex-1 dark:bg-black bg-white min-h-screen"
      testID="video-post"
    >
      <View className="flex-row text-wrap gap-2 ml-2 py-3">
        <Image
          source={userAvatar}
          style={styles.avatar}
          contentFit="cover"
          transition={200}
        />
        <View className="flex-column flex-shrink">
          <View className="flex-row gap-2 items-center">
            <Text className="text-black font-bold text-lg dark:text-white text-wrap">
              @{username}
            </Text>
            <TouchableOpacity className="border border-1 border-primary-1000 rounded-lg px-3 py-1">
              <Text className="text-primary-1000 font-bold text-sm">
                {i18n.t("follow")}
              </Text>
            </TouchableOpacity>
          </View>
          <Text className="text-gray-500 font-bold text-base text-wrap dark:text-white">
            {caption}
          </Text>
        </View>
      </View>

      <VideoView
        style={styles.video}
        player={player}
        nativeControls
        allowsFullscreen
        allowsPictureInPicture
        contentFit="cover"
        testID="video-view"
      />
      <View
        className="gap-8 flex-column absolute right-3 top-1/4"
        testID="actions"
      >
        <TouchableOpacity
          className="flex-column items-center"
          testID="icon-heart"
        >
          <Icon name="heart" size={25} color="white" />
          <Text className="text-white text-base">{likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-column items-center"
          testID="icon-message-circle"
        >
          <Icon name="message-circle" size={25} color="white" />
          <Text className="text-white text-base">{comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-column items-center"
          testID="icon-repeat"
        >
          <Icon name="repeat" size={25} color="white" />
          <Text className="text-white text-base">{retweet}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-column items-center"
          testID="icon-share-2"
        >
          <Icon name="share-2" size={25} color="white" />
          <Text className="text-white text-base">{shares}</Text>
        </TouchableOpacity>
      </View>

      <View
        className="absolute top-3/4 right-5 w-full flex-row justify-end items-center mt-10"
        testID="settings"
      >
        {sponsored && (
          <View className="gap-2 flex-column w-full left-16">
            <Button
              text="Book Now"
              onPress={() => console.log("Like")}
              className="py-2 w-1/2 rounded-lg h-12 items-center"
              testID="sponsored-button"
            />
          </View>
        )}
        <TouchableOpacity testID="icon-settings">
          <Icon name="settings" size={25} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  video: {
    width: "100%",
    height: "100%",
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
