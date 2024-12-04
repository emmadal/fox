import React from "react";
import { render } from "@testing-library/react-native";
import Avatar from "../Avatar"; // Adjust the path to your component
import i18n from "@/i18n";

// Mock expo-image globally
jest.mock("expo-image", () => ({
  ...jest.requireActual("expo-image"),
  useImage: jest.fn(),
}));

describe("Avatar Component", () => {
  beforeEach(() => {
    const { useImage } = require("expo-image");
    useImage.mockReset(); // Reset mocks between tests
  });

  it("renders correctly (snapshot)", () => {
    const { toJSON } = render(<Avatar source="https://unavatar.io/johndoe" />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders loading text when image is not ready", () => {
    const { useImage } = require("expo-image");
    useImage.mockReturnValue(null);
    const { getByText } = render(
      <Avatar source="https://unavatar.io/johndoe" />,
    );
    expect(getByText(i18n.t("loading"))).toBeTruthy();
  });

  it("renders image correctly when ready", () => {
    const { useImage } = require("expo-image");
    useImage.mockReturnValue(true); // Simulate image being loaded

    const { getByTestId } = render(
      <Avatar
        source="https://unavatar.io/johndoe"
        size={100}
        className="custom-class"
        position="center"
      />,
    );

    const avatarView = getByTestId("avatar-view");
    const avatarImage = getByTestId("avatar-image");

    expect(avatarView.props.style).toEqual(
      expect.arrayContaining([
        { width: 100, height: 100, alignSelf: "center" },
      ]),
    );

    // Access the first element in the array
    expect(avatarImage.props.source[0]).toEqual({
      uri: "https://unavatar.io/johndoe",
    });

    expect(avatarImage.props.style).toMatchObject({ width: 100, height: 100 });
  });

  it("applies the correct default position when no position is provided", () => {
    const { useImage } = require("expo-image");
    useImage.mockReturnValue(true);

    const { getByTestId } = render(
      <Avatar source="https://unavatar.io/johndoe" size={50} />,
    );
    const avatarView = getByTestId("avatar-view");

    expect(avatarView.props.style).toEqual(
      expect.arrayContaining([{ alignSelf: "auto", width: 50, height: 50 }]),
    );
  });
});
