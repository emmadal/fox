import React from "react";
import { StyleSheet, Dimensions, Platform, useColorScheme } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { Image } from "expo-image";
import { ThemedText } from "@/components/ThemedText";
import Button from "@/components/Button";
import i18n from "@/i18n";
import { Link, router } from "expo-router";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const Index = () => {
  const colorScheme = useColorScheme();
  const image =
    colorScheme === "light"
      ? require("@/assets/images/people.svg")
      : require("@/assets/images/people_light.svg");
  return (
    <ThemedView lightColor="transparent" style={styles.container}>
      <Image
        style={styles.image}
        source={image}
        placeholder={{ blurhash }}
        contentFit="cover"
        transition={1000}
        alt="people"
        aria-label="logo"
        cachePolicy="memory"
      />
      <ThemedView
        lightColor="transparent"
        darkColor="transparent"
        style={styles.header}
      >
        <ThemedText type="subtitle" style={styles.title}>
          {i18n.t("onboardingtitle")}
        </ThemedText>
        <ThemedText type="default" style={styles.subtitle}>
          {i18n.t("onboardingdesc")}
        </ThemedText>
      </ThemedView>
      <ThemedView
        lightColor="transparent"
        darkColor="transparent"
        style={styles.bottom}
      >
        <ThemedText type="defaultSemiBold">
          <ThemedText type="link">
            <Link href="/signin">{i18n.t("signin")}</Link>
          </ThemedText>
        </ThemedText>

        <Button
          title={i18n.t("getstarted")}
          onPress={() => router.navigate("/register")}
          style={styles.btn}
        />
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  title: {
    lineHeight: 40,
    fontWeight: "bold",
    marginTop: 28,
  },
  subtitle: {
    marginTop: 20,
    lineHeight: 30,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: Dimensions.get("window").height / 10,
  },
  viewInput: {
    marginVertical: 10,
    backgroundColor: "transparent",
  },
  header: {
    marginBottom: 20,
  },
  bottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  btn: {
    width: Dimensions.get("window").width / 2.3,
  },
  footer: {
    marginTop: 50,
  },
  image: {
    aspectRatio: 1,
    height: 280,
    alignSelf: "center",
  },
});

export default Index;
