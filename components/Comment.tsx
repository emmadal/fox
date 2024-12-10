import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import moment from "moment";
import { blurash } from "@/constants/Colors";

interface CommentProps {
  username: string;
  userAvatar: string;
  comment: string;
  likes: number;
  reply: number;
  createdAt: string;
}

export default function Comment({
  username,
  userAvatar,
  comment,
  likes,
  reply,
  createdAt,
}: CommentProps) {
  return (
    <View className="flex-1 flex-row text-wrap gap-2 px-3" testID="comment">
      <Pressable testID="comment-avatar">
        <Image
          source={userAvatar}
          style={styles.avatar}
          contentFit="cover"
          className="mt-2"
          onError={(error) => console.warn("Avatar load error:", error)}
          placeholder={{ blurash }}
        />
      </Pressable>
      <View className="flex-1 flex-shrink" testID="comment-content">
        <Pressable>
          <Text className="text-black font-bold text-lg dark:text-white text-balance">
            {username}
          </Text>
        </Pressable>
        <Text className="text-black dark:text-white">{comment}</Text>
        <View
          className="flex-1 flex-row justify-between mt-2"
          testID="info-section"
        >
          <Text
            className="font-semibold text-gray-500 dark:text-stone-400"
            testID="comment-date"
          >
            {moment(createdAt).locale("en").fromNow(true)}
          </Text>
          <View
            className="flex-row items-center gap-5 justify-end"
            testID="comment-actions"
          >
            <TouchableOpacity
              className="justify-center items-center flex-column"
              testID="like-button"
            >
              <Icon name="heart-outline" size={21} color="#f97316" />
              <Text className="text-black dark:text-white text-sm">
                {likes}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="justify-center items-center flex-column"
              testID="reply-button"
            >
              <Icon name="comment-text-outline" size={21} color="#f97316" />
              <Text className="text-black dark:text-white text-sm">
                {reply}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 25,
    height: 25,
    borderRadius: 50,
    marginTop: 5,
  },
});
