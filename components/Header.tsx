import { View, Text, TouchableOpacity, useColorScheme } from "react-native";
import Icon from "@expo/vector-icons/Octicons";
import i18n from "@/i18n";
import { Colors } from "@/constants/Colors";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { Badge } from "./Badge";
import { notifs } from "@/data/notif";

export function Header() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  return (
    <View
      className="h-28 justify-end px-5 bg-white dark:bg-black"
      testID="header"
    >
      <View className="flex-row items-center justify-between mb-5">
        <View
          className="bg-transparent flex-row items-center dark:bg-transparent gap-2"
          testID="header-content"
        >
          <Icon name="flame" size={24} color="#f97316" testID="icon-flame" />
          <Text
            className="text-black font-bold text-3xl dark:text-white"
            testID="app-name"
          >
            {i18n.t("CFBundleDisplayName")}
          </Text>
        </View>

        <View className="flex-row items-center gap-14">
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("(home)", { screen: "notification" })
            }
            className="bg-transparent"
            testID="notification-button"
          >
            {notifs.length === 0 ? null : (
              <Badge
                text={notifs.length > 10 ? "10+" : `${notifs.length}`}
                color="danger"
              />
            )}

            <Icon
              name="bell"
              size={25}
              color={
                colorScheme === "light" ? Colors.light.text : Colors.dark.text
              }
              testID="icon-bell"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            className="bg-transparent"
            testID="drawer-button"
          >
            <Icon
              name="three-bars"
              size={25}
              color={
                colorScheme === "light" ? Colors.light.text : Colors.dark.text
              }
              testID="icon-gear"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
