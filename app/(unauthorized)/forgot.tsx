import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image } from "expo-image";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { resetPasswordSchema } from "@/schema";
import { ThemedText } from "@/components/ThemedText";
import { Input } from "@/components/Input";
import Button from "@/components/Button";
import z from "zod";
import i18n from "@/i18n";
import { Link } from "expo-router";

type Inputs = z.infer<typeof resetPasswordSchema>;
const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const Forget = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isLoading, isSubmitting },
  } = useForm<Inputs>({
    mode: "onChange",
    resolver: zodResolver(resetPasswordSchema),
    reValidateMode: "onChange",
  });

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
            <ThemedText type="title">{i18n.t("findfoxaccount")}</ThemedText>
            <ThemedText type="default">
              {i18n.t("findfoxaccountdesc")}
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
          <Button
            title={i18n.t("resetpassword")}
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
    paddingTop: Dimensions.get("window").height / 10,
  },
  viewInput: {
    marginVertical: 10,
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
    marginTop: 20,
  },
  footer: {
    marginTop: 50,
  },
  forgot: {
    marginBottom: 30,
  },
  image: {
    height: 130,
    width: 130,
    aspectRatio: 1,
    borderRadius: 100,
  },
});

export default Forget;
