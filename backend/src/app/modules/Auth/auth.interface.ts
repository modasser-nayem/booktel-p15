import { z } from "zod";
import { authSchemaValidation } from "./auth.validation";

export type TSignupUser = {
  name: string;
  email: string;
  password: string;
  role: "HOTEL_OWNER" | "CUSTOMER";
};

export type TLoginUser = z.infer<typeof authSchemaValidation.login>;

export type TForgotPassword = z.infer<
  typeof authSchemaValidation.forgotPassword
>;

export type TResetPassword = z.infer<typeof authSchemaValidation.resetPassword>;
