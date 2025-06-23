"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const signAccessToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, config_1.default.JWT_ACCESS_SECRET, {
        expiresIn: config_1.default.JWT_ACCESS_EXPIRES_IN,
    });
};
const verifyAccessToken = (token) => {
    return jsonwebtoken_1.default.verify(token, config_1.default.JWT_ACCESS_SECRET);
};
const signForgotPassToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, config_1.default.JWT_ACCESS_SECRET, {
        expiresIn: config_1.default.JWT_FORGOT_PASS_EXPIRES_IN,
    });
};
const verifyForgotPassToken = (token) => {
    return jsonwebtoken_1.default.verify(token, config_1.default.JWT_ACCESS_SECRET);
};
const jwtHelper = {
    signAccessToken,
    signForgotPassToken,
    verifyAccessToken,
    verifyForgotPassToken,
};
exports.default = jwtHelper;
