import React, { useEffect } from "react";
import Input from "@/components/Input";
import ParallaxScroll from "@/components/ParallaxScroll";
import { editProfileSchema } from "@/constants/Schema";
import i18n from "@/i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { z } from "zod";
import { useStore } from "@/store";
import Icon from "@expo/vector-icons/Ionicons";
import { Entypo } from "@expo/vector-icons";
import { Image } from "expo-image";
import FilePicker from "@/components/FilePicker";
import { openCamera } from "@/utils/openCamera";
import { takePhoto } from "@/utils/takePhoto";
import { useNavigation } from "expo-router";

type Inputs = z.infer<typeof editProfileSchema>;

const EditProfile = () => {
  const { user } = useStore();
  const [image, setImage] = React.useState<string | null>(null);
  const colorScheme = useColorScheme();
  const [visible, setVisible] = React.useState(false);
  const onOpenModal = () => setVisible(true);
  const onCloseModal = () => setVisible(false);
  const onRemoveImage = () => setImage(null);
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onChange",
    resolver: zodResolver(editProfileSchema),
    reValidateMode: "onChange",
    defaultValues: {
      name: user?.name || "",
      website: user?.website || "",
      biography: user?.biography || "",
      location: user?.location || "",
      avatar_url: user?.avatar_url || "",
    },
  });

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={handleSubmit(handleEditProfile)}
          className="bg-transparent border dark:border-white border-gray-400 px-5 rounded-full border-1"
        >
          <Text className="text-black dark:text-white text-lg font-medium">
            {i18n.t("save")}
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [handleSubmit, navigation]);

  const handleEditProfile = (data: Inputs) => {
    console.log("Edit profile:", data);
  };

  const onOpenCamera = async () => {
    const result = await openCamera();
    setImage(result?.assets?.[0]?.uri!);
    setVisible(false);
  };

  const onTakePhoto = async () => {
    const result = await takePhoto();
    setVisible(false);
    setImage(result?.assets?.[0]?.uri!);
  };

  return (
    <ParallaxScroll>
      <FilePicker
        isVisible={visible}
        onClose={onCloseModal}
        onOpenCamera={onOpenCamera}
        onTakePhoto={onTakePhoto}
      />
      <View className="flex-row items-center gap-10">
        <TouchableOpacity
          className="relative mb-5 ios:mt-5"
          onPress={onOpenModal}
        >
          <Image
            source={{ uri: user.avatar_url }}
            cachePolicy="memory"
            className="mb-5"
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              opacity: 0.3,
              borderColor: colorScheme === "light" ? "black" : "white",
              borderWidth: 0.3,
            }}
          />
          <Icon
            name="camera-outline"
            size={40}
            color={colorScheme === "light" ? "black" : "white"}
            className="absolute bottom-1/3 left-9"
          />
        </TouchableOpacity>
        {image && (
          <View className="flex-row items-center gap-7">
            <Entypo name="arrow-long-right" size={35} color="green" />
            <Image
              source={{ uri: image }}
              cachePolicy="memory"
              className="mb-5"
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                borderColor: colorScheme === "light" ? "black" : "white",
                borderWidth: 0.3,
              }}
            />
            <TouchableOpacity onPress={onRemoveImage}>
              <Icon name="trash-outline" size={30} color="rgb(248 113 113)" />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View className="gap-2">
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
                maxLength={50}
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
            name="website"
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label={i18n.t("website")}
                value={value!}
                onBlur={onBlur}
                maxLength={50}
                onChangeText={onChange}
                placeholder={i18n.t("website")}
                keyboardType="url"
              />
            )}
          />
          {errors.website && (
            <Text className="text-red-500 text-sm -mt-5">
              {errors.website.message}
            </Text>
          )}
        </View>
        <View className="gap-3">
          <Controller
            control={control}
            name="location"
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label={i18n.t("location")}
                value={value!}
                onBlur={onBlur}
                maxLength={50}
                onChangeText={onChange}
                placeholder={i18n.t("location")}
                keyboardType="default"
              />
            )}
          />
          {errors.location && (
            <Text className="text-red-500 text-sm -mt-5">
              {errors.location.message}
            </Text>
          )}
        </View>
        <View className="gap-3 flex-1">
          <Controller
            control={control}
            name="biography"
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label={i18n.t("yourbio")}
                value={value!}
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder={i18n.t("yourbio")}
                keyboardType="default"
                textarea
                maxLength={200}
              />
            )}
          />
          {errors.biography && (
            <Text className="text-red-500 text-s -mt-5">
              {errors.biography.message}
            </Text>
          )}
        </View>
      </View>
    </ParallaxScroll>
  );
};

export default EditProfile;
