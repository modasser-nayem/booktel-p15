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
exports.userRepository = void 0;
const connector_1 = __importDefault(require("../connector"));
const pagination_1 = require("../../utils/pagination");
const findUserByEmail = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const select = {};
    if (password) {
        select.password = true;
    }
    return yield connector_1.default.user.findUnique({
        where: { email },
        select: Object.assign(Object.assign({ id: true, email: true, name: true, role: true }, select), { createdAt: true, updatedAt: true }),
    });
});
const findUSerById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield connector_1.default.user.findUnique({
        where: { id },
        select: {
            id: true,
            email: true,
            name: true,
            role: true,
            createdAt: true,
            updatedAt: true,
        },
    });
});
const createNewUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield connector_1.default.user.create({
        data,
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,
        },
    });
});
const updatePassword = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield connector_1.default.user.update({
        where: { id: data.userId },
        data: {
            password: data.newPassword,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,
        },
    });
});
const updateUserProfile = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const updateData = { name: data.name, email: data.email };
    const result = yield connector_1.default.user.update({
        where: { id: data.id },
        data: updateData,
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return result;
});
const getAllUsers = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const where = {};
    if (query.role) {
        where.role = query.role;
    }
    if (query.email) {
        where.email = { contains: query.email, mode: "insensitive" };
    }
    const select = {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
    };
    const result = yield (0, pagination_1.paginate)({
        model: connector_1.default.user,
        where,
        select,
        sortBy: query.sortBy,
        page: query.page,
        limit: query.limit,
        sortOrder: query.sortOrder,
    });
    return result;
});
const updateUserRole = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId, data, }) {
    return yield connector_1.default.user.update({
        where: { id: userId },
        data: data,
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,
        },
    });
});
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield connector_1.default.user.delete({
        where: { id: userId },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,
        },
    });
});
exports.userRepository = {
    findUserByEmail,
    findUSerById,
    createNewUser,
    updatePassword,
    updateUserProfile,
    getAllUsers,
    updateUserRole,
    deleteUser,
};
