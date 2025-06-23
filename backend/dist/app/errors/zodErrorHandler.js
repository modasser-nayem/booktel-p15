"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zodErrorHandler = (err) => {
    const message = err.issues[0].message;
    const error = err.issues.map((issue) => ({
        path: issue.path[issue.path.length - 1],
        message: issue.message,
    }));
    return {
        statusCode: 400,
        message: message,
        error: error,
    };
};
exports.default = zodErrorHandler;
