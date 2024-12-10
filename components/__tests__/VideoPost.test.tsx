import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import VideoPost from "../VideoPost"; // Adjust path if necessary
import i18n from "@/i18n";

jest.mock("@expo/vector-icons/Feather", () => {
  // eslint-disable-next-line react/display-name
  return ({ name }: { name: string }) => {
    const { View } = require("react-native");
    return <View testID={`icon-${name}`} />;
  };
});

jest.mock("expo-image", () => ({
  Image: (props: any) => {
    const { View } = require("react-native");
    return <View {...props} testID="expo-image" />;
  },
}));

jest.mock("expo-video", () => ({
  useVideoPlayer: jest.fn().mockReturnValue({ play: jest.fn(), loop: true }),
  VideoView: (props: any) => {
    const { View } = require("react-native");
    return <View {...props} testID="video-view" />;
  },
}));

describe("VideoPost Component", () => {
  const mockProps = {
    username: "test_user",
    caption: "This is a test caption",
    videoUrl: "https://test.video/url.mp4",
    likes: 10,
    comments: 5,
    shares: 2,
    sponsored: true,
    userAvatar: "https://test.avatar/url.png",
    retweet: 3,
    openBottomSheet: jest.fn(),
  };

  it("renders the VideoPost component correctly", () => {
    render(<VideoPost {...mockProps} />);
    expect(screen.getByTestId("video-post")).toBeTruthy();
    expect(screen.getByText(`@${mockProps.username}`)).toBeTruthy();
    expect(screen.getByText(mockProps.caption)).toBeTruthy();
    expect(screen.getByTestId("video-view")).toBeTruthy();
  });

  it("displays correct like, comment, retweet, and share counts", () => {
    render(<VideoPost {...mockProps} />);
    expect(screen.getByText(mockProps.likes.toString())).toBeTruthy();
    expect(screen.getByText(mockProps.comments.toString())).toBeTruthy();
    expect(screen.getByText(mockProps.retweet.toString())).toBeTruthy();
    expect(screen.getByText(mockProps.shares.toString())).toBeTruthy();
  });

  it("shows the follow button", () => {
    render(<VideoPost {...mockProps} />);
    expect(screen.getByText(i18n.t("follow"))).toBeTruthy();
  });

  it("renders the sponsored button when sponsored is true", () => {
    render(<VideoPost {...mockProps} />);
    expect(screen.getByTestId("sponsored-button")).toBeTruthy();
  });

  it("hides the sponsored button when sponsored is false", () => {
    render(<VideoPost {...mockProps} sponsored={false} />);
    expect(screen.queryByTestId("sponsored-button")).toBeNull();
  });

  it("renders icons for actions", () => {
    render(<VideoPost {...mockProps} />);

    // Get all instances of each icon
    const heartIcons = screen.getAllByTestId("icon-heart");
    const messageIcons = screen.getAllByTestId("icon-message-circle");
    const repeatIcons = screen.getAllByTestId("icon-repeat");
    const shareIcons = screen.getAllByTestId("icon-share-2");

    // Assert at least one icon per type
    expect(heartIcons.length).toBeGreaterThan(0);
    expect(messageIcons.length).toBeGreaterThan(0);
    expect(repeatIcons.length).toBeGreaterThan(0);
    expect(shareIcons.length).toBeGreaterThan(0);
  });

  it("handles the settings icon press", () => {
    render(<VideoPost {...mockProps} />);
    const settingsIcons = screen.getAllByTestId("icon-settings");
    // Assuming only the last settings icon is actionable.
    const actionableSettingsIcon = settingsIcons[settingsIcons.length - 1];
    fireEvent.press(actionableSettingsIcon);
    // Add assertion if there’s any specific outcome
  });
  it("renders the VideoPost component correctly", () => {
    render(<VideoPost {...mockProps} />);
    expect(screen.getByTestId("video-post")).toBeTruthy();
  });
});
