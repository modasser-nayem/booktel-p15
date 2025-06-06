import { Router } from "express";
import requestValidate from "../../middlewares/requestValidation";
import { asyncHandler } from "../../utils/asyncHandler";
import { authorize } from "../../middlewares/authorize";
import { roomSchemaValidation } from "./room.validation";
import { roomController } from "./room.controller";

const router = Router();

// Hotel_Owner - Add room to hotel
router.post(
  "/hotels/:id/rooms",
  authorize("HOTEL_OWNER"),
  requestValidate(roomSchemaValidation.addRoom),
  asyncHandler(roomController.addRoom),
);

// Get list of room for single hotel
router.get(
  "/hotels/:id/rooms",
  asyncHandler(roomController.getListOfRoomForHotel),
);

// Get room details
router.get("/rooms/:id", asyncHandler(roomController.getRoomDetails));

// Hotel_Owner - Update room
router.put(
  "/rooms/:id",
  authorize("HOTEL_OWNER"),
  requestValidate(roomSchemaValidation.updateRoom),
  asyncHandler(roomController.updateRoom),
);

// Hotel_Owner - Delete room
router.delete(
  "/rooms/:id",
  authorize("HOTEL_OWNER"),
  asyncHandler(roomController.deleteRoom),
);

export const roomRoutes = router;
