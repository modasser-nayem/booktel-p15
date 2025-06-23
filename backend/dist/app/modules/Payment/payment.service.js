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
exports.paymentService = void 0;
const config_1 = __importDefault(require("../../config"));
const booking_repository_1 = require("../../db/repositories/booking.repository");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const stripe_1 = __importDefault(require("stripe"));
const logger_1 = __importDefault(require("../../utils/logger"));
const stripe = new stripe_1.default(config_1.default.STRIPE_SECRET_KEY, {
    apiVersion: "2025-05-28.basil",
});
const checkout = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield booking_repository_1.bookingRepository.findBookingById(payload.bookingId);
    if (!booking) {
        throw new AppError_1.default(404, "Booking not found!");
    }
    if (booking.status === "CANCELLED") {
        throw new AppError_1.default(400, "Cancelled booking can't be paid for");
    }
    const alreadyPaid = yield booking_repository_1.bookingRepository.findPaymentByBookId(booking.id);
    if (alreadyPaid) {
        throw new AppError_1.default(400, "Booking already paid");
    }
    const session = yield stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: `Booking ID: ${booking.id}`,
                    },
                    unit_amount: Math.round(booking.totalPrice * 100),
                },
                quantity: 1,
            },
        ],
        success_url: `${config_1.default.FRONTEND_URL}/checkout/success`,
        cancel_url: `${config_1.default.FRONTEND_URL}/checkout/cancel`,
        metadata: {
            bookingId: booking.id,
        },
    });
    return { url: session.url, sessionId: session.id };
});
const webhook = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let event;
    try {
        event = stripe.webhooks.constructEvent(payload.body, payload.signature, config_1.default.STRIPE_WEBHOOK_SECRET);
    }
    catch (err) {
        logger_1.default.error("[webhook] Stripe signature error:", err);
        throw new AppError_1.default(400, "Webhook signature verification failed");
    }
    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const bookingId = (_a = session === null || session === void 0 ? void 0 : session.metadata) === null || _a === void 0 ? void 0 : _a.bookingId;
        if (!bookingId)
            throw new AppError_1.default(400, "Booking ID not found in metadata");
        yield booking_repository_1.bookingRepository.createPayment({
            bookingId,
            amount: session.amount_total ? session.amount_total / 100 : 0,
            method: "stripe",
            status: "SUCCESS",
        });
        yield booking_repository_1.bookingRepository.updateBookingStatus(bookingId, "BOOKED");
        logger_1.default.info("Stripe session completed: ", session.id);
    }
    return { received: true };
});
const getPaymentDetails = (paymentId) => __awaiter(void 0, void 0, void 0, function* () {
    const payment = yield booking_repository_1.bookingRepository.findPaymentById(paymentId);
    if (!payment) {
        throw new AppError_1.default(404, "Payment not found");
    }
    return payment;
});
exports.paymentService = { checkout, webhook, getPaymentDetails };
