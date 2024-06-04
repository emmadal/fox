import { create } from "zustand";
import { InitState } from "./type";
import { createJSONStorage, persist, StateStorage } from "zustand/middleware";
import * as SecureStore from "expo-secure-store";
import { Action } from "./actions";
import { initialState } from "./state";

const SecureStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    const value = await SecureStore.getItemAsync(name);
    return value || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await SecureStore.setItemAsync(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await SecureStore.deleteItemAsync(name);
  },
};

export const useStore = create(
  persist<InitState & Action>(
    (set) => ({
      ...initialState,
      updateToken: (token) =>
        set((state) => ({ ...state, token, isSignout: false })),
      updatePhoto: (photo) =>
        set((state) => ({ user: { ...state.user, photo } })),
      updateProfile: (user) =>
        set((state) => ({
          ...state,
          user: { ...state.user, ...user },
          isSignout: false,
        })),
      signOut: () => set(initialState),
    }),
    {
      name: "fox_str",
      storage: createJSONStorage(() => SecureStorage),
    },
  ),
);
