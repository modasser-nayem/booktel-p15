"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireEnv = requireEnv;
exports.requireNumberEnv = requireNumberEnv;
function requireEnv(key) {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Environment variable ${key} is missing or empty. Did you forget to create a .env or set environment variables?`);
    }
    return value;
}
function requireNumberEnv(key) {
    const value = requireEnv(key);
    const number = Number(value);
    if (isNaN(number)) {
        throw new Error(`Environment variable ${key} is missing or empty. Did you forget to create a .env or set environment variables?`);
    }
    return number;
}
