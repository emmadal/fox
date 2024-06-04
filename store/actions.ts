import { InitState, User } from "./type";

export type Action = {
  updatePhoto: (photo: string) => void;
  updateProfile: (user: User) => void;
  updateToken: (token: string) => void;
  signOut: () => void;
};
