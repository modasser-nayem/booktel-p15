import express from "express";
import { authorize } from "../../middlewares/authorize";
import requestValidate from "../../middlewares/requestValidation";
import { asyncHandler } from "../../utils/asyncHandler";
import { reviewSchemaValidation } from "./review.validation";
import { reviewController } from "./review.controller";

const router = express.Router();

// Create Review
router.post(
  "/reviews/:bookId",
  authorize(),
  requestValidate(reviewSchemaValidation.create),
  asyncHandler(reviewController.createReview),
);

// Get Hotel Reviews
router.get(
  "/hotels/:hotelId/reviews",
  asyncHandler(reviewController.getHotelReviews),
);

export const reviewRoutes = router;
