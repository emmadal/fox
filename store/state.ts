import { InitState } from "./type";

export const initialState: InitState = {
  user: {
    id: 0,
    full_name: "",
    email: "",
    username: "",
    birth_date: "",
    biography: "",
    photo: "",
  },
  token: null,
  isSignout: true,
};
