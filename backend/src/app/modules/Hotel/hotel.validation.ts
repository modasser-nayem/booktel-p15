import { z } from "zod";

const createHotel = z.object({
  name: z
    .string({ required_error: "name is required" })
    .refine((value) => value !== "", { message: "name is required" }),
  description: z
    .string({ required_error: "description is required" })
    .refine((value) => value !== "", { message: "description is required" }),
  location: z
    .string({ required_error: "location is required" })
    .refine((value) => value !== "", { message: "location is required" }),
  amenities: z
    .array(
      z
        .string()
        .refine((value) => value !== "", { message: "can't provide empty ''" }),
    )
    .min(5, { message: "please provide minimum 2 amenities" }),
  photos: z
    .array(
      z
        .string()
        .refine((value) => value !== "", { message: "can't provide empty ''" }),
    )
    .min(2, { message: "please provide minimum 2 photos" }),
});

const updateHotel = z.object({
  name: z
    .string()
    .refine((value) => value !== "", { message: "name is required" })
    .optional(),
  description: z
    .string()
    .refine((value) => value !== "", { message: "description is required" })
    .optional(),
  location: z
    .string()
    .refine((value) => value !== "", { message: "location is required" })
    .optional(),
  amenities: z
    .array(
      z
        .string()
        .refine((value) => value !== "", { message: "can't provide empty ''" }),
    )
    .optional(),
  photos: z
    .array(
      z
        .string()
        .refine((value) => value !== "", { message: "can't provide empty ''" }),
    )
    .min(2, { message: "please provide minimum 2 photos" })
    .optional(),
});

const updateHotelStatus = z.object({
  status: z.enum(["PENDING", "APPROVED", "REJECTED"], {
    required_error: "status is required",
  }),
});

export const hotelSchemaValidation = {
  createHotel,
  updateHotel,
  updateHotelStatus,
};
