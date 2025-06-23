"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const requestValidation_1 = __importDefault(require("../../middlewares/requestValidation"));
const asyncHandler_1 = require("../../utils/asyncHandler");
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const authorize_1 = require("../../middlewares/authorize");
const router = (0, express_1.Router)();
// Get own profile
router.get("/me", (0, authorize_1.authorize)(), (0, asyncHandler_1.asyncHandler)(user_controller_1.userController.getProfile));
// Update own profile
router.put("/me", (0, authorize_1.authorize)(), (0, requestValidation_1.default)(user_validation_1.userSchemaValidation.updateProfile), (0, asyncHandler_1.asyncHandler)(user_controller_1.userController.updateProfile));
// (Admin) Get all users
router.get("/", (0, authorize_1.authorize)("ADMIN"), (0, asyncHandler_1.asyncHandler)(user_controller_1.userController.getAllUsers));
// (Admin) Get user details
router.get("/:id", (0, authorize_1.authorize)("ADMIN"), (0, asyncHandler_1.asyncHandler)(user_controller_1.userController.getUserDetails));
// (Admin) Update user role
router.patch("/:id", (0, authorize_1.authorize)("ADMIN"), (0, requestValidation_1.default)(user_validation_1.userSchemaValidation.updateUserRole), (0, asyncHandler_1.asyncHandler)(user_controller_1.userController.updateUserRole));
// (Admin) Delete user
router.delete("/:id", (0, authorize_1.authorize)("ADMIN"), (0, asyncHandler_1.asyncHandler)(user_controller_1.userController.deleteUser));
exports.userRoutes = router;
