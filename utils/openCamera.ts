import {
  getCameraPermissionsAsync,
  requestCameraPermissionsAsync,
  launchCameraAsync,
  type ImagePickerResult,
} from "expo-image-picker";

/**
 * Open the camera and allow the user to take a photo
 */
export const openCamera = async (): Promise<ImagePickerResult> => {
  const permission = await getCameraPermissionsAsync();
  if (!permission.granted) {
    await requestCameraPermissionsAsync();
  }
  let result = await launchCameraAsync();
  return result;
};
