import { z } from "zod";
import { authSchemaValidation } from "./auth.validation";

export type TSignupUser = {
  name: string;
  email: string;
  password: string;
};

export type TLoginUser = z.infer<typeof authSchemaValidation.login>;
