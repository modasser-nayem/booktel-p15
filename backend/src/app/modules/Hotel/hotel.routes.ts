import { Router } from "express";
import requestValidate from "../../middlewares/requestValidation";
import { asyncHandler } from "../../utils/asyncHandler";
import { authorize } from "../../middlewares/authorize";
import { hotelSchemaValidation } from "./hotel.validation";
import { hotelController } from "./hotel.controller";

const router = Router();

// Hotel_Owner - Create Hotel
router.post(
  "/",
  authorize("HOTEL_OWNER"),
  requestValidate(hotelSchemaValidation.createHotel),
  asyncHandler(hotelController.createHotel),
);

// get all hotels (filters: location, price, rating, status)
router.get("/", asyncHandler(hotelController.getHotels));

// HotelOwner - List of my hotels (filters: location, price, rating, status)
router.get(
  "/me",
  authorize("HOTEL_OWNER"),
  asyncHandler(hotelController.getMyHotels),
);

// Get hotel details
router.get("/:id", asyncHandler(hotelController.getHotelDetails));

// Owner/Admin - Update hotel
router.put(
  "/:id",
  authorize("ADMIN", "HOTEL_OWNER"),
  requestValidate(hotelSchemaValidation.updateHotel),
  asyncHandler(hotelController.updateHotel),
);

// Owner/Admin - Delete hotel
router.delete(
  "/:id",
  authorize("ADMIN", "HOTEL_OWNER"),
  asyncHandler(hotelController.deleteHotel),
);

// Admin - Approve/Reject hotel
router.patch(
  "/:id/status",
  authorize("ADMIN"),
  requestValidate(hotelSchemaValidation.updateHotelStatus),
  asyncHandler(hotelController.updateHotelStatus),
);

export const hotelRoutes = router;
