"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const authorize_1 = require("../../middlewares/authorize");
const requestValidation_1 = __importDefault(require("../../middlewares/requestValidation"));
const asyncHandler_1 = require("../../utils/asyncHandler");
const review_validation_1 = require("./review.validation");
const review_controller_1 = require("./review.controller");
const router = express_1.default.Router();
// Create Review
router.post("/reviews/:bookId", (0, authorize_1.authorize)(), (0, requestValidation_1.default)(review_validation_1.reviewSchemaValidation.create), (0, asyncHandler_1.asyncHandler)(review_controller_1.reviewController.createReview));
// Get Hotel Reviews
router.get("/hotels/:hotelId/reviews", (0, asyncHandler_1.asyncHandler)(review_controller_1.reviewController.getHotelReviews));
exports.reviewRoutes = router;
