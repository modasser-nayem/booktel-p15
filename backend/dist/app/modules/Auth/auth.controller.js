"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const auth_service_1 = require("./auth.service");
const cookie_1 = require("../../utils/cookie");
const signupUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.authService.signupUser({ data: req.body });
    (0, cookie_1.setAuthCookie)(res, result.access_token);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Account successfully created",
        data: result.user,
    });
});
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.authService.loginUser({ data: req.body });
    (0, cookie_1.setAuthCookie)(res, result.access_token);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Successfully Login",
        data: result.user,
    });
});
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Clear the access token from cookie
    (0, cookie_1.clearAuthCookie)(res);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Successfully Logged out",
        data: null,
    });
});
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.authService.forgotPassword({ data: req.body });
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Check your mail to reset your password",
        data: result,
    });
});
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.authService.resetPassword({
        data: req.body,
    });
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Password successfully updated",
        data: result,
    });
});
exports.authController = {
    signupUser,
    loginUser,
    logoutUser,
    forgotPassword,
    resetPassword,
};
