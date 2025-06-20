import { z } from "zod";
import { userSchemaValidation } from "./user.validation";
import { PaginationQuery } from "../../types/pagination";

export type TUpdateProfile = z.infer<typeof userSchemaValidation.updateProfile>;

export type TUpdateUserRole = z.infer<
  typeof userSchemaValidation.updateUserRole
>;

export type TGetUsersQuery = PaginationQuery & {
  email?: string;
  role?: string;
};
