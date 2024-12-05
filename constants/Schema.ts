import { email, username } from "./Regex";
import i18n from "@/i18n";
import { z } from "zod";

export const loginSchema = z
  .object({
    email: z
      .string({ required_error: `${i18n.t("fieldrequired")}` })
      .regex(email, { message: `${i18n.t("invalidemail")}` })
      .trim(),
    password: z
      .string({ required_error: `${i18n.t("fieldrequired")}` })
      .min(5, `${i18n.t("passwordmin")}`)
      .trim(),
  })
  .required();

export const registerSchema = z
  .object({
    email: z
      .string({ required_error: `${i18n.t("fieldrequired")}` })
      .email({ message: `${i18n.t("invalidemail")}` })
      .trim(),
    name: z
      .string({ required_error: `${i18n.t("fieldrequired")}` })
      .max(50)
      .trim(),
    username: z
      .string({ required_error: `${i18n.t("fieldrequired")}` })
      .regex(username, { message: `${i18n.t("usernameinvalid")}` })
      .max(20)
      .trim(),
    password: z
      .string({ required_error: `${i18n.t("fieldrequired")}` })
      .min(5, `${i18n.t("passwordmin")}`)
      .trim(),
  })
  .required();

export const resetPasswordSchema = z.object({
  email: z
    .string({ required_error: `${i18n.t("fieldrequired")}` })
    .email()
    .trim(),
});

export const editProfileSchema = z.object({
  name: z
    .string({ required_error: `${i18n.t("fieldrequired")}` })
    .max(50)
    .trim(),
  biography: z.string().max(200).trim().optional(),
  avatar_url: z.string().url().optional(),
  location: z.string().max(50).trim().optional(),
  website: z.string().url().trim().optional(),
});
