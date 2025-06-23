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
exports.reviewRepository = void 0;
const pagination_1 = require("../../utils/pagination");
const connector_1 = __importDefault(require("../connector"));
const createReview = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const existingReview = yield connector_1.default.review.findFirst({
        where: {
            userId: data.userId,
            hotelId: data.hotelId,
        },
    });
    const select = {
        id: true,
        user: {
            select: {
                id: true,
                name: true,
            },
        },
        rating: true,
        comment: true,
        hotelId: true,
        createdAt: true,
    };
    if (existingReview) {
        return yield connector_1.default.review.update({
            where: {
                id: existingReview.id,
            },
            data: {
                rating: data.rating,
                comment: data.comment,
            },
            select,
        });
    }
    return yield connector_1.default.review.create({
        data: {
            userId: data.userId,
            hotelId: data.hotelId,
            rating: data.rating,
            comment: data.comment,
        },
        select,
    });
});
const getHotelReviews = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, sortBy, sortOrder } = payload.query;
    const where = {
        hotelId: payload.hotelId,
    };
    const select = {
        id: true,
        user: {
            select: {
                id: true,
                name: true,
            },
        },
        rating: true,
        comment: true,
        createdAt: true,
        hotelId: true,
    };
    return yield (0, pagination_1.paginate)({
        model: connector_1.default.review,
        where,
        select,
        page,
        limit,
        sortBy,
        sortOrder,
    });
});
exports.reviewRepository = {
    createReview,
    getHotelReviews,
};
