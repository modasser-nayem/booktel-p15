"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRoutes = void 0;
const express_1 = require("express");
const authorize_1 = require("../../middlewares/authorize");
const requestValidation_1 = __importDefault(require("../../middlewares/requestValidation"));
const booking_validation_1 = require("./booking.validation");
const asyncHandler_1 = require("../../utils/asyncHandler");
const booking_controller_1 = require("./booking.controller");
const router = (0, express_1.Router)();
// Book a room
router.post("/", (0, authorize_1.authorize)("CUSTOMER"), (0, requestValidation_1.default)(booking_validation_1.bookingSchemaValidation.bookARoom), (0, asyncHandler_1.asyncHandler)(booking_controller_1.bookingController.bookARoom));
// My Bookings
router.get("/me", (0, authorize_1.authorize)(), (0, asyncHandler_1.asyncHandler)(booking_controller_1.bookingController.getMyBooking));
// Get booking details
router.get("/:id", (0, authorize_1.authorize)(), (0, asyncHandler_1.asyncHandler)(booking_controller_1.bookingController.getBookingDetails));
// Cancel booking
router.delete("/:id", (0, authorize_1.authorize)("CUSTOMER"), (0, asyncHandler_1.asyncHandler)(booking_controller_1.bookingController.cancelBooking));
exports.bookingRoutes = router;
