import { z } from "zod";

const updateProfile = z.object({
  name: z
    .string()
    .refine((value) => value !== "", { message: "name is required" })
    .optional(),
  email: z.string().email({ message: "invalid email address" }).optional(),
});

const updateUserRole = z.object({
  role: z.enum(["ADMIN", "HOTEL_OWNER", "CUSTOMER"], {
    required_error: "role is required",
  }),
});

export const userSchemaValidation = {
  updateProfile,
  updateUserRole,
};
