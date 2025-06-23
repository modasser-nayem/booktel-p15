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
exports.userController = void 0;
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const user_service_1 = require("./user.service");
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.getProfile({ user: req.user });
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Profile successfully retrieved",
        data: result,
    });
});
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.updateProfile({
        user: req.user,
        data: req.body,
    });
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Profile successfully updated",
        data: result,
    });
});
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.getAllUsers({ query: req.query });
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Successfully retrieved all users",
        data: result,
    });
});
const getUserDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.getUserDetails({ userId: req.params.id });
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Successfully retrieved user details",
        data: result,
    });
});
const updateUserRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.updateUserRole({
        userId: req.params.id,
        data: req.body,
    });
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "User role successfully updated",
        data: result,
    });
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.deleteUser({ userId: req.params.id });
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Account successfully deleted",
        data: result,
    });
});
exports.userController = {
    getProfile,
    updateProfile,
    getAllUsers,
    getUserDetails,
    updateUserRole,
    deleteUser,
};
