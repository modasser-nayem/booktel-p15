import { z } from "zod";
import { userSchemaValidation } from "./user.validation";

export type TUpdateProfile = z.infer<typeof userSchemaValidation.updateProfile>;

export type TUpdateUserRole = z.infer<
  typeof userSchemaValidation.updateUserRole
>;
