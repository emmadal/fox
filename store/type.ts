export type User = {
  id?: number;
  full_name: string;
  username: string;
  biography: string;
  photo: string;
  email: string;
  certified: boolean;
  birth_date: string;
};

export type InitState = {
  user: User;
  token: string | null;
  isSignout: boolean;
  language: string;
};