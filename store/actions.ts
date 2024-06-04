import { User } from "./type";

export type Action = {
  updatePhoto: (photo: string) => void;
  updateProfile: (user: User) => void;
  updateLanguage: (language: string) => void;
  updateToken: (token: string) => void;
  signOut: () => void;
};
