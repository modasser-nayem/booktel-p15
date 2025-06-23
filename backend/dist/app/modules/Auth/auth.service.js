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
exports.authService = void 0;
const config_1 = __importDefault(require("../../config"));
const user_repository_1 = require("../../db/repositories/user.repository");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const email_1 = require("../../utils/email");
const hash_1 = __importDefault(require("../../utils/hash"));
const jwt_1 = __importDefault(require("../../utils/jwt"));
const signupUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    payload.data.password = yield hash_1.default.hashPassword(payload.data.password);
    const user = yield user_repository_1.userRepository.findUserByEmail(payload.data.email);
    if (user) {
        throw new AppError_1.default(400, `User with the email ${payload.data.email} already exist`);
    }
    const result = yield user_repository_1.userRepository.createNewUser({
        name: payload.data.name,
        email: payload.data.email,
        password: payload.data.password,
        role: payload.data.role,
    });
    const access_token = jwt_1.default.signAccessToken({
        id: result.id,
        role: result.role,
    });
    const htmlTemplate = email_1.emailHelper.mailTemplate.accountCreationEmail(result.name);
    yield email_1.emailHelper.sendEmail({
        to: result.email,
        subject: "Booktel Account successfully created",
        htmlTemplate,
    });
    return { user: result, access_token };
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_repository_1.userRepository.findUserByEmail(payload.data.email, true);
    // check user exist
    if (!user) {
        throw new AppError_1.default(400, "User not found!");
    }
    if (!user.password) {
        throw new AppError_1.default(400, "Password not found!");
    }
    // check password match
    if (!(yield hash_1.default.comparePassword(payload.data.password, user.password))) {
        throw new AppError_1.default(400, "incorrect password!");
    }
    const access_token = jwt_1.default.signAccessToken({
        id: user.id,
        role: user.role,
    });
    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        },
        access_token,
    };
});
const forgotPassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_repository_1.userRepository.findUserByEmail(payload.data.email);
    // check user exist
    if (!user) {
        throw new AppError_1.default(404, "User not found!");
    }
    const token = jwt_1.default.signForgotPassToken({
        userId: user.id,
    });
    const resetLink = `${config_1.default.RESET_PASS_URL}?token=${token}`;
    const htmlTemplate = email_1.emailHelper.mailTemplate.forgotPasswordEmail(user.name, resetLink, config_1.default.JWT_FORGOT_PASS_EXPIRES_IN);
    yield email_1.emailHelper.sendEmail({
        to: user.email,
        subject: "Booktel forgot password request!",
        htmlTemplate,
    });
    return null;
});
const resetPassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const decode = jwt_1.default.verifyForgotPassToken(payload.data.token);
    const user = yield user_repository_1.userRepository.findUSerById(decode.userId);
    // check user exist
    if (!user) {
        throw new AppError_1.default(403, "invalid request");
    }
    // hash new password
    payload.data.newPassword = yield hash_1.default.hashPassword(payload.data.newPassword);
    // update in db
    yield user_repository_1.userRepository.updatePassword({
        userId: user.id,
        newPassword: payload.data.newPassword,
    });
    return null;
});
exports.authService = {
    signupUser,
    loginUser,
    forgotPassword,
    resetPassword,
};
