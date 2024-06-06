import React, { startTransition } from "react";
import {
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  Alert,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Image } from "expo-image";
import i18n from "@/i18n";
import Button from "@/components/Button";
import { Link, router } from "expo-router";
import { z } from "zod";
import { profileSchema } from "@/schema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useStore } from "@/store";
import { TextArea } from "@/components/TextArea";
import { updateProfile } from "@/api";

type Input = z.infer<typeof profileSchema>;

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const BioPage = () => {
  const fn = useStore((state) => state);
  const {
    handleSubmit,
    control,
    setError,
    reset,
    formState: { errors, isLoading, isSubmitting },
  } = useForm<Input>({
    mode: "onChange",
    defaultValues: {
      id: fn.user?.id,
      photo: fn.user.photo,
      birth_date: new Date(fn.user.birth_date),
      certified: fn.user.certified,
      full_name: fn.user.full_name,
      email: fn.user.email,
    },
    resolver: zodResolver(profileSchema),
    reValidateMode: "onChange",
  });

  const mutation = useMutation({
    mutationFn: async (input: Input) => {
      const response = await updateProfile(input, fn.token);
      return response;
    },
    onSuccess: (data) => {
      if (!data.status) {
        setError("root", {
          message: data.message,
        });
        return;
      }
      startTransition(() => {
        fn.updateProfile(data?.data);
        reset();
        router.replace("/home");
      });
    },
    onError: (error) => {
      Alert.alert(error.message);
    },
  });

  const handleForm = async (input: Input) => {
    mutation.mutate({ ...input });
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
          <ThemedText type="defaultSemiBold" style={styles.title}>
            {i18n.t("intro")}
          </ThemedText>
          <ThemedText type="default" style={styles.desc}>
            {i18n.t("introdesc")}
          </ThemedText>
          <ThemedView
            lightColor="transparent"
            darkColor="transparent"
            style={styles.viewInput}
          >
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextArea
                  placeholder={i18n.t("yourbio")}
                  style={styles.textarea}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="email"
            />
            <ThemedText type="default" style={styles.error}>
              {errors?.biography?.message}
            </ThemedText>
          </ThemedView>
          <Button
            title={i18n.t("next")}
            onPress={handleSubmit(handleForm)}
            loading={mutation.isPending || isSubmitting || isLoading}
            disabled={mutation.isPending || isSubmitting || isLoading}
            style={styles.btn}
          />
          <ThemedText type="link" style={styles.skip}>
            <Link replace href="/home">
              {i18n.t("skipnow")}
            </Link>
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
  error: {
    color: "red",
    fontSize: 15,
  },
  viewInput: {
    marginVertical: 10,
    backgroundColor: "transparent",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: Dimensions.get("window").height / 10,
  },
  title: {
    fontSize: 19,
    textAlign: "center",
  },
  desc: {
    marginTop: 20,
    textAlign: "center",
  },
  image: {
    height: 100,
    width: 100,
    aspectRatio: 1,
    alignSelf: "center",
  },
  btn: {
    width: Dimensions.get("window").width / 1.5,
    marginTop: 50,
    alignSelf: "center",
  },
  skip: {
    marginTop: 50,
    textAlign: "center",
  },
  textarea: {
    marginTop: 30,
  },
});
export default BioPage;
