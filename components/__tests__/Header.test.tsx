import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Header } from "../Header";
import * as NavigationHooks from "@react-navigation/native";
import * as ExpoRouter from "expo-router";

// Mock dependencies
jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: jest.fn(),
  DrawerActions: { openDrawer: jest.fn(() => ({ type: "OPEN_DRAWER" })) },
}));

jest.mock("@expo/vector-icons/Octicons", () => {
  return {
    __esModule: true,
    default: ({ testID }: { testID: string }) => {
      const { View } = require("react-native");
      return <View testID={testID} />;
    },
  };
});

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/data/notif", () => ({
  notifs: [],
}));

jest.mock("@/i18n", () => ({
  t: jest.fn(() => "TestApp"),
}));

describe("Header Component", () => {
  let mockNavigation: any;
  let mockRouter: any;

  beforeEach(() => {
    // Reset mocks before each test
    mockNavigation = {
      dispatch: jest.fn(),
    };
    mockRouter = {
      navigate: jest.fn(),
    };

    (NavigationHooks.useNavigation as jest.Mock).mockReturnValue(
      mockNavigation,
    );
    (ExpoRouter.useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  const renderComponent = () => {
    return render(
      <NavigationContainer>
        <Header />
      </NavigationContainer>,
    );
  };

  it("renders the app name correctly", () => {
    const { getByTestId } = renderComponent();

    const appNameElement = getByTestId("app-name");
    expect(appNameElement).toBeTruthy();
    expect(appNameElement.props.children).toBe("TestApp");
  });

  it("renders flame icon", () => {
    const { getByTestId } = renderComponent();

    const flameIcon = getByTestId("icon-flame");
    expect(flameIcon).toBeTruthy();
  });

  it("navigates to notification screen when bell icon is pressed", () => {
    const { getByTestId } = renderComponent();

    const notificationButton = getByTestId("notification-button");
    fireEvent.press(notificationButton);

    expect(mockRouter.navigate).toHaveBeenCalledWith("/(home)/notification");
  });

  it("opens drawer when hamburger icon is pressed", () => {
    const { getByTestId } = renderComponent();

    const drawerButton = getByTestId("drawer-button");
    fireEvent.press(drawerButton);

    expect(mockNavigation.dispatch).toHaveBeenCalledWith({
      type: "OPEN_DRAWER",
    });
  });

  describe("Notification Badge", () => {
    it("does not render badge when no notifications", () => {
      (require("@/data/notif").notifs as jest.Mocked<any[]>) = [];

      const { queryByText } = renderComponent();

      expect(queryByText("10+")).toBeNull();
    });

    it("renders badge with correct number of notifications", () => {
      (require("@/data/notif").notifs as jest.Mocked<any[]>) = [1, 2, 3];

      const { getByText } = renderComponent();

      expect(getByText("3")).toBeTruthy();
    });

    it('renders "10+" when notifications exceed 10', () => {
      (require("@/data/notif").notifs as jest.Mocked<any[]>) = new Array(
        15,
      ).fill(null);

      const { getByText } = renderComponent();

      expect(getByText("10+")).toBeTruthy();
    });
  });
});
