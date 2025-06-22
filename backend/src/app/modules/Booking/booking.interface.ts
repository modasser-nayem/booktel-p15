import { z } from "zod";
import { bookingSchemaValidation } from "./booking.validation";
import { PaginationQuery } from "../../types/pagination";
import { BookingStatus } from "@prisma/client";

export type TBookARoom = z.infer<typeof bookingSchemaValidation.bookARoom> & {
  userId: string;
};

export type TGetBookingQuery = PaginationQuery & {
  status?: BookingStatus;
  fromDate?: Date;
  toDate?: Date;
};
