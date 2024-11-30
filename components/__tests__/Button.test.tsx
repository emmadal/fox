import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Button from "../Button";

describe("Button Component", () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    mockOnPress.mockClear();
  });

  it("handles press events", () => {
    const { getByText } = render(
      <Button text="Test Button" onPress={mockOnPress} />,
    );

    fireEvent.press(getByText("Test Button"));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it("shows loading indicator when loading prop is true", () => {
    const { getByTestId } = render(
      <Button
        text="Test Button"
        onPress={mockOnPress}
        loading={true}
        testID="button"
      />,
    );

    expect(getByTestId("button")).toBeTruthy();
  });

  it("disables button when disabled prop is true", () => {
    const { getByText } = render(
      <Button text="Test Button" onPress={mockOnPress} disabled={true} />,
    );

    fireEvent.press(getByText("Test Button"));
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it("disables button when loading is true", () => {
    const { getByTestId } = render(
      <Button
        text="Test Button"
        onPress={mockOnPress}
        loading={true}
        testID="button"
      />,
    );

    fireEvent.press(getByTestId("button"));
    expect(mockOnPress).not.toHaveBeenCalled();
  });
});
