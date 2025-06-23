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
exports.adminRepository = void 0;
const connector_1 = __importDefault(require("../connector"));
const pagination_1 = require("../../utils/pagination");
const getStats = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const [totalUsers, totalHotels, totalBookings, totalRevenueResult, pendingHotels, pendingBookings,] = yield connector_1.default.$transaction([
        connector_1.default.user.count(),
        connector_1.default.hotel.count(),
        connector_1.default.booking.count(),
        connector_1.default.booking.aggregate({
            where: {
                status: "BOOKED",
            },
            _sum: {
                totalPrice: true,
            },
        }),
        connector_1.default.hotel.count({
            where: {
                status: "PENDING",
            },
        }),
        connector_1.default.booking.count({
            where: {
                status: "PENDING",
            },
        }),
    ]);
    return {
        totalUsers,
        totalHotels,
        totalBookings,
        totalRevenue: (_b = (_a = totalRevenueResult._sum) === null || _a === void 0 ? void 0 : _a.totalPrice) !== null && _b !== void 0 ? _b : 0,
        pendingHotels,
        pendingBookings,
    };
});
const getBookings = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, sortBy, sortOrder, status } = query;
    const where = {};
    if (status) {
        where.status = status;
    }
    const select = {
        id: true,
        fromDate: true,
        toDate: true,
        totalPrice: true,
        status: true,
        createdAt: true,
        room: {
            select: {
                id: true,
                beds: true,
                type: true,
                photos: true,
            },
        },
    };
    const result = yield (0, pagination_1.paginate)({
        model: connector_1.default.booking,
        where,
        page,
        limit,
        sortBy,
        sortOrder,
        select,
    });
    return result;
});
exports.adminRepository = {
    getStats,
    getBookings,
};
