"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewSchemaValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    rating: zod_1.z.number().min(1).max(5),
    comment: zod_1.z
        .string()
        .max(1000)
        .refine((v) => v !== "", {
        message: "Comment cannot be empty",
    })
        .optional(),
});
exports.reviewSchemaValidation = { create };
