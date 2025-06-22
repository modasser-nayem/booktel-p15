import { bookingRepository } from "../../db/repositories/booking.repository";
import { reviewRepository } from "../../db/repositories/review.repository";
import AppError from "../../errors/AppError";
import { TCreateReview, TGetReviewsQuery } from "./review.interface";

const createReview = async (data: TCreateReview) => {
  const booking = await bookingRepository.findBookingById(data.bookId);

  if (!booking) {
    throw new AppError(404, "invalid booking_id");
  }

  if (booking.userId !== data.userId) {
    throw new AppError(
      403,
      "You are not allowed to create a review for this hotel",
    );
  }

  if (booking.status !== "BOOKED") {
    throw new AppError(400, "You can only review completed bookings");
  }

  data.hotelId = booking.room.hotelId;

  return await reviewRepository.createReview(data);
};

const getHotelReviews = async (payload: {
  hotelId: string;
  query: TGetReviewsQuery;
}) => {
  return await reviewRepository.getHotelReviews(payload);
};

export const reviewService = {
  createReview,
  getHotelReviews,
};
