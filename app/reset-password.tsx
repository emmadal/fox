import { View, Text } from "react-native";
import { router } from "expo-router";
import i18n from "@/i18n";
import { Controller, useForm } from "react-hook-form";
import Input from "@/components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "@/constants/Schema";
import { z } from "zod";
import Button from "@/components/Button";

type Inputs = z.infer<typeof resetPasswordSchema>;

export default function ResetPassword() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    mode: "onChange",
    resolver: zodResolver(resetPasswordSchema),
    reValidateMode: "onChange",
  });

  const handleResetPassword = (data: Inputs) => {
    // Implement password reset logic here
    // Show success message and navigate back
    console.log("Password reset:", data);
    router.back();
  };

  return (
    <View
      className="flex-1 justify-center px-5 dark:bg-black"
      testID="reset-password-page"
    >
      <Text className="text-black font-bold text-3xl dark:text-white">
        {i18n.t("resetpassword")}
      </Text>
      <Text className="text-black font-normal text-lg dark:text-white">
        {i18n.t("findfoxaccountdesc")}
      </Text>

      <View className="gap-5">
        <View className="mt-10">
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
            <Text className="text-red-500 text-sm">{errors.email.message}</Text>
          )}
        </View>
        <Button
          text={i18n.t("resetpassword")}
          onPress={handleSubmit(handleResetPassword)}
          loading={isSubmitting}
        />
      </View>
    </View>
  );
}
