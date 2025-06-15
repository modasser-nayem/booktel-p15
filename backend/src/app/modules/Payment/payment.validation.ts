import { z } from "zod";

const checkout = z.object({
  bookingId: z
    .string({ required_error: "bookingId is required!" })
    .uuid({ message: "invalid_id" }),
});

export const paymentSchemaValidation = { checkout };
