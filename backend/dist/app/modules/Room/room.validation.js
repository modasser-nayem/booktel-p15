"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomSchemaValidation = void 0;
const zod_1 = require("zod");
const addRoom = zod_1.z.object({
    type: zod_1.z.enum(["SINGLE", "DOUBLE", "DELUXE", "SUITE"], {
        required_error: "type is required",
    }),
    price: zod_1.z.number({ required_error: "price is required" }).min(0),
    beds: zod_1.z.number({ required_error: "beds is required" }).min(0),
    photos: zod_1.z
        .array(zod_1.z.string().refine((value) => value !== "", {
        message: "can't provide array of empty '' in photos array",
    }))
        .min(2, { message: "please provide minimum 2 photos" }),
    availableFrom: zod_1.z
        .string({ required_error: "availableFrom is required" })
        .datetime({
        message: "availableFrom must be a valid ISO date-time string",
    }),
    availableTo: zod_1.z
        .string({ required_error: "availableTo is required" })
        .datetime({ message: "availableTo must be a valid ISO date-time string" }),
});
const updateRoom = zod_1.z.object({
    type: zod_1.z.enum(["SINGLE", "DOUBLE", "DELUXE", "SUITE"]).optional(),
    price: zod_1.z.number({ required_error: "price is required" }).min(0).optional(),
    beds: zod_1.z.number({ required_error: "beds is required" }).min(0).optional(),
    photos: zod_1.z
        .array(zod_1.z
        .string()
        .refine((value) => value !== "", { message: "can't provide empty ''" }))
        .min(2, { message: "please provide minimum 2 photos" })
        .optional(),
    availableFrom: zod_1.z
        .string()
        .datetime({ message: "availableTo must be a valid ISO date-time string" })
        .optional(),
    availableTo: zod_1.z
        .string()
        .datetime({ message: "availableTo must be a valid ISO date-time string" })
        .optional(),
});
exports.roomSchemaValidation = { addRoom, updateRoom };
