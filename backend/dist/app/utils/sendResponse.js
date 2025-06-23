"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, data) => {
    res.status(data.statusCode).json({
        success: data.success,
        message: data.message,
        data: data.data,
        meta: data === null || data === void 0 ? void 0 : data.meta,
    });
};
exports.default = sendResponse;
