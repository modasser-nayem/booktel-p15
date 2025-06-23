"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const validateEnv_1 = require("../utils/validateEnv");
const envFile = process.env.NODE_ENV === "test" ? ".env.test" : ".env";
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), envFile) });
exports.default = {
    NODE_ENV: (0, validateEnv_1.requireEnv)("NODE_ENV"),
    PORT: (0, validateEnv_1.requireEnv)("PORT"),
    DB_URL: (0, validateEnv_1.requireEnv)("DATABASE_URL"),
    BCRYPT_SALT_ROUNDS: (0, validateEnv_1.requireNumberEnv)("BCRYPT_SALT_ROUNDS"),
    JWT_ACCESS_SECRET: (0, validateEnv_1.requireEnv)("JWT_ACCESS_SECRET"),
    JWT_ACCESS_EXPIRES_IN: (0, validateEnv_1.requireEnv)("JWT_ACCESS_EXPIRES_IN"),
    JWT_FORGOT_PASS_EXPIRES_IN: (0, validateEnv_1.requireEnv)("JWT_FORGOT_PASS_EXPIRES_IN"),
    RESET_PASS_URL: (0, validateEnv_1.requireEnv)("RESET_PASS_URL"),
    SMTP_HOST: (0, validateEnv_1.requireEnv)("SMTP_HOST"),
    SMTP_PORT: (0, validateEnv_1.requireNumberEnv)("SMTP_PORT"),
    SMTP_USER: (0, validateEnv_1.requireEnv)("SMTP_USER"),
    SMTP_PASS: (0, validateEnv_1.requireEnv)("SMTP_PASS"),
    MAILBOXLAYER_ACCESS_KEY: (0, validateEnv_1.requireEnv)("MAILBOXLAYER_ACCESS_KEY"),
    STRIPE_SECRET_KEY: (0, validateEnv_1.requireEnv)("STRIPE_SECRET_KEY"),
    FRONTEND_URL: (0, validateEnv_1.requireEnv)("FRONTEND_URL"),
    STRIPE_WEBHOOK_SECRET: (0, validateEnv_1.requireEnv)("STRIPE_WEBHOOK_SECRET"),
};
