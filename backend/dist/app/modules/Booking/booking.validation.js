"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingSchemaValidation = void 0;
const zod_1 = require("zod");
const bookARoom = zod_1.z
    .object({
    roomId: zod_1.z
        .string({ required_error: "roomId is required!" })
        .uuid({ message: "invalid_id" }),
    fromDate: zod_1.z.coerce.date().refine((d) => d >= new Date(), {
        message: "fromDate must be in the future",
    }),
    toDate: zod_1.z.coerce.date(),
})
    .superRefine((data, ctx) => {
    if (data.toDate <= data.fromDate) {
        ctx.addIssue({
            path: ["toDate"],
            code: zod_1.z.ZodIssueCode.custom,
            message: "toDate must be after fromDate",
        });
    }
});
exports.bookingSchemaValidation = { bookARoom };
