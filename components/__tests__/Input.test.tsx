import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Input from "../Input";

jest.mock("@expo/vector-icons/Feather", () => "Icon");

describe("Input Component", () => {
  const mockOnChangeText = jest.fn();

  it("renders correctly", () => {
    const { toJSON } = render(
      <Input
        placeholder="Enter your username"
        value=""
        onChangeText={mockOnChangeText}
      />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders correctly with a label", () => {
    const { getByText, getByPlaceholderText } = render(
      <Input
        label="Username"
        placeholder="Enter your username"
        value=""
        onChangeText={mockOnChangeText}
      />,
    );

    expect(getByText("Username")).toBeTruthy();
    expect(getByPlaceholderText("Enter your username")).toBeTruthy();
  });

  it("handles text input change", () => {
    const { getByPlaceholderText } = render(
      <Input
        placeholder="Enter your username"
        value=""
        onChangeText={mockOnChangeText}
      />,
    );

    const input = getByPlaceholderText("Enter your username");
    fireEvent.changeText(input, "testuser");
    expect(mockOnChangeText).toHaveBeenCalledWith("testuser");
  });

  it("applies correct keyboard type", () => {
    const { getByTestId } = render(
      <Input
        label="Email"
        placeholder="Enter your email"
        value=""
        onChangeText={mockOnChangeText}
        keyboardType="email-address"
        testID="email-input"
      />,
    );

    const input = getByTestId("email-input");
    expect(input.props.keyboardType).toBe("email-address");
  });

  it("renders secure text input with visibility toggle", () => {
    const { getByPlaceholderText, getByTestId, queryByTestId } = render(
      <Input
        placeholder="Enter your password"
        value=""
        secureTextEntry
        onChangeText={mockOnChangeText}
      />,
    );

    const input = getByPlaceholderText("Enter your password");
    expect(input.props.secureTextEntry).toBe(true);

    // Toggle password visibility
    const toggleButton = getByTestId("toggle-password");
    expect(toggleButton).toBeTruthy();

    fireEvent.press(toggleButton);
    expect(queryByTestId("toggle-password")).toBeTruthy();
    expect(input.props.secureTextEntry).toBe(false);
  });

  it("supports textarea mode", () => {
    const { getByPlaceholderText } = render(
      <Input
        placeholder="Enter your comment"
        value=""
        textarea
        onChangeText={mockOnChangeText}
      />,
    );

    const input = getByPlaceholderText("Enter your comment");
    expect(input.props.multiline).toBe(true);
    expect(input.props.style.textAlignVertical).toBe("top");
  });

  it("applies dark mode styles when in dark mode", () => {
    // Mock useColorScheme to return 'dark'
    jest.mock("react-native/Libraries/Utilities/useColorScheme", () => ({
      __esModule: true,
      default: () => "dark",
    }));

    const { getByTestId } = render(
      <Input
        label="Username"
        placeholder="Enter username"
        value=""
        onChangeText={mockOnChangeText}
        testID="username-input"
      />,
    );
    const input = getByTestId("username-input");
    expect(input.props.style.color).toBe("#fff");
  });
});
