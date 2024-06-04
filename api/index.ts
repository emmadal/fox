import { loginSchema, registerSchema } from "@/schema";
import { z } from "zod";

const API_URL: string = process.env.EXPO_PUBLIC_API_URL as string;
type API_Response = {
  message: string;
  data?: any;
  status: boolean;
};


export const login = async (data: z.infer<typeof loginSchema>) => {
  const req = await fetch(`${API_URL}/login`, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
  const response: API_Response = await req.json();
  return response;
};

export const register = async (data: z.infer<typeof registerSchema>) => {
  const req = await fetch(`${API_URL}/register`, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
  const response: API_Response = await req.json();
  return response;
};
