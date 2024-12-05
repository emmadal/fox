import {
  launchImageLibraryAsync,
  getMediaLibraryPermissionsAsync,
  requestMediaLibraryPermissionsAsync,
  type ImagePickerResult,
} from "expo-image-picker";

/**
 * Open the image library and allow the user upload a photo
 */
export const takePhoto = async (): Promise<ImagePickerResult> => {
  const permission = await getMediaLibraryPermissionsAsync();
  if (!permission.granted) {
    await requestMediaLibraryPermissionsAsync();
  }
  let result = await launchImageLibraryAsync({
    mediaTypes: "images",
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
    selectionLimit: 1,
  });
  return result;
};
