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
exports.paymentController = void 0;
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const payment_service_1 = require("./payment.service");
const checkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_service_1.paymentService.checkout(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Redirecting to Stripe...",
        data: result,
    });
});
const webhook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_service_1.paymentService.webhook({
        signature: req.headers["stripe-signature"],
        body: req.body,
    });
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Webhook received",
        data: result,
    });
});
const getPaymentDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paymentId = req.params.id;
    const result = yield payment_service_1.paymentService.getPaymentDetails(paymentId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Payment details retrieved successfully",
        data: result,
    });
});
exports.paymentController = { checkout, webhook, getPaymentDetails };
