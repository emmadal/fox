import { View, Text } from "react-native";
import { Link } from "expo-router";
import i18n from "@/i18n";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginSchema } from "@/constants/Schema";
import Button from "@/components/Button";
import Input from "@/components/Input";

type Inputs = z.infer<typeof loginSchema>;

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
    reValidateMode: "onChange",
  });

  const handleLogin = (data: Inputs) => {
    console.log("Login:", data);
  };

  return (
    <View
      className="flex-1 justify-center px-5 dark:bg-black"
      testID="login-page"
    >
      <Text className="text-black font-bold text-3xl dark:text-white">
        {i18n.t("welcomeback")}
      </Text>
      <Text className="text-black font-normal text-lg dark:text-white">
        {i18n.t("foxdesc")}
      </Text>

      <View className="mt-10 gap-5">
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
        <Link
          href="/reset-password"
          className="text-right text-primary-1000 font-medium text-lg mt-3 mb-5"
        >
          {i18n.t("forgotpassword")}
        </Link>
        <Button
          text={i18n.t("login")}
          onPress={handleSubmit(handleLogin)}
          loading={isSubmitting}
        />
        <View className="mt-7 items-center flex-row justify-center gap-3">
          <Text className="text-black font-normal text-lg text-center dark:text-white">
            {i18n.t("newtofox")}
          </Text>
          <Link
            href="/signup"
            className="text-right text-primary-1000 font-medium text-lg"
          >
            {i18n.t("signup")}
          </Link>
        </View>
      </View>
    </View>
  );
}
