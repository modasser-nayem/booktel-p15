"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const requestValidation_1 = __importDefault(require("../../middlewares/requestValidation"));
const asyncHandler_1 = require("../../utils/asyncHandler");
const auth_controller_1 = require("./auth.controller");
const auth_validation_1 = require("./auth.validation");
const router = (0, express_1.Router)();
// Register user
router.post("/signup", (0, requestValidation_1.default)(auth_validation_1.authSchemaValidation.signup), (0, asyncHandler_1.asyncHandler)(auth_controller_1.authController.signupUser));
// Login user
router.post("/login", (0, requestValidation_1.default)(auth_validation_1.authSchemaValidation.login), (0, asyncHandler_1.asyncHandler)(auth_controller_1.authController.loginUser));
// Logged out user
router.post("/logout", (0, asyncHandler_1.asyncHandler)(auth_controller_1.authController.logoutUser));
// Forgot Password -> send reset link in mail
router.post("/forgot", (0, requestValidation_1.default)(auth_validation_1.authSchemaValidation.forgotPassword), (0, asyncHandler_1.asyncHandler)(auth_controller_1.authController.forgotPassword));
// Reset password
router.post("/reset", (0, requestValidation_1.default)(auth_validation_1.authSchemaValidation.resetPassword), (0, asyncHandler_1.asyncHandler)(auth_controller_1.authController.resetPassword));
exports.authRoutes = router;
