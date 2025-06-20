import { z } from "zod";

const signup = z
  .object({
    name: z
      .string({ required_error: "name is required" })
      .refine((value) => value !== "", { message: "name is required" }),
    email: z
      .string({ required_error: "email is required" })
      .email({ message: "invalid email address" }),
    role: z.enum(["HOTEL_OWNER", "CUSTOMER"], {
      required_error: "role is required",
    }),
    password: z
      .string({ required_error: "password is required" })
      .refine((value) => value !== "", { message: "password is required" })
      .refine((value) => value.length >= 6, {
        message: "password must be more then 5 character",
      }),
    confirmPassword: z
      .string({ required_error: "confirmPassword is required" })
      .refine((value) => value !== "", {
        message: "confirmPassword is required",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const login = z.object({
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "invalid email address" })
    .refine((value) => value !== "", { message: "email is required" }),
  password: z
    .string({ required_error: "password is required" })
    .refine((value) => value !== "", { message: "password is required" }),
});

const forgotPassword = z.object({
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "invalid email address" })
    .refine((value) => value !== "", { message: "email is required" }),
});

const resetPassword = z
  .object({
    token: z
      .string({ required_error: "token is required" })
      .refine((value) => value !== "", {
        message: "token is required",
      }),
    newPassword: z
      .string({ required_error: "newPassword is required" })
      .refine((value) => value !== "", { message: "New password is required" })
      .refine((value) => value.length >= 6, {
        message: "password must be more then 5 character",
      }),
    confirmPassword: z
      .string({ required_error: "confirmPassword is required" })
      .refine((value) => value !== "", {
        message: "confirmPassword is required",
      }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const authSchemaValidation = {
  signup,
  login,
  forgotPassword,
  resetPassword,
};
