import { z } from "zod";
import { reviewSchemaValidation } from "./review.validation";
import { PaginationQuery } from "../../types/pagination";

export type TCreateReview = z.infer<typeof reviewSchemaValidation.create> & {
  userId: string;
  hotelId: string;
  bookId: string;
};

export type TGetReviewsQuery = PaginationQuery;
