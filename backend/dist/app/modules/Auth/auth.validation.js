"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authSchemaValidation = void 0;
const zod_1 = require("zod");
const signup = zod_1.z
    .object({
    name: zod_1.z
        .string({ required_error: "name is required" })
        .refine((value) => value !== "", { message: "name is required" }),
    email: zod_1.z
        .string({ required_error: "email is required" })
        .email({ message: "invalid email address" }),
    role: zod_1.z.enum(["HOTEL_OWNER", "CUSTOMER"], {
        required_error: "role is required",
    }),
    password: zod_1.z
        .string({ required_error: "password is required" })
        .refine((value) => value !== "", { message: "password is required" })
        .refine((value) => value.length >= 6, {
        message: "password must be more then 5 character",
    }),
    confirmPassword: zod_1.z
        .string({ required_error: "confirmPassword is required" })
        .refine((value) => value !== "", {
        message: "confirmPassword is required",
    }),
})
    .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});
const login = zod_1.z.object({
    email: zod_1.z
        .string({ required_error: "email is required" })
        .email({ message: "invalid email address" })
        .refine((value) => value !== "", { message: "email is required" }),
    password: zod_1.z
        .string({ required_error: "password is required" })
        .refine((value) => value !== "", { message: "password is required" }),
});
const forgotPassword = zod_1.z.object({
    email: zod_1.z
        .string({ required_error: "email is required" })
        .email({ message: "invalid email address" })
        .refine((value) => value !== "", { message: "email is required" }),
});
const resetPassword = zod_1.z
    .object({
    token: zod_1.z
        .string({ required_error: "token is required" })
        .refine((value) => value !== "", {
        message: "token is required",
    }),
    newPassword: zod_1.z
        .string({ required_error: "newPassword is required" })
        .refine((value) => value !== "", { message: "New password is required" })
        .refine((value) => value.length >= 6, {
        message: "password must be more then 5 character",
    }),
    confirmPassword: zod_1.z
        .string({ required_error: "confirmPassword is required" })
        .refine((value) => value !== "", {
        message: "confirmPassword is required",
    }),
})
    .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});
exports.authSchemaValidation = {
    signup,
    login,
    forgotPassword,
    resetPassword,
};
