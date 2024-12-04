import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, useColorScheme } from "react-native";
import { useStore } from "@/store";
import i18n from "@/i18n";
import Avatar from "@/components/Avatar";
import ParallaxScroll from "@/components/ParallaxScroll";
import { Image } from "expo-image";
import { Colors } from "@/constants/Colors";
import Icon from "@expo/vector-icons/Entypo";
import { ExternalLink } from "@/components/ExternalLink";
import { useNavigation } from "expo-router";
import MaterialTopTabs from "@/components/MaterialTopTabs";

const Profile = () => {
  const { user } = useStore();
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: user.name,
      headerStyle: {
        backgroundColor:
          colorScheme === "light" ? Colors.dark.text : Colors.light.text,
      },
    });
  }, [user.name, navigation, colorScheme]);

  return (
    <ParallaxScroll>
      <View className="flex-row items-center justify-between">
        <TouchableOpacity onPress={() => console.log(user.avatar_url)}>
          <Avatar source={user.avatar_url as string} size={85} />
        </TouchableOpacity>
        <TouchableOpacity className="border border-gray-300 rounded-full px-5 py-2 justify-center items-center">
          <Text className="text-black text-base font-medium dark:text-white">
            {i18n.t("editprofile")}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex-col justify-center">
        <View className="flex-row items-center">
          <Text className="text-black text-xl dark:text-white font-semibold">
            {user?.name}{" "}
          </Text>
          {user.premium && (
            <TouchableOpacity>
              <Image
                source={require("@/assets/images/verified.svg")}
                style={{ width: 21, height: 21 }}
              />
            </TouchableOpacity>
          )}
        </View>
        <Text className="text-gray-600 text-base dark:text-white">
          @{user.username} | {i18n.t("joined")}{" "}
          {new Date(user?.created_at!).toLocaleDateString("en-GB", {
            month: "long",
            year: "numeric",
          })}
        </Text>
      </View>
      <View className="mt-2 flex-col">
        <Text className="text-black dark:text-white text-base text-balance">
          {user?.biography}
        </Text>
        {user?.website && (
          <View className="flex-row items-center gap-1 mt-1">
            <Icon
              name="globe"
              size={13}
              color={
                colorScheme === "dark" ? Colors.dark.text : Colors.light.text
              }
            />
            <ExternalLink href={user?.website!} style={{ flex: 1 }}>
              <Text className="text-primary-1000 text-base font-medium">
                {user?.website}
              </Text>
            </ExternalLink>
          </View>
        )}
      </View>
      <View className="flex-row gap-14 self-center mt-3 mb-5">
        <View className="items-center">
          <Text className="text-black text-lg dark:text-white font-bold">
            0
          </Text>
          <Text className="text-gray-500 text-base dark:text-white font-medium">
            {i18n.t("following")}
          </Text>
        </View>
        <View className="items-center">
          <Text className="text-black text-lg dark:text-white font-bold">
            0
          </Text>
          <Text className="text-gray-500 text-base dark:text-white font-medium">
            {i18n.t("followers")}
          </Text>
        </View>
        <View className="items-center">
          <Text className="text-black text-lg dark:text-white font-bold">
            0
          </Text>
          <Text className="text-gray-500 text-base dark:text-white font-medium">
            {i18n.t("retweets")}
          </Text>
        </View>
      </View>
      <MaterialTopTabs />
    </ParallaxScroll>
  );
};

export default Profile;
