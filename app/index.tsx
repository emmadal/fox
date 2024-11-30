import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Flame } from "lucide-react-native";
import i18n from "@/i18n";
import Button from "@/components/Button";

export default function Welcome() {
  return (
    <View className="flex-1 justify-center px-5 dark:bg-black">
      <View className="flex-1 justify-center items-center">
        <Flame size={48} color="#f97316" />
        <Text className="text-black font-bold text-3xl dark:text-white mt-5 mb-5">
          {i18n.t("CFBundleDisplayName")}
        </Text>
        <Text className="text-black font-bold text-xl dark:text-white mt-5 mb-5 text-left">
          {i18n.t("onboardingtitle")}
        </Text>
        <Text className="text-black font-normal text-lg dark:text-white leading-7">
          {i18n.t("onboardingdesc")}
        </Text>
      </View>

      <View className="mb-24 gap-14">
        <Button
          text={i18n.t("login")}
          onPress={() => router.navigate("/login")}
        />
        <TouchableOpacity
          className="bg-transparent items-center justify-center"
          onPress={() => router.navigate("/signup")}
        >
          <Text className="text-primary-1000 text-lg font-medium">
            {i18n.t("signup")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
