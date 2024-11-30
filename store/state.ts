import { InitState } from "./type";

export const initialState: InitState = {
  user: {
    id: 0,
    name: "",
    username: "",
    email: "",
    premium: false,
    biography: "",
    website: "",
    location: "",
    avatar_url: "",
    created_at: "",
  },
  isSignout: true,
  language: "en",
  token: null,
};
