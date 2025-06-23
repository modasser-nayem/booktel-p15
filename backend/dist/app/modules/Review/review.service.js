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
exports.reviewService = void 0;
const booking_repository_1 = require("../../db/repositories/booking.repository");
const review_repository_1 = require("../../db/repositories/review.repository");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const createReview = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield booking_repository_1.bookingRepository.findBookingById(data.bookId);
    if (!booking) {
        throw new AppError_1.default(404, "invalid booking_id");
    }
    if (booking.userId !== data.userId) {
        throw new AppError_1.default(403, "You are not allowed to create a review for this hotel");
    }
    if (booking.status !== "BOOKED") {
        throw new AppError_1.default(400, "You can only review completed bookings");
    }
    data.hotelId = booking.room.hotelId;
    return yield review_repository_1.reviewRepository.createReview(data);
});
const getHotelReviews = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield review_repository_1.reviewRepository.getHotelReviews(payload);
});
exports.reviewService = {
    createReview,
    getHotelReviews,
};
