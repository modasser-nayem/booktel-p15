import { z } from "zod";

const addRoom = z.object({
  type: z.enum(["SINGLE", "DOUBLE", "DELUXE", "SUITE"], {
    required_error: "type is required",
  }),
  price: z.number({ required_error: "price is required" }).min(0),
  beds: z.number({ required_error: "beds is required" }).min(0),
  photos: z
    .array(
      z.string().refine((value) => value !== "", {
        message: "can't provide array of empty '' in photos array",
      }),
    )
    .min(2, { message: "please provide minimum 2 photos" }),
  availableFrom: z
    .string({ required_error: "availableFrom is required" })
    .datetime({
      message: "availableFrom must be a valid ISO date-time string",
    }),
  availableTo: z
    .string({ required_error: "availableTo is required" })
    .datetime({ message: "availableTo must be a valid ISO date-time string" }),
});

const updateRoom = z.object({
  type: z.enum(["SINGLE", "DOUBLE", "DELUXE", "SUITE"]).optional(),
  price: z.number({ required_error: "price is required" }).min(0).optional(),
  beds: z.number({ required_error: "beds is required" }).min(0).optional(),
  photos: z
    .array(
      z
        .string()
        .refine((value) => value !== "", { message: "can't provide empty ''" }),
    )
    .min(2, { message: "please provide minimum 2 photos" })
    .optional(),
  availableFrom: z
    .string()
    .datetime({ message: "availableTo must be a valid ISO date-time string" })
    .optional(),
  availableTo: z
    .string()
    .datetime({ message: "availableTo must be a valid ISO date-time string" })
    .optional(),
});

export const roomSchemaValidation = { addRoom, updateRoom };
