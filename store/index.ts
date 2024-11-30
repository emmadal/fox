import { create } from "zustand";
import { InitState } from "./type";
import { createJSONStorage, persist, StateStorage } from "zustand/middleware";
import * as SecureStore from "expo-secure-store";
import { Action } from "./actions";
import { initialState } from "./state";

/**
 * SecureStorage to store the state in a secure way.
 */
const SecureStorage: StateStorage = {
  getItem: (name: string) =>
    SecureStore.getItemAsync(name).then((value) => value || null),
  /**
   * Store a value in secure storage.
   *
   * @param name - The key to store the value under.
   * @param value - The value to store.
   */
  setItem: (name: string, value: string) =>
    SecureStore.setItemAsync(name, value),
  /**
   * Remove a value from secure storage.
   *
   * @param name - The key to remove the value from.
   */
  removeItem: (name: string) => SecureStore.deleteItemAsync(name),
};

/**
 * useStore is a store that persists the state in secure storage.
 */
export const useStore = create(
  persist<InitState & Action>(
    (set) => ({
      ...initialState,
      updateToken: (token) => set(() => ({ token })),
      getProfile: (user, token) => set({ user, isSignout: false, token }),
      signOut: () => set(initialState),
      updateLanguage: (language) => set(() => ({ language })),
      updateProfile: (user) => set(() => ({ user })),
    }),
    {
      name: "fox-store",
      storage: createJSONStorage(() => SecureStorage),
    },
  ),
);
