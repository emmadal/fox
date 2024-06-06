import React, { startTransition, useState } from "react";
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
  Alert,
  ScrollView,
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
import { Link, router } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { register } from "@/api";
import { useStore } from "@/store";

type Inputs = z.infer<typeof registerSchema>;
const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const Page = () => {
  const fn = useStore((state) => state);
  const [date, setDate] = useState<Date>(new Date(1960, 0, 1));
  const [show, setShow] = useState(false);
  const {
    handleSubmit,
    control,
    setValue,
    setError,
    reset,
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
    setDate(selectedDate!);
    setValue("birth_date", selectedDate?.toLocaleDateString("fr")!);
    setShow(false);
  };

  // Android date picker
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

  // send data to the API
  const mutation = useMutation({
    mutationFn: async (input: Inputs) => {
      const response = await register(input);
      return response;
    },
    onSuccess: async (data) => {
      if (!data.status) {
        Alert.alert(data.message);
        setError("root", {
          message: data.message,
        });
        return;
      }
      startTransition(() => {
        reset();
        fn.updateToken(data.data?.token);
        fn.updateProfile(data.data?.user);
        router.replace("/bio");
      });
    },
    onError: (error) => {
      Alert.alert(error.message);
    },
  });

  const handleForm = (input: Inputs) => {
    mutation.mutate({
      ...input,
      birth_date: date,
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboard}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={styles.scroll}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ContainerStyle}
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
                    label={i18n.t("full_name")}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="full_name"
              />
              <ThemedText type="default" style={styles.error}>
                {errors?.full_name?.message}
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
              loading={mutation.isPending || isSubmitting || isLoading}
              disabled={mutation.isPending || isSubmitting || isLoading}
              style={styles.btn}
            />

            <ThemedText type="defaultSemiBold" style={styles.footer}>
              {i18n.t("alreadyaccount")}{" "}
              <ThemedText type="link">
                <Link href="/signin">{i18n.t("signin")}</Link>
              </ThemedText>
            </ThemedText>
          </ThemedView>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  ContainerStyle: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.select({
      ios: 55,
      android: 30,
    }),
  },
  viewInput: {
    marginVertical: 3,
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
    marginBottom: 23,
  },
  footer: {
    marginVertical: 25,
    textAlign: "right",
  },
  image: {
    height: 100,
    width: 100,
  },
  errorsignup: {
    color: "red",
    fontSize: 15,
    marginTop: 10,
    textAlign: "center",
  },
});

export default Page;
