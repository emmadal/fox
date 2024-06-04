import React, { useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image } from "expo-image";
import { getLocales } from "expo-localization";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { registerSchema } from "@/schema";
import { ThemedText } from "@/components/ThemedText";
import { Input } from "@/components/Input";
import Button from "@/components/Button";
import z from "zod";
import i18n from "@/i18n";
import DateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import { ExternalLink } from "@/components/ExternalLink";
import { Link } from "expo-router";

type Inputs = z.infer<typeof registerSchema>;
const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const Page = () => {
  const [date, setDate] = useState<Date>(new Date(1960, 0, 1));
  const [show, setShow] = useState(false);
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, isLoading, isSubmitting },
  } = useForm<Inputs>({
    mode: "onChange",
    resolver: zodResolver(registerSchema),
    reValidateMode: "onChange",
  });

  const onChangeDate = async (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined,
  ) => {
    const currentDate = selectedDate;
    setDate(currentDate!);
    setValue("birth_date", currentDate?.toLocaleDateString("fr")!);
    setShow(false);
  };

  const showAndroidDate = () => {
    DateTimePickerAndroid.open({
      testID: "datePicker",
      display: "default",
      value: date,
      onChange: onChangeDate,
      mode: "date",
      is24Hour: true,
      maximumDate: new Date(2006, 0, 1),
      minimumDate: new Date(1960, 0, 1),
    });
  };

  const handleForm = (input: Inputs) => {
    console.log(input);
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboard}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ThemedView lightColor="transparent" style={styles.container}>
          <Image
            style={styles.image}
            source={require("@/assets/images/icon.png")}
            placeholder={{ blurhash }}
            contentFit="cover"
            transition={1000}
            alt="logo"
            aria-label="logo"
            cachePolicy="memory"
          />
          <ThemedView
            lightColor="transparent"
            darkColor="transparent"
            style={styles.header}
          >
            <ThemedText type="title">{i18n.t("joinnow")}</ThemedText>
            <ThemedText type="default">{i18n.t("foxdesc")}</ThemedText>
          </ThemedView>
          <ThemedView
            lightColor="transparent"
            darkColor="transparent"
            style={styles.viewInput}
          >
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label={i18n.t("email")}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="email"
            />
            <ThemedText type="default" style={styles.error}>
              {errors?.email?.message}
            </ThemedText>
          </ThemedView>
          <ThemedView
            lightColor="transparent"
            darkColor="transparent"
            style={styles.viewInput}
          >
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label={i18n.t("username")}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="username"
            />
            <ThemedText type="default" style={styles.error}>
              {errors?.username?.message}
            </ThemedText>
          </ThemedView>
          <ThemedView
            lightColor="transparent"
            darkColor="transparent"
            style={styles.viewInput}
          >
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label={i18n.t("birth_date")}
                  onBlur={onBlur}
                  // onChangeText={onChange}
                  value={value}
                  onPress={() => {
                    Platform.select({
                      android: showAndroidDate(),
                      ios: setShow(!show),
                    });
                  }}
                />
              )}
              name="birth_date"
            />
            {show && Platform.OS === "ios" ? (
              <DateTimePicker
                testID="datePicker"
                value={date}
                mode="date"
                is24Hour={true}
                onChange={onChangeDate}
                display="spinner"
                locale={getLocales()[0]?.languageCode || "en"}
              />
            ) : null}
            <ThemedText type="default" style={styles.error}>
              {errors?.birth_date?.message}
            </ThemedText>
          </ThemedView>
          <ThemedView
            lightColor="transparent"
            darkColor="transparent"
            style={styles.viewInput}
          >
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label={i18n.t("password")}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secure
                />
              )}
              name="password"
            />
            <ThemedText style={styles.error} type="default">
              {errors?.password?.message}
            </ThemedText>
          </ThemedView>
          <ThemedText type="defaultSemiBold" style={styles.terms}>
            {i18n.t("rulesprivacy")}{" "}
            <ThemedText type="link">
              <ExternalLink href="https://docs.expo.dev/router/introduction">
                <ThemedText type="link">{i18n.t("privacypolicy")}</ThemedText>
              </ExternalLink>
            </ThemedText>{" "}
            {i18n.t("and")}{" "}
            <ThemedText type="link">
              <ExternalLink href="https://docs.expo.dev/router/introduction">
                <ThemedText type="link">{i18n.t("cookies")}</ThemedText>
              </ExternalLink>
            </ThemedText>
          </ThemedText>
          <Button
            title={i18n.t("joinnow")}
            onPress={handleSubmit(handleForm)}
            loading={isSubmitting || isLoading}
            style={styles.btn}
          />
          <ThemedText type="defaultSemiBold" style={styles.footer}>
            {i18n.t("alreadyaccount")}{" "}
            <ThemedText type="link">
              <Link href="/">{i18n.t("signin")}</Link>
            </ThemedText>
          </ThemedText>
        </ThemedView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.select({
      ios: 65,
      android: 33,
    }),
  },
  viewInput: {
    marginVertical: 5,
    backgroundColor: "transparent",
  },
  error: {
    color: "red",
    fontSize: 15,
  },
  header: {
    marginBottom: 20,
  },
  btn: {
    alignSelf: "center",
    width: Dimensions.get("window").width / 1.8,
  },
  terms: {
    marginBottom: 25,
  },
  footer: {
    marginTop: 35,
    textAlign: "right",
  },
  image: {
    height: 100,
    width: 100,
  },
});

export default Page;
