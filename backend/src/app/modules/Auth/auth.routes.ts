import { Router } from "express";
import requestValidate from "../../middlewares/requestValidation";
import { asyncHandler } from "../../utils/asyncHandler";
import { authController } from "./auth.controller";
import { authSchemaValidation } from "./auth.validation";

const router = Router();

// signup user
router.post(
  "/signup",
  requestValidate(authSchemaValidation.signup),
  asyncHandler(authController.signupUser),
);

// login user
router.post(
  "/login",
  requestValidate(authSchemaValidation.login),
  asyncHandler(authController.loginUser),
);

// get users
router.get("/users", asyncHandler(authController.getUsers));

export const authRoutes = router;
