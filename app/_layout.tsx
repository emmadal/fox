import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import {
  QueryClient,
  QueryClientProvider,
  focusManager,
  onlineManager,
} from "@tanstack/react-query";
import { AppState, Platform, type AppStateStatus } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import * as Network from "expo-network";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import "../global.css";
import { Drawer } from "expo-router/drawer";
import { DrawerMenu } from "@/components/DrawerMenu";
import { useStore } from "@/store";
import { user } from "@/data/about";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Create a client
const queryClient = new QueryClient();

// Subscribe to app state changes
function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

export default function RootLayout() {
  const { getProfile } = useStore();
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  // Online status management
  onlineManager.setEventListener((setOnline) => {
    const subscription = Network.addNetworkStateListener((state) => {
      setOnline(state.isConnected as boolean);
    });
    return () => subscription.remove();
  });

  // Hide the splash screen once fonts are loaded
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      getProfile(user, "token");
    }
  }, [getProfile, loaded]);

  // Subscribe to app state changes
  useEffect(() => {
    const subscription = AppState.addEventListener("change", onAppStateChange);
    return () => subscription.remove();
  }, []);

  // Prevent the splash screen from auto-hiding before asset loading is complete
  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Drawer
            drawerContent={(props) => <DrawerMenu {...props} />}
            screenOptions={{
              headerShown: false,
              drawerPosition: "right",
            }}
            detachInactiveScreens
          >
            <Drawer.Screen
              name="(auth)"
              options={{ drawerItemStyle: { display: "none" } }}
            />
            <Drawer.Screen
              name="(home)"
              options={{ drawerItemStyle: { display: "none" } }}
            />
            <Drawer.Screen
              name="+not-found"
              options={{ drawerItemStyle: { display: "none" } }}
            />
          </Drawer>
        </GestureHandlerRootView>
        <StatusBar style="auto" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
