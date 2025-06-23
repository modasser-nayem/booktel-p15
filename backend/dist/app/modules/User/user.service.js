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
exports.userService = void 0;
const user_repository_1 = require("../../db/repositories/user.repository");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const getProfile = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_repository_1.userRepository.findUSerById(payload.user.id);
    if (!user) {
        throw new AppError_1.default(404, "User not found!");
    }
    return user;
});
const updateProfile = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_repository_1.userRepository.findUSerById(payload.user.id);
    if (!user) {
        throw new AppError_1.default(404, "invalid user_id");
    }
    return yield user_repository_1.userRepository.updateUserProfile({
        id: user.id,
        name: payload.data.name,
        email: payload.data.email,
    });
});
const getAllUsers = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_repository_1.userRepository.getAllUsers(payload.query);
});
const getUserDetails = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_repository_1.userRepository.findUSerById(payload.userId);
    if (!user) {
        throw new AppError_1.default(404, "invalid user_id");
    }
    return user;
});
const updateUserRole = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_repository_1.userRepository.findUSerById(payload.userId);
    if (!user) {
        throw new AppError_1.default(404, "invalid user_id");
    }
    return yield user_repository_1.userRepository.updateUserRole(payload);
});
const deleteUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_repository_1.userRepository.findUSerById(payload.userId);
    if (!user) {
        throw new AppError_1.default(404, "invalid user_id");
    }
    return yield user_repository_1.userRepository.deleteUser(user.id);
});
exports.userService = {
    getProfile,
    updateProfile,
    getAllUsers,
    getUserDetails,
    updateUserRole,
    deleteUser,
};
