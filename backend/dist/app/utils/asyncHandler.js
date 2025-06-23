"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = void 0;
const asyncHandler = (func) => (req, res, next) => Promise.resolve(func(req, res, next)).catch((err) => next(err));
exports.asyncHandler = asyncHandler;
