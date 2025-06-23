"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = paginate;
/* eslint-disable @typescript-eslint/no-explicit-any */
function paginate(_a) {
    return __awaiter(this, arguments, void 0, function* ({ model, page = 1, limit = 10, where = {}, select, sortBy = "createdAt", sortOrder = "desc", }) {
        page = Number(page);
        limit = Number(limit);
        const skip = (page - 1) * limit;
        const [data, total] = yield Promise.all([
            model.findMany({
                where,
                select,
                skip,
                take: limit,
                orderBy: { [sortBy]: sortOrder },
            }),
            model.count({ where }),
        ]);
        return {
            data,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    });
}
