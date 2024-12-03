import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { Header } from "../Header";
import { DrawerActions } from "@react-navigation/native";

// Mock Navigation
jest.mock("@react-navigation/native", () => {
  const actualNavigation = jest.requireActual("@react-navigation/native");
  return {
    ...actualNavigation,
    useNavigation: jest.fn(() => ({
      navigate: jest.fn(),
      dispatch: jest.fn(),
    })),
    DrawerActions: {
      openDrawer: jest.fn(),
    },
  };
});

jest.mock("@expo/vector-icons/Octicons", () => {
  return {
    __esModule: true,
    default: ({ testID }: { testID: string }) => {
      const { View } = require("react-native");
      return <View testID={testID} />;
    },
  };
});

describe("Header Component", () => {
  it("drawer button renders correctly", () => {
    const { toJSON } = render(
      <NavigationContainer>
        <Header />
      </NavigationContainer>,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("displays the flame icon, app name, bell icon and three-bars icon", () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <Header />
      </NavigationContainer>,
    );

    expect(getByTestId("icon-flame")).toBeTruthy();
    expect(getByTestId("app-name")).toBeTruthy();
    expect(getByTestId("icon-bell")).toBeTruthy();
    expect(getByTestId("icon-gear")).toBeTruthy();
  });

  it("dispatches the drawer action when the button is pressed", () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <Header />
      </NavigationContainer>,
    );

    fireEvent.press(getByTestId("drawer-button"));
    expect(DrawerActions.openDrawer).toHaveBeenCalled();
  });

  it("dispatches the notification action when the button is pressed", () => {
    const navigateMock = jest.fn();
    (useNavigation as jest.Mock).mockReturnValue({
      navigate: navigateMock,
    });

    const { getByTestId } = render(
      <NavigationContainer>
        <Header />
      </NavigationContainer>,
    );

    fireEvent.press(getByTestId("notification-button"));

    expect(navigateMock).toHaveBeenCalledWith("(home)", {
      screen: "notification",
    });
  });
});
