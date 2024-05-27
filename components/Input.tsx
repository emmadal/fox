import { Colors } from "@/constants/Colors";
import {
  StyleProp,
  TextInput,
  ViewStyle,
  StyleSheet,
  type TextInputProps,
  View,
  useColorScheme,
} from "react-native";
import { ThemedText } from "./ThemedText";

interface Props extends TextInputProps {
  /**
   * text label
   */
  label: string;
  /**
   * The value of the input component
   */
  value?: string;
  /**
   * Convert the input text into password input
   */
  secure?: boolean;

  /**
   * input placeholder
   */
  placeholder?: string;

  /**
   * Styles
   */
  style?: StyleProp<ViewStyle>;
}

export function Input({ label, value, secure, placeholder, style, ...rest }: Props) {
    const colorScheme = useColorScheme()
  return (
    <View style={[styles.container, style]}>
      <View style={styles.labelContainer}>
        <ThemedText type="default" style={styles.label}>
          {label}
        </ThemedText>
      </View>
      <TextInput
        style={[
          styles.input,
          {
            color:
              colorScheme === "light" ? Colors.light.text : Colors.dark.text,
          },
        ]}
        placeholder={placeholder}
        value={value}
        secureTextEntry={secure ? true : false} // make this a prop for password input
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        selectionColor={Colors.primaryColor}
        aria-label={label}        
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderWidth: 2,
    borderColor: Colors.primaryColor,
    borderRadius: 10,
  },
  label: {
    color: "#fff",
  },
  labelContainer: {
    backgroundColor: Colors.primaryColor,
    justifyContent: "center",
    paddingHorizontal: 7,
    borderTopStartRadius: 10,
    borderBottomLeftRadius: 10,
    marginLeft: -1,
    height: 50,
  },
  input: {
    flex: 2,
    textAlign: "auto",
    fontSize: 18,
    lineHeight: 23,
    paddingHorizontal: 5,
  },
});
