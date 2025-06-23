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
exports.bookingRepository = void 0;
const connector_1 = __importDefault(require("../connector"));
const room_repository_1 = require("./room.repository");
const pagination_1 = require("../../utils/pagination");
const getRoomById = (roomId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield room_repository_1.roomRepository.getRoomById(roomId);
});
const findBookingById = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield connector_1.default.booking.findUnique({
        where: { id: bookId },
        select: {
            id: true,
            userId: true,
            fromDate: true,
            toDate: true,
            totalPrice: true,
            status: true,
            createdAt: true,
            room: {
                select: {
                    id: true,
                    hotelId: true,
                },
            },
        },
    });
});
const bookARoom = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield connector_1.default.booking.create({
        data: data,
        select: {
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
        },
    });
});
const isOverlappingBooking = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield connector_1.default.booking.findFirst({
        where: {
            roomId: payload.roomId,
            status: { in: ["PENDING", "BOOKED"] },
            fromDate: { lt: payload.toDate },
            toDate: { gt: payload.fromDate },
        },
    });
    return !!booking;
});
const getMyBooking = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, sortBy, sortOrder, status, fromDate, toDate } = payload.query;
    const where = {
        userId: payload.userId,
    };
    if (status) {
        where.status = status;
    }
    if (fromDate) {
        where.fromDate = {
            gte: new Date(fromDate),
        };
    }
    if (toDate) {
        where.toDate = {
            lte: new Date(toDate),
        };
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
    return yield (0, pagination_1.paginate)({
        model: connector_1.default.booking,
        where,
        select,
        page,
        limit,
        sortBy,
        sortOrder,
    });
});
const getBookingDetails = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield connector_1.default.booking.findUnique({
        where: { id: bookId },
        select: {
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
                    price: true,
                    hotelId: true,
                },
            },
            payment: {
                select: {
                    id: true,
                    status: true,
                    createdAt: true,
                },
            },
        },
    });
});
const cancelBooking = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    yield connector_1.default.booking.update({
        where: { id: bookId },
        data: { status: "CANCELLED" },
    });
    return null;
});
const cleanUnpaidBookings = () => __awaiter(void 0, void 0, void 0, function* () {
    const cutoff = new Date(Date.now() - 15 * 60 * 1000);
    yield connector_1.default.booking.deleteMany({
        where: {
            status: "PENDING",
            createdAt: { lt: cutoff },
        },
    });
});
const findPaymentByBookId = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield connector_1.default.payment.findUnique({
        where: { bookingId: bookId, status: "SUCCESS" },
    });
});
const findPaymentById = (paymentId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield connector_1.default.payment.findUnique({
        where: { id: paymentId },
    });
});
const createPayment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield connector_1.default.payment.create({
        data: Object.assign({}, payload),
    });
});
const updateBookingStatus = (bookId, status) => __awaiter(void 0, void 0, void 0, function* () {
    return yield connector_1.default.booking.update({
        where: { id: bookId },
        data: { status },
    });
});
exports.bookingRepository = {
    getRoomById,
    findBookingById,
    bookARoom,
    isOverlappingBooking,
    getMyBooking,
    getBookingDetails,
    cancelBooking,
    cleanUnpaidBookings,
    findPaymentByBookId,
    findPaymentById,
    createPayment,
    updateBookingStatus,
};
