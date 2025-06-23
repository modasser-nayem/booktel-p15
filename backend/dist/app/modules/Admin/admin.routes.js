"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const authorize_1 = require("../../middlewares/authorize");
const asyncHandler_1 = require("../../utils/asyncHandler");
const admin_controller_1 = require("./admin.controller");
const router = express_1.default.Router();
// Get Stats
router.get("/stats", (0, authorize_1.authorize)("ADMIN"), (0, asyncHandler_1.asyncHandler)(admin_controller_1.adminController.getStats));
router.get("/bookings", (0, authorize_1.authorize)(), (0, asyncHandler_1.asyncHandler)(admin_controller_1.adminController.getBookings));
exports.adminRoutes = router;
