import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { reviewService } from "./review.service";

const createReview = async (req: Request, res: Response) => {
  const result = await reviewService.createReview({
    bookId: req.params.bookId,
    userId: req.user.id,
    rating: req.body.rating,
    comment: req.body.comment,
    hotelId: "",
  });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Review created successfully.",
    data: result,
  });
};

const getHotelReviews = async (req: Request, res: Response) => {
  const result = await reviewService.getHotelReviews({
    hotelId: req.params.hotelId,
    query: req.query,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Hotel reviews retrieved successfully.",
    data: result,
  });
};

export const reviewController = { createReview, getHotelReviews };
