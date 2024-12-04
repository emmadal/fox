import { View, Text, ScrollView } from "react-native";
import { Link } from "expo-router";
import { registerSchema } from "@/constants/Schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import Input from "@/components/Input";
import i18n from "@/i18n";
import Button from "@/components/Button";
import { ExternalLink } from "@/components/ExternalLink";

type Inputs = z.infer<typeof registerSchema>;

export default function SignUp() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    mode: "onChange",
    resolver: zodResolver(registerSchema),
    reValidateMode: "onChange",
  });

  const handleSignUp = (data: Inputs) => {
    // Implement sign up logic here
    console.log("Sign up:", data);
  };

  return (
    <ScrollView
      className="flex-1 px-5 dark:bg-black android:pt-10"
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
      }}
    >
      <Text className="text-black font-bold text-3xl dark:text-white">
        {i18n.t("joinnow")}
      </Text>
      {/* <Text className="text-black font-normal text-lg dark:text-white">
        {i18n.t("foxdesc")}
      </Text> */}

      <View className="mt-10 gap-5">
        <View className="gap-3">
          <Controller
            control={control}
            name="username"
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label={i18n.t("username")}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder={i18n.t("username")}
                keyboardType="default"
              />
            )}
          />
          {errors.username && (
            <Text className="text-red-500 text-sm -mt-5">
              {errors.username.message}
            </Text>
          )}
        </View>

        <View className="gap-3">
          <Controller
            control={control}
            name="name"
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label={i18n.t("full_name")}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder={i18n.t("full_name")}
                keyboardType="default"
              />
            )}
          />
          {errors.name && (
            <Text className="text-red-500 text-sm -mt-5">
              {errors.name.message}
            </Text>
          )}
        </View>

        <View className="gap-3">
          <Controller
            control={control}
            name="email"
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label={i18n.t("email")}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder={i18n.t("email")}
                keyboardType="email-address"
              />
            )}
          />
          {errors.email && (
            <Text className="text-red-500 text-sm -mt-5">
              {errors.email.message}
            </Text>
          )}
        </View>

        <View className="gap-3">
          <Controller
            control={control}
            name="password"
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label={i18n.t("password")}
                value={value}
                onBlur={onBlur}
                maxLength={20}
                onChangeText={onChange}
                placeholder={i18n.t("password")}
                secureTextEntry
              />
            )}
          />
          {errors.password && (
            <Text className="text-red-500 text-s -mt-5">
              {errors.password.message}
            </Text>
          )}
        </View>

        <Text className="text-sm text-black dark:text-white">
          {i18n.t("rulesprivacy")}{" "}
          <Text className="text-primary-1000 font-medium text-sm">
            <ExternalLink href="https://docs.expo.dev/router/introduction">
              {i18n.t("privacypolicy")}
            </ExternalLink>
          </Text>
        </Text>

        <Button
          text={i18n.t("signup")}
          onPress={handleSubmit(handleSignUp)}
          loading={isSubmitting}
        />
        <View className="items-center flex-row justify-center gap-3">
          <Text className="text-black font-normal text-lg text-center dark:text-white">
            {i18n.t("alreadyaccount")}
          </Text>
          <Link
            href="/login"
            className="text-right text-primary-1000 font-medium text-lg"
          >
            {i18n.t("login")}
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}
