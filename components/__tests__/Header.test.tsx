import React from "react";
import { render } from "@testing-library/react-native";
import { Header } from "../Header";
import i18n from "@/i18n";

// Mock the Octicons icon
jest.mock("@expo/vector-icons/Octicons", () => {
  // eslint-disable-next-line react/display-name
  return ({
    name,
    size,
    color,
  }: {
    name: string;
    size: number;
    color: string;
  }) => {
    const { View } = require("react-native");
    return <View testID={`icon-${name}`} />;
  };
});

describe("Header Component", () => {
  it("renders all elements with correct testIDs", () => {
    const { getByTestId } = render(<Header />);
    expect(getByTestId("header")).toBeTruthy();
    expect(getByTestId("header-content")).toBeTruthy();
    expect(getByTestId("icon-flame")).toBeTruthy();
    expect(getByTestId("app-name")).toBeTruthy();
  });

  it("renders correctly with proper content", () => {
    const { getByTestId, getByText } = render(<Header />);

    // Check if the flame icon is rendered
    const flameIcon = getByTestId("icon-flame");
    expect(flameIcon).toBeTruthy();

    // Check if the display name text is rendered with correct content
    const displayName = getByText(i18n.t("CFBundleDisplayName"));
    expect(displayName).toBeTruthy();
  });
});
