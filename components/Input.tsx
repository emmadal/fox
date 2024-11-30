import React, { useState } from "react";
import {
  TextInput,
  View,
  Text,
  TextInputProps,
  Pressable,
  useColorScheme,
  StyleSheet,
} from "react-native";
import Icon from "@expo/vector-icons/Feather";
import { Colors } from "@/constants/Colors";

interface InputProps extends TextInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  testID?: string;
}

/**
 * Input field component.
 *
 * @param {string} label - The label for the input field.
 * @param {string} placeholder - The placeholder text for the input field.
 * @param {string} value - The current value of the input field.
 * @param {function} onChangeText - The function to call when the input field's value changes.
 * @param {boolean} secureTextEntry - Whether the input field should be secure (password).
 * @param {string} testID - The test ID for the input field.
 * @returns {JSX.Element} The input field component.
 */
const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType,
  testID,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, isDarkMode && styles.darkText]}>
          {label}
        </Text>
      )}
      <View
        style={[
          styles.inputContainer,
          isDarkMode ? styles.darkContainer : styles.lightContainer,
        ]}
      >
        <TextInput
          style={[
            styles.input,
            isDarkMode && styles.darkText,
            secureTextEntry && { paddingRight: 40 },
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={
            isDarkMode ? Colors.dark.text : Colors.light.tabIconDefault
          }
          keyboardType={keyboardType}
          autoCapitalize="none"
          secureTextEntry={secureTextEntry && !showPassword}
          testID={testID}
        />
        {secureTextEntry && (
          <Pressable
            onPress={togglePasswordVisibility}
            className="absolute right-5 top-1/2 transform -translate-y-1/2 "
            testID="toggle-password"
          >
            <Icon
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color={isDarkMode ? Colors.dark.text : Colors.light.text}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 55,
  },
  lightContainer: {
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  darkContainer: {
    borderColor: "#fff",
    backgroundColor: "#000",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  darkText: {
    color: "#fff",
  },
});

export default Input;
