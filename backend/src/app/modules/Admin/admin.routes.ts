import express from "express";
import { authorize } from "../../middlewares/authorize";
import requestValidate from "../../middlewares/requestValidation";
import { asyncHandler } from "../../utils/asyncHandler";
import { adminController } from "./admin.controller";

const router = express.Router();

// Get Stats
router.get(
  "/stats",
  authorize("ADMIN"),
  asyncHandler(adminController.getStats),
);

router.get("/bookings", authorize(), asyncHandler(adminController.getBookings));

export const adminRoutes = router;
