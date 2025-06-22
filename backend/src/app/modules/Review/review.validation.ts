import { z } from "zod";

const create = z.object({
  rating: z.number().min(1).max(5),
  comment: z
    .string()
    .max(1000)
    .refine((v) => v !== "", {
      message: "Comment cannot be empty",
    })
    .optional(),
});

export const reviewSchemaValidation = { create };
