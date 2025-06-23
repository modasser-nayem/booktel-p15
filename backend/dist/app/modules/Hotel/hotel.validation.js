"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hotelSchemaValidation = void 0;
const zod_1 = require("zod");
const createHotel = zod_1.z.object({
    name: zod_1.z
        .string({ required_error: "name is required" })
        .refine((value) => value !== "", { message: "name is required" }),
    description: zod_1.z
        .string({ required_error: "description is required" })
        .refine((value) => value !== "", { message: "description is required" }),
    location: zod_1.z
        .string({ required_error: "location is required" })
        .refine((value) => value !== "", { message: "location is required" }),
    amenities: zod_1.z
        .array(zod_1.z
        .string()
        .refine((value) => value !== "", { message: "can't provide empty ''" }))
        .min(5, { message: "please provide minimum 2 amenities" }),
    photos: zod_1.z
        .array(zod_1.z
        .string()
        .refine((value) => value !== "", { message: "can't provide empty ''" }))
        .min(2, { message: "please provide minimum 2 photos" }),
});
const updateHotel = zod_1.z.object({
    name: zod_1.z
        .string()
        .refine((value) => value !== "", { message: "name is required" })
        .optional(),
    description: zod_1.z
        .string()
        .refine((value) => value !== "", { message: "description is required" })
        .optional(),
    location: zod_1.z
        .string()
        .refine((value) => value !== "", { message: "location is required" })
        .optional(),
    amenities: zod_1.z
        .array(zod_1.z
        .string()
        .refine((value) => value !== "", { message: "can't provide empty ''" }))
        .optional(),
    photos: zod_1.z
        .array(zod_1.z
        .string()
        .refine((value) => value !== "", { message: "can't provide empty ''" }))
        .min(2, { message: "please provide minimum 2 photos" })
        .optional(),
});
const updateHotelStatus = zod_1.z.object({
    status: zod_1.z.enum(["PENDING", "APPROVED", "REJECTED"], {
        required_error: "status is required",
    }),
});
exports.hotelSchemaValidation = {
    createHotel,
    updateHotel,
    updateHotelStatus,
};
