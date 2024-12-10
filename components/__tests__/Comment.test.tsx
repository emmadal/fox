import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Comment from "../Comment";
import moment from "moment";

jest.mock("@expo/vector-icons/MaterialCommunityIcons", () => "Icon");

describe("Comment Component", () => {
  const mockProps = {
    username: "John Doe",
    userAvatar: "https://example.com/avatar.jpg",
    comment: "This is a sample comment",
    likes: 10,
    reply: 5,
    createdAt: new Date().toISOString(),
  };

  it("renders correctly with given props", () => {
    const { getByTestId, getByText } = render(<Comment {...mockProps} />);

    // Check if avatar is rendered
    expect(getByTestId("comment-avatar")).toBeTruthy();

    // Check if username is rendered
    expect(getByText(mockProps.username)).toBeTruthy();

    // Check if comment text is rendered
    expect(getByText(mockProps.comment)).toBeTruthy();

    // Check if likes count is displayed
    expect(getByText(mockProps.likes.toString())).toBeTruthy();

    // Check if reply count is displayed
    expect(getByText(mockProps.reply.toString())).toBeTruthy();

    // Check if date is displayed correctly
    expect(getByTestId("comment-date").props.children).toBeTruthy();
  });

  it("renders the correct time format using moment.js", () => {
    const { getByTestId } = render(<Comment {...mockProps} />);
    const displayedDate = getByTestId("comment-date").props.children;

    // Verify if the displayed date matches the format of "moment.fromNow(true)"
    const formattedDate = moment(mockProps.createdAt)
      .locale("en")
      .fromNow(true);
    expect(displayedDate).toEqual(formattedDate);
  });

  it("handles like and reply button presses", () => {
    const { getByTestId } = render(<Comment {...mockProps} />);

    // Simulate press events for like and reply buttons
    const likeButton = getByTestId("like-button");
    const replyButton = getByTestId("reply-button");

    fireEvent.press(likeButton);
    fireEvent.press(replyButton);

    // Note: Currently, no state changes are implemented for these buttons,
    // so we just confirm their presence and usability.
    expect(likeButton).toBeTruthy();
    expect(replyButton).toBeTruthy();
  });
});
