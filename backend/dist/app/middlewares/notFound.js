"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notfound = void 0;
const notfound = (_req, res, _next) => {
    res.status(404).json({
        success: false,
        message: "Resource not found",
        errors: null,
    });
};
exports.notfound = notfound;
