import { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  AppState,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Ionicons } from "@expo/vector-icons/";
import * as MediaLibrary from "expo-media-library";
import i18n from "@/i18n";
import {
  CameraView,
  CameraType,
  useCameraPermissions,
  useMicrophonePermissions,
  CameraMode,
} from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import { useRouter } from "expo-router";

const NoCamera = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-lg text-center">{i18n.t("nocamera")}</Text>
    </View>
  );
};
export default function RecordVideo() {
  const router = useRouter();
  const [facing, setFacing] = useState<CameraType>("back");
  const [mode, setMode] = useState<CameraMode>("video");
  const [torch, setTorch] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const camera = useRef<CameraView>(null);
  const isFocused = useIsFocused();
  const appState = AppState.currentState;
  const isActive = isFocused && appState === "active";
  const [microphoneStatus, requestMicrophonePermission] =
    useMicrophonePermissions();
  const [cameraStatus, requestCameraPermission] = useCameraPermissions();
  const [permissionResponse, requestLibraryPermission] =
    MediaLibrary.usePermissions();

  const flipCamera = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };
  const handleTorch = () => setTorch(!torch);
  const handleMode = () => setMode(mode === "video" ? "picture" : "video");
  const goBack = () => router.back();

  // Request permissions when the component mounts
  useEffect(() => {
    (async () => {
      if (!cameraStatus?.granted) {
        await requestCameraPermission();
      }
      if (!microphoneStatus?.granted) {
        await requestMicrophonePermission();
      }
      if (!permissionResponse?.granted) {
        await requestLibraryPermission();
      }
    })();
  }, []);

  // Cleanup active recordings when the component unmounts
  useEffect(() => {
    const currentCamera = camera.current;
    return () => {
      if (currentCamera && isRecording && !isActive) {
        currentCamera.stopRecording();
      }
    };
  }, [isActive, isRecording]);

  // Start recording when the user presses the record button
  const startRecording = async () => {
    if (camera.current && !isRecording) {
      setIsRecording(true);
      try {
        const video = await camera.current.recordAsync({
          maxFileSize: 10 * 1024 * 1024, // 10MB
        });
        if (!video?.uri) {
          Alert.alert(i18n.t("error"), i18n.t("recordederror"));
          return;
        }
        await MediaLibrary.saveToLibraryAsync(video?.uri!);
      } catch (e: any) {
        console.error(e);
        Alert.alert(i18n.t("error"), i18n.t("recordederror"));
      }
    }
  };

  // Take a picture when the user presses the camera button
  const takePicture = async () => {
    if (camera.current) {
      try {
        const photo = await camera.current.takePictureAsync({
          quality: 1,
          exif: true,
        });
        if (!photo?.uri) {
          Alert.alert(i18n.t("error"), i18n.t("uploaderror"));
          return;
        }
        await MediaLibrary.saveToLibraryAsync(photo?.uri!);
      } catch (e: any) {
        console.error(e);
        Alert.alert(i18n.t("error"), i18n.t("uploaderror"));
      }
    }
  };

  // Stop recording when the user presses the stop button
  const stopRecording = async () => {
    if (camera.current && isRecording) {
      await camera.current.stopRecording();
      setIsRecording(false);
    }
  };

  if (
    !cameraStatus?.granted ||
    !microphoneStatus?.granted ||
    !permissionResponse?.granted
  ) {
    return <NoCamera />;
  }
  return (
    <View className="flex-1">
      <CameraView
        style={StyleSheet.absoluteFill}
        facing={facing}
        ref={camera}
        videoQuality="720p"
        videoStabilizationMode="auto"
        active={isActive}
        enableTorch={torch}
        mode={mode}
      >
        {isRecording && mode === "video" ? (
          <TouchableOpacity
            onPress={stopRecording}
            className="bg-transparent absolute bottom-14 right-[calc(50%-30px)] self-center border-red-500"
          >
            <Ionicons name="stop-circle-outline" size={50} color="red" />
          </TouchableOpacity>
        ) : mode === "video" ? (
          <TouchableOpacity
            onPress={startRecording}
            className="bg-transparent absolute bottom-14 right-[calc(50%-30px)] self-center"
          >
            <Icon name="record-circle-outline" size={50} color="white" />
          </TouchableOpacity>
        ) : mode === "picture" ? (
          <TouchableOpacity
            onPress={takePicture}
            className="bg-transparent absolute bottom-14 right-[calc(50%-30px)] self-center"
          >
            <Icon name="camera-outline" size={50} color="white" />
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity
          onPress={goBack}
          className="bg-transparent absolute top-20 left-7"
        >
          <Icon name="close-circle-outline" size={35} color="white" />
        </TouchableOpacity>
        <View className="flex-1 flex-col absolute top-20 right-5 gap-7">
          <TouchableOpacity
            onPress={handleMode}
            className="bg-zinc-500 h-10 w-10 rounded-full items-center justify-center"
          >
            <Icon
              name={mode === "video" ? "image" : "camera-iris"}
              size={20}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={flipCamera}
            className="bg-zinc-500 h-10 w-10 rounded-full items-center justify-center"
          >
            <Icon name="camera-switch" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleTorch}
            className="bg-zinc-500 h-10 w-10 rounded-full items-center justify-center"
          >
            <Icon
              name={torch ? "flashlight" : "flashlight-off"}
              size={20}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            className="bg-zinc-500 h-10 w-10 rounded-full items-center justify-center"
          >
            <Icon name="music" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            className="bg-zinc-500 h-10 w-10 rounded-full items-center justify-center"
          >
            <Icon name="format-color-text" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            className="bg-zinc-500 h-10 w-10 rounded-full items-center justify-center"
          >
            <Icon name="sticker-emoji" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}
