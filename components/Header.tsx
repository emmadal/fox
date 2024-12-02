import { View, Text } from "react-native";
import Icon from "@expo/vector-icons/Octicons";
import i18n from "@/i18n";

export function Header() {
  return (
    <View
      className="h-28 justify-end px-5 bg-white dark:bg-black"
      testID="header"
    >
      <View
        className="bg-transparent flex-row items-center justify-start dark:bg-transparent gap-2"
        testID="header-content"
      >
        <Icon name="flame" size={24} color="#f97316" testID="icon-flame" />
        <Text
          className="text-black font-bold text-3xl dark:text-white mt-5 mb-5"
          testID="app-name"
        >
          {i18n.t("CFBundleDisplayName")}
        </Text>
      </View>
    </View>
  );
}
