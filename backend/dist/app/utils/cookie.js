"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearAuthCookie = exports.setAuthCookie = exports.COOKIE_NAME = void 0;
const config_1 = __importDefault(require("../config"));
exports.COOKIE_NAME = "accessToken";
const setAuthCookie = (res, token) => {
    res.cookie(exports.COOKIE_NAME, token, {
        httpOnly: true,
        secure: config_1.default.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
};
exports.setAuthCookie = setAuthCookie;
const clearAuthCookie = (res) => {
    res.clearCookie(exports.COOKIE_NAME, {
        httpOnly: true,
        secure: config_1.default.NODE_ENV === "production",
        sameSite: "lax",
    });
};
exports.clearAuthCookie = clearAuthCookie;
