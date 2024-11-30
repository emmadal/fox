export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  premium: boolean;
  biography?: string;
  website?: string;
  location?: string;
  avatar_url?: string;
  created_at?: string;
};

export type InitState = {
  user: User;
  isSignout: boolean;
  language: string;
  token: string | null;
};
