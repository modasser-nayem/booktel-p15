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
exports.authorize = void 0;
const AppError_1 = __importDefault(require("../errors/AppError"));
const asyncHandler_1 = require("../utils/asyncHandler");
const jwt_1 = __importDefault(require("../utils/jwt"));
const user_repository_1 = require("../db/repositories/user.repository");
const authorize = (...roles) => {
    return (0, asyncHandler_1.asyncHandler)((req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.cookies.accessToken;
        if (!token)
            throw new AppError_1.default(401, "unauthorized access");
        const decoded = jwt_1.default.verifyAccessToken(token);
        if (!decoded)
            throw new AppError_1.default(401, "invalid access token");
        if (!(yield user_repository_1.userRepository.findUSerById(decoded.id))) {
            throw new AppError_1.default(401, "account not found!");
        }
        if (roles.length && !roles.includes(decoded.role)) {
            throw new AppError_1.default(403, "You don't have permission to access this data!");
        }
        req.user = decoded;
        next();
    }));
};
exports.authorize = authorize;
