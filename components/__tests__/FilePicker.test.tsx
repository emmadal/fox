import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import FilePicker from "../FilePicker";

// Mock Feather Icons
jest.mock("@expo/vector-icons/Feather", () => {
  return {
    __esModule: true,
    default: ({ testID }: { testID: string }) => {
      const { View } = require("react-native");
      return <View testID={testID} />;
    },
  };
});

// Mock i18n
jest.mock("@/i18n", () => ({
  t: (key: string) => key,
}));

describe("FilePicker Component", () => {
  const mockProps = {
    isVisible: true,
    onClose: jest.fn(),
    onOpenCamera: jest.fn(),
    onTakePhoto: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly when visible", () => {
    const { getByTestId, toJSON } = render(<FilePicker {...mockProps} />);

    expect(toJSON()).toMatchSnapshot();
    expect(getByTestId("file-picker-modal")).toBeTruthy();
    expect(getByTestId("file-picker-backdrop")).toBeTruthy();
    expect(getByTestId("camera-button")).toBeTruthy();
    expect(getByTestId("photo-button")).toBeTruthy();
  });

  it("does not render when not visible", () => {
    const { queryByTestId } = render(
      <FilePicker {...mockProps} isVisible={false} />,
    );

    expect(queryByTestId("file-picker-modal")).toBeFalsy();
  });

  it("calls onClose when backdrop is pressed", () => {
    const { getByTestId } = render(<FilePicker {...mockProps} />);

    fireEvent.press(getByTestId("file-picker-backdrop"));
    expect(mockProps.onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onOpenCamera when camera button is pressed", () => {
    const { getByTestId } = render(<FilePicker {...mockProps} />);

    fireEvent.press(getByTestId("camera-button"));
    expect(mockProps.onOpenCamera).toHaveBeenCalledTimes(1);
  });

  it("calls onTakePhoto when photo button is pressed", () => {
    const { getByTestId } = render(<FilePicker {...mockProps} />);

    fireEvent.press(getByTestId("photo-button"));
    expect(mockProps.onTakePhoto).toHaveBeenCalledTimes(1);
  });
});
