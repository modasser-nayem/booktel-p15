import { Router } from "express";
import { authorize } from "../../middlewares/authorize";
import requestValidate from "../../middlewares/requestValidation";
import { bookingSchemaValidation } from "./booking.validation";
import { asyncHandler } from "../../utils/asyncHandler";
import { bookingController } from "./booking.controller";

const router = Router();

// Book a room
router.post(
  "/",
  authorize("CUSTOMER"),
  requestValidate(bookingSchemaValidation.bookARoom),
  asyncHandler(bookingController.bookARoom),
);

// My Bookings
router.get("/me", authorize(), asyncHandler(bookingController.getMyBooking));

// Get booking details
router.get(
  "/:id",
  authorize(),
  asyncHandler(bookingController.getBookingDetails),
);

// Cancel booking
router.delete(
  "/:id",
  authorize("CUSTOMER"),
  asyncHandler(bookingController.cancelBooking),
);

export const bookingRoutes = router;
