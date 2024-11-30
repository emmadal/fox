import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Input from "../Input";

jest.mock("@expo/vector-icons/Feather", () => "Icon");

describe("Input Component", () => {
  const mockOnChangeText = jest.fn();

  beforeEach(() => {
    mockOnChangeText.mockClear();
  });

  it("renders correctly with label", () => {
    const { getByText, getByPlaceholderText } = render(
      <Input
        label="Email"
        placeholder="Enter your email"
        value=""
        onChangeText={mockOnChangeText}
      />,
    );

    expect(getByText("Email")).toBeTruthy();
    expect(getByPlaceholderText("Enter your email")).toBeTruthy();
  });

  it("renders correctly without label", () => {
    const { queryByText, getByPlaceholderText } = render(
      <Input
        placeholder="Enter your email"
        value=""
        onChangeText={mockOnChangeText}
      />,
    );

    expect(queryByText("Email")).toBeNull();
    expect(getByPlaceholderText("Enter your email")).toBeTruthy();
  });

  it("handles text input correctly", () => {
    const { getByTestId } = render(
      <Input
        label="Email"
        placeholder="Enter your email"
        value=""
        onChangeText={mockOnChangeText}
        testID="email-input"
      />,
    );

    const input = getByTestId("email-input");
    fireEvent.changeText(input, "test@example.com");

    expect(mockOnChangeText).toHaveBeenCalledWith("test@example.com");
    expect(mockOnChangeText).toHaveBeenCalledTimes(1);
  });

  it("renders password input with toggle visibility button", () => {
    const { getByTestId } = render(
      <Input
        label="Password"
        placeholder="Enter password"
        value=""
        onChangeText={mockOnChangeText}
        secureTextEntry
        testID="password-input"
      />,
    );

    const input = getByTestId("password-input");
    const toggleButton = getByTestId("toggle-password");

    expect(input.props.secureTextEntry).toBe(true);
    expect(toggleButton).toBeTruthy();
  });

  it("toggles password visibility when toggle button is pressed", () => {
    const { getByTestId } = render(
      <Input
        label="Password"
        placeholder="Enter password"
        value=""
        onChangeText={mockOnChangeText}
        secureTextEntry
        testID="password-input"
      />,
    );

    const input = getByTestId("password-input");
    const toggleButton = getByTestId("toggle-password");

    // Initial state: password is hidden
    expect(input.props.secureTextEntry).toBe(true);

    // Press toggle button
    fireEvent.press(toggleButton);

    // Password should be visible
    expect(input.props.secureTextEntry).toBe(false);

    // Press toggle button again
    fireEvent.press(toggleButton);

    // Password should be hidden again
    expect(input.props.secureTextEntry).toBe(true);
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

  it("sets autoCapitalize to none by default", () => {
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
    expect(input.props.autoCapitalize).toBe("none");
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
    expect(input.props.style).toContainEqual(
      expect.objectContaining({ color: "#fff" }),
    );
  });
});
