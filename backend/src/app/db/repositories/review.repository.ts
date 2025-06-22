import { Prisma, Review } from "@prisma/client";
import {
  TCreateReview,
  TGetReviewsQuery,
} from "../../modules/Review/review.interface";
import { paginate } from "../../utils/pagination";
import prisma from "../connector";

const createReview = async (data: TCreateReview) => {
  const existingReview = await prisma.review.findFirst({
    where: {
      userId: data.userId,
      hotelId: data.hotelId,
    },
  });

  const select: Prisma.ReviewSelect = {
    id: true,
    user: {
      select: {
        id: true,
        name: true,
      },
    },
    rating: true,
    comment: true,
    hotelId: true,
    createdAt: true,
  };

  if (existingReview) {
    return await prisma.review.update({
      where: {
        id: existingReview.id,
      },
      data: {
        rating: data.rating,
        comment: data.comment,
      },
      select,
    });
  }

  return await prisma.review.create({
    data: {
      userId: data.userId,
      hotelId: data.hotelId,
      rating: data.rating,
      comment: data.comment,
    },
    select,
  });
};

const getHotelReviews = async (payload: {
  hotelId: string;
  query: TGetReviewsQuery;
}) => {
  const { page, limit, sortBy, sortOrder } = payload.query;

  const where: Prisma.ReviewWhereInput = {
    hotelId: payload.hotelId,
  };

  const select: Prisma.ReviewSelect = {
    id: true,
    user: {
      select: {
        id: true,
        name: true,
      },
    },
    rating: true,
    comment: true,
    createdAt: true,
    hotelId: true,
  };

  return await paginate<Review[]>({
    model: prisma.review,
    where,
    select,
    page,
    limit,
    sortBy,
    sortOrder,
  });
};

export const reviewRepository = {
  createReview,
  getHotelReviews,
};
