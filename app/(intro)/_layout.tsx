import React from "react";
import { useStore } from "@/store";
import { Redirect, Stack } from "expo-router";

const IntroLayout = () => {
  const session = useStore((state) => state);

  if (session.isSignout || !session.token) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect key="signin" href="/signin" />;
  }
  return <Stack screenOptions={{ headerShown: false }} />;
};

export default IntroLayout;
