"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const authorize_1 = require("../../middlewares/authorize");
const requestValidation_1 = __importDefault(require("../../middlewares/requestValidation"));
const asyncHandler_1 = require("../../utils/asyncHandler");
const payment_validation_1 = require("./payment.validation");
const payment_controller_1 = require("./payment.controller");
const router = express_1.default.Router();
// Checkout Payment
router.post("/checkout", (0, authorize_1.authorize)(), (0, requestValidation_1.default)(payment_validation_1.paymentSchemaValidation.checkout), (0, asyncHandler_1.asyncHandler)(payment_controller_1.paymentController.checkout));
// Webhook
router.post("/webhook", express_1.default.raw({ type: "application/json" }), (0, asyncHandler_1.asyncHandler)(payment_controller_1.paymentController.webhook));
// Get Payment Details
router.get("/:id", (0, authorize_1.authorize)(), (0, asyncHandler_1.asyncHandler)(payment_controller_1.paymentController.getPaymentDetails));
exports.paymentRoutes = router;
