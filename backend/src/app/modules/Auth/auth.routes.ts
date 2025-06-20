import { Router } from "express";
import requestValidate from "../../middlewares/requestValidation";
import { asyncHandler } from "../../utils/asyncHandler";
import { authController } from "./auth.controller";
import { authSchemaValidation } from "./auth.validation";

const router = Router();

// Register user
router.post(
  "/signup",
  requestValidate(authSchemaValidation.signup),
  asyncHandler(authController.signupUser),
);

// Login user
router.post(
  "/login",
  requestValidate(authSchemaValidation.login),
  asyncHandler(authController.loginUser),
);

// Logged out user
router.post("/logout", asyncHandler(authController.logoutUser));

// Forgot Password -> send reset link in mail
router.post(
  "/forgot",
  requestValidate(authSchemaValidation.forgotPassword),
  asyncHandler(authController.forgotPassword),
);

// Reset password
router.post(
  "/reset",
  requestValidate(authSchemaValidation.resetPassword),
  asyncHandler(authController.resetPassword),
);

export const authRoutes = router;
