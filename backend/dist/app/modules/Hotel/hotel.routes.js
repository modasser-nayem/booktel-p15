"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hotelRoutes = void 0;
const express_1 = require("express");
const requestValidation_1 = __importDefault(require("../../middlewares/requestValidation"));
const asyncHandler_1 = require("../../utils/asyncHandler");
const authorize_1 = require("../../middlewares/authorize");
const hotel_validation_1 = require("./hotel.validation");
const hotel_controller_1 = require("./hotel.controller");
const router = (0, express_1.Router)();
// Hotel_Owner - Create Hotel
router.post("/", (0, authorize_1.authorize)("HOTEL_OWNER"), (0, requestValidation_1.default)(hotel_validation_1.hotelSchemaValidation.createHotel), (0, asyncHandler_1.asyncHandler)(hotel_controller_1.hotelController.createHotel));
// get all hotels (filters: location, price, rating, status)
router.get("/", (0, asyncHandler_1.asyncHandler)(hotel_controller_1.hotelController.getHotels));
// HotelOwner - List of my hotels (filters: location, price, rating, status)
router.get("/me", (0, authorize_1.authorize)("HOTEL_OWNER"), (0, asyncHandler_1.asyncHandler)(hotel_controller_1.hotelController.getMyHotels));
// Get hotel details
router.get("/:id", (0, asyncHandler_1.asyncHandler)(hotel_controller_1.hotelController.getHotelDetails));
// Owner/Admin - Update hotel
router.put("/:id", (0, authorize_1.authorize)("ADMIN", "HOTEL_OWNER"), (0, requestValidation_1.default)(hotel_validation_1.hotelSchemaValidation.updateHotel), (0, asyncHandler_1.asyncHandler)(hotel_controller_1.hotelController.updateHotel));
// Owner/Admin - Delete hotel
router.delete("/:id", (0, authorize_1.authorize)("ADMIN", "HOTEL_OWNER"), (0, asyncHandler_1.asyncHandler)(hotel_controller_1.hotelController.deleteHotel));
// Admin - Approve/Reject hotel
router.patch("/:id/status", (0, authorize_1.authorize)("ADMIN"), (0, requestValidation_1.default)(hotel_validation_1.hotelSchemaValidation.updateHotelStatus), (0, asyncHandler_1.asyncHandler)(hotel_controller_1.hotelController.updateHotelStatus));
exports.hotelRoutes = router;
