"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentSchemaValidation = void 0;
const zod_1 = require("zod");
const checkout = zod_1.z.object({
    bookingId: zod_1.z
        .string({ required_error: "bookingId is required!" })
        .uuid({ message: "invalid_id" }),
});
exports.paymentSchemaValidation = { checkout };
