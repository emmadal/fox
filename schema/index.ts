import { username } from "@/regex";
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email().trim(),
  password: z.string().trim(),
});

export const registerSchema = z.object({
  email: z.string().email().trim(),
  full_name: z.string().max(50).trim(),
  username: z.string().regex(username).max(20).trim(),
  birth_date: z.any(),
  password: z.string().min(5, "min 5 characters").trim(),
});

export const resetPasswordSchema = z.object({
  email: z.string().email().trim(),
});
