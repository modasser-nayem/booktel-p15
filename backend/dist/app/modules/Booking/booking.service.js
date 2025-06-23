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
exports.bookingService = void 0;
const booking_repository_1 = require("../../db/repositories/booking.repository");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const bookARoom = (data) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO: for hosting issus, i clean expire pending bookings in here
    yield booking_repository_1.bookingRepository.cleanUnpaidBookings();
    const room = yield booking_repository_1.bookingRepository.getRoomById(data.roomId);
    if (!room) {
        throw new AppError_1.default(404, "Room not found!");
    }
    // Parse and normalize to UTC 00:00
    const fromDate = new Date(data.fromDate);
    const toDate = new Date(data.toDate);
    fromDate.setUTCHours(0, 0, 0, 0);
    toDate.setUTCHours(0, 0, 0, 0);
    const now = new Date();
    // validate date range
    if (fromDate < now || fromDate >= toDate) {
        throw new AppError_1.default(400, "invalid date range");
    }
    // check room availability window
    if (fromDate < room.availableFrom || toDate > room.availableTo) {
        throw new AppError_1.default(400, "Room not available for selected dates");
    }
    // Check for overlapping bookings (pending or booked)
    const conflict = yield booking_repository_1.bookingRepository.isOverlappingBooking({
        roomId: room.id,
        fromDate,
        toDate,
    });
    if (conflict) {
        throw new AppError_1.default(409, "Room already booked or held for these dates");
    }
    // calculate total price
    const nights = (toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24);
    const totalPrice = Math.ceil(nights) * room.price;
    return booking_repository_1.bookingRepository.bookARoom(Object.assign(Object.assign({}, data), { totalPrice }));
});
const getMyBooking = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield booking_repository_1.bookingRepository.getMyBooking(payload);
});
const getBookingDetails = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield booking_repository_1.bookingRepository.getBookingDetails(bookId);
});
const cancelBooking = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield booking_repository_1.bookingRepository.findBookingById(payload.bookId);
    if (!booking) {
        throw new AppError_1.default(400, "invalid_id");
    }
    if (booking.userId !== payload.userId) {
        throw new AppError_1.default(403, "you don't have permission to cancel this booking");
    }
    if (booking.status !== "BOOKED") {
        throw new AppError_1.default(400, "non-cancelable booking");
    }
    const now = new Date();
    if (booking.fromDate <= now) {
        throw new AppError_1.default(400, "Booking already started, can’t cancel");
    }
    return yield booking_repository_1.bookingRepository.cancelBooking(payload.bookId);
});
exports.bookingService = {
    bookARoom,
    getMyBooking,
    getBookingDetails,
    cancelBooking,
};
