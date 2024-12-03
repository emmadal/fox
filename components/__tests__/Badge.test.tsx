import React from "react";
import { render } from "@testing-library/react-native";
import { Badge } from "../Badge"; // Adjust the path to your Badge component
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

// Mocking `useColorScheme`
jest.mock("@/hooks/useColorScheme", () => ({
  useColorScheme: jest.fn(),
}));

describe("Badge Component", () => {
  it("renders correctly", () => {
    const { toJSON } = render(<Badge text="1" />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("displays the text correctly", () => {
    const { getByText } = render(<Badge text="1" />);
    expect(getByText("1")).toBeTruthy();
  });

  it("applies the primary color in light mode by default", () => {
    (useColorScheme as jest.Mock).mockReturnValue("light");

    const { getByTestId } = render(<Badge text="1" />);
    const badgeStyle = getByTestId("badge").props.style;

    // Replace 'Colors.light.tint' with the expected color
    expect(badgeStyle).toContainEqual({ backgroundColor: Colors.light.tint });
  });

  it("applies the secondary color in dark mode", () => {
    (useColorScheme as jest.Mock).mockReturnValue("dark");

    const { getByTestId } = render(<Badge text="2" color="secondary" />);
    const badgeStyle = getByTestId("badge").props.style;

    // Replace 'Colors.dark.tabIconDefault' with the expected color
    expect(badgeStyle).toContainEqual({
      backgroundColor: Colors.dark.tabIconDefault,
    });
  });

  it('applies the correct color for "success"', () => {
    const { getByTestId } = render(<Badge text="3" color="success" />);
    const badgeStyle = getByTestId("badge").props.style;

    expect(badgeStyle).toContainEqual({ backgroundColor: "#4caf50" });
  });

  it('applies the correct color for "danger"', () => {
    const { getByTestId } = render(<Badge text="4" color="danger" />);
    const badgeStyle = getByTestId("badge").props.style;

    expect(badgeStyle).toContainEqual({ backgroundColor: "#f44336" });
  });
});
