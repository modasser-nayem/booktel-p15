import { bookingRepository } from "../../db/repositories/booking.repository";
import AppError from "../../errors/AppError";
import { TBookARoom, TGetBookingQuery } from "./booking.interface";

const bookARoom = async (data: TBookARoom) => {
  // TODO: for hosting issus, i clean expire pending bookings in here
  await bookingRepository.cleanUnpaidBookings();

  const room = await bookingRepository.getRoomById(data.roomId);

  if (!room) {
    throw new AppError(404, "Room not found!");
  }

  // Parse and normalize to UTC 00:00
  const fromDate = new Date(data.fromDate);
  const toDate = new Date(data.toDate);
  fromDate.setUTCHours(0, 0, 0, 0);
  toDate.setUTCHours(0, 0, 0, 0);

  const now = new Date();

  // validate date range
  if (fromDate < now || fromDate >= toDate) {
    throw new AppError(400, "invalid date range");
  }

  // check room availability window
  if (fromDate < room.availableFrom || toDate > room.availableTo) {
    throw new AppError(400, "Room not available for selected dates");
  }

  // Check for overlapping bookings (pending or booked)
  const conflict = await bookingRepository.isOverlappingBooking({
    roomId: room.id,
    fromDate,
    toDate,
  });
  if (conflict) {
    throw new AppError(409, "Room already booked or held for these dates");
  }

  // calculate total price
  const nights =
    (toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24);
  const totalPrice = Math.ceil(nights) * room.price;

  return bookingRepository.bookARoom({ ...data, totalPrice });
};

const getMyBooking = async (payload: {
  userId: string;
  query: TGetBookingQuery;
}) => {
  return await bookingRepository.getMyBooking(payload);
};

const getBookingDetails = async (bookId: string) => {
  return await bookingRepository.getBookingDetails(bookId);
};

const cancelBooking = async (payload: { bookId: string; userId: string }) => {
  const booking = await bookingRepository.findBookingById(payload.bookId);

  if (!booking) {
    throw new AppError(400, "invalid_id");
  }

  if (booking.userId !== payload.userId) {
    throw new AppError(403, "you don't have permission to cancel this booking");
  }

  if (booking.status !== "BOOKED") {
    throw new AppError(400, "non-cancelable booking");
  }

  const now = new Date();

  if (booking.fromDate <= now) {
    throw new AppError(400, "Booking already started, can’t cancel");
  }

  return await bookingRepository.cancelBooking(payload.bookId);
};

export const bookingService = {
  bookARoom,
  getMyBooking,
  getBookingDetails,
  cancelBooking,
};
