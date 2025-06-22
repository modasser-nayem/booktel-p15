import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { bookingService } from "./booking.service";

const bookARoom = async (req: Request, res: Response) => {
  const result = await bookingService.bookARoom({
    ...req.body,
    userId: req.user.id,
  });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "You are successfully booked a room",
    data: result,
  });
};

const getMyBooking = async (req: Request, res: Response) => {
  const result = await bookingService.getMyBooking({
    userId: req.user.id,
    query: req.query,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved bookings",
    data: result,
  });
};

const getBookingDetails = async (req: Request, res: Response) => {
  const result = await bookingService.getBookingDetails(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved booking details",
    data: result,
  });
};

const cancelBooking = async (req: Request, res: Response) => {
  const result = await bookingService.cancelBooking({
    bookId: req.params.id,
    userId: req.user.id,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully canceled your booking",
    data: result,
  });
};

export const bookingController = {
  bookARoom,
  getMyBooking,
  getBookingDetails,
  cancelBooking,
};
