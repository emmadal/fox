import { User } from "./type";

export type Action = {
  getProfile: (data: User, token: string) => void;
  updateLanguage: (language: string) => void;
  updateToken: (token: string) => void;
  updateProfile: (data: User) => void;
  signOut: () => void;
};
