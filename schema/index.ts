import { username } from "@/regex";
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email().trim(),
  password: z.string().trim(),
});

export const registerSchema = z.object({
  email: z.string().email().trim(),
  username: z.string().regex(username).trim(),
  birth_date: z.string().trim(),
  password: z.string().min(5, "min 5 characters").trim(),
});

export const resetPasswordSchema = z.object({
  email: z.string().email().trim(),
});
