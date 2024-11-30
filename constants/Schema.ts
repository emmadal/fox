import { username } from "./Regex";
import i18n from "@/i18n";
import { z } from "zod";

export const loginSchema = z
  .object({
    username: z
      .string({ required_error: `${i18n.t("fieldrequired")}` })
      .regex(username, { message: `${i18n.t("usernameinvalid")}` })
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
