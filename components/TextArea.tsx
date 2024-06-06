import { Colors } from "@/constants/Colors";
import {
  StyleProp,
  TextInput,
  ViewStyle,
  StyleSheet,
  type TextInputProps,
  useColorScheme,
  Platform,
} from "react-native";
import { ThemedView } from "./ThemedView";

interface Props extends TextInputProps {
  /**
   * The value of the input component
   */
  value?: string;

  /**
   * input placeholder
   */
  placeholder?: string;

  /**
   * Styles
   */
  style?: StyleProp<ViewStyle>;
}

export function TextArea({
  value,
  placeholder,
  style,
  ...rest
}: Props) {
  const colorScheme = useColorScheme();
  return (
    <ThemedView style={[styles.container, style]}>
      <TextInput
        style={[
          styles.input,
          {
            color:
              colorScheme === "light" ? Colors.light.text : Colors.dark.text,
          },
        ]}
        placeholder={placeholder}
        placeholderTextColor={
          colorScheme === "light" ? Colors.light.text : Colors.dark.text
        }
        value={value}
        multiline
        autoFocus
        maxLength={200}
        numberOfLines={5}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        selectionColor={Colors.primaryColor}
        aria-label={placeholder}
        testID="textarea"
        {...rest}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: Colors.primaryColor,
    borderRadius: 5,
  },
  input: {
    textAlign: "auto",
    fontSize: 15,
    height: 100,
    lineHeight: 23,
    paddingHorizontal: 5,
    paddingVertical: Platform.select({
        ios: 15,
    }),
    backgroundColor: "transparent",
  },
});
