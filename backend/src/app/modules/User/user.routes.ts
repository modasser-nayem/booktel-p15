import { Router } from "express";
import requestValidate from "../../middlewares/requestValidation";
import { asyncHandler } from "../../utils/asyncHandler";
import { userController } from "./user.controller";
import { userSchemaValidation } from "./user.validation";
import { authorize } from "../../middlewares/authorize";

const router = Router();

// Get own profile
router.get("/me", authorize(), asyncHandler(userController.getProfile));

// Update own profile
router.put(
  "/me",
  authorize(),
  requestValidate(userSchemaValidation.updateProfile),
  asyncHandler(userController.updateProfile),
);

// (Admin) Get all users
router.get("/", authorize("ADMIN"), asyncHandler(userController.getAllUsers));

// (Admin) Get user details
router.get(
  "/:id",
  authorize("ADMIN"),
  asyncHandler(userController.getUserDetails),
);

// (Admin) Update user role
router.patch(
  "/:id",
  authorize("ADMIN"),
  requestValidate(userSchemaValidation.updateUserRole),
  asyncHandler(userController.updateUserRole),
);

// (Admin) Delete user
router.delete(
  "/:id",
  authorize("ADMIN"),
  asyncHandler(userController.deleteUser),
);

export const userRoutes = router;
