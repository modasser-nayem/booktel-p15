import express from "express";
import { authorize } from "../../middlewares/authorize";
import requestValidate from "../../middlewares/requestValidation";
import { asyncHandler } from "../../utils/asyncHandler";
import { paymentSchemaValidation } from "./payment.validation";
import { paymentController } from "./payment.controller";

const router = express.Router();

// Checkout Payment
router.post(
  "/checkout",
  authorize(),
  requestValidate(paymentSchemaValidation.checkout),
  asyncHandler(paymentController.checkout),
);

// Webhook
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  asyncHandler(paymentController.webhook),
);

export const paymentRoutes = router;
