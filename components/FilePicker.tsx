import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  useColorScheme,
  TouchableWithoutFeedback,
} from "react-native";
import { PropsWithChildren } from "react";
import FeatherIcons from "@expo/vector-icons/Feather";
import i18n from "@/i18n";
import { Colors } from "@/constants/Colors";

type Props = PropsWithChildren<{
  isVisible: boolean;
  onClose: () => void;
  onOpenCamera: () => void;
  onTakePhoto: () => void;
}>;

export default function FilePicker({
  isVisible,
  onClose,
  onOpenCamera,
  onTakePhoto,
}: Props) {
  const colorScheme = useColorScheme();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
      testID="file-picker-modal"
    >
      <TouchableWithoutFeedback onPress={onClose} testID="file-picker-backdrop">
        <View className="flex-1 justify-center items-center bg-transparent">
          <View className="dark:bg-gray-800 bg-gray-100 dark:text-white absolute bottom-1/2 self-center py-6 gap-8 pl-5 w-[90%] rounded-lg">
            <TouchableOpacity
              className="flex-row items-center gap-2"
              testID="camera-button"
              onPress={onOpenCamera}
            >
              <FeatherIcons
                name="camera"
                size={24}
                color={
                  colorScheme === "light" ? Colors.light.text : Colors.dark.text
                }
              />
              <Text className="text-black dark:text-white font-medium text-lg">
                {i18n.t("takephoto")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row items-center gap-2"
              testID="photo-button"
              onPress={onTakePhoto}
            >
              <FeatherIcons
                name="image"
                size={24}
                color={
                  colorScheme === "light" ? Colors.light.text : Colors.dark.text
                }
              />
              <Text className="text-black dark:text-white font-medium text-lg">
                {i18n.t("choosephoto")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
