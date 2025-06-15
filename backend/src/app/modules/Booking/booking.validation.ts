import { z } from "zod";

const bookARoom = z
  .object({
    roomId: z
      .string({ required_error: "roomId is required!" })
      .uuid({ message: "invalid_id" }),
    fromDate: z.coerce.date().refine((d) => d >= new Date(), {
      message: "fromDate must be in the future",
    }),
    toDate: z.coerce.date(),
  })
  .superRefine((data, ctx) => {
    if (data.toDate <= data.fromDate) {
      ctx.addIssue({
        path: ["toDate"],
        code: z.ZodIssueCode.custom,
        message: "toDate must be after fromDate",
      });
    }
  });

export const bookingSchemaValidation = { bookARoom };
