"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomRoutes = void 0;
const express_1 = require("express");
const requestValidation_1 = __importDefault(require("../../middlewares/requestValidation"));
const asyncHandler_1 = require("../../utils/asyncHandler");
const authorize_1 = require("../../middlewares/authorize");
const room_validation_1 = require("./room.validation");
const room_controller_1 = require("./room.controller");
const router = (0, express_1.Router)();
// Hotel_Owner - Add room to hotel
router.post("/hotels/:id/rooms", (0, authorize_1.authorize)("HOTEL_OWNER"), (0, requestValidation_1.default)(room_validation_1.roomSchemaValidation.addRoom), (0, asyncHandler_1.asyncHandler)(room_controller_1.roomController.addRoom));
// Get list of room for single hotel
router.get("/hotels/:id/rooms", (0, asyncHandler_1.asyncHandler)(room_controller_1.roomController.getListOfRoomForHotel));
// Get room details
router.get("/rooms/:id", (0, asyncHandler_1.asyncHandler)(room_controller_1.roomController.getRoomDetails));
// Hotel_Owner - Update room
router.put("/rooms/:id", (0, authorize_1.authorize)("HOTEL_OWNER"), (0, requestValidation_1.default)(room_validation_1.roomSchemaValidation.updateRoom), (0, asyncHandler_1.asyncHandler)(room_controller_1.roomController.updateRoom));
// Hotel_Owner - Delete room
router.delete("/rooms/:id", (0, authorize_1.authorize)("HOTEL_OWNER"), (0, asyncHandler_1.asyncHandler)(room_controller_1.roomController.deleteRoom));
exports.roomRoutes = router;
