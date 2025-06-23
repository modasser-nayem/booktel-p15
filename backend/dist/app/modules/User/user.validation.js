"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchemaValidation = void 0;
const zod_1 = require("zod");
const updateProfile = zod_1.z.object({
    name: zod_1.z
        .string()
        .refine((value) => value !== "", { message: "name is required" })
        .optional(),
    email: zod_1.z.string().email({ message: "invalid email address" }).optional(),
});
const updateUserRole = zod_1.z.object({
    role: zod_1.z.enum(["ADMIN", "HOTEL_OWNER", "CUSTOMER"], {
        required_error: "role is required",
    }),
});
exports.userSchemaValidation = {
    updateProfile,
    updateUserRole,
};
