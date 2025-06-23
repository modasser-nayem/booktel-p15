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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hotelRepository = exports.getHotels = void 0;
const pagination_1 = require("../../utils/pagination");
const connector_1 = __importDefault(require("../connector"));
const getHotelById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield connector_1.default.hotel.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            description: true,
            ownerId: true,
            status: true,
        },
    });
});
const createHotel = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield connector_1.default.hotel.create({
        data: payload.data,
        select: {
            id: true,
            name: true,
            description: true,
            ownerId: true,
            amenities: true,
            location: true,
            photos: true,
            status: true,
        },
    });
});
const getHotels = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { location, status, roomType, priceMin, priceMax, amenities, checkIn, checkOut, sortBy, sortOrder, page = 1, limit = 10, } = query;
    // =======================
    // Dynamic WHERE conditions
    // =======================
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where = Object.assign(Object.assign(Object.assign(Object.assign({}, (location && { location: { contains: location, mode: "insensitive" } })), (status && { status: status.toUpperCase() })), (amenities && {
        amenities: {
            hasSome: amenities, // array includes some values
        },
    })), ((priceMin || priceMax) && {
        rooms: {
            some: Object.assign(Object.assign(Object.assign({}, (roomType && { type: roomType.toUpperCase() })), { price: Object.assign(Object.assign({}, (priceMin && { gte: priceMin })), (priceMax && { lte: priceMax })) }), (checkIn &&
                checkOut && {
                availableFrom: { lte: new Date(checkIn) },
                availableTo: { gte: new Date(checkOut) },
            })),
        },
    }));
    // =======================
    // SELECT Fields
    // =======================
    const select = {
        id: true,
        name: true,
        description: true,
        amenities: true,
        location: true,
        photos: true,
        status: true,
        _count: {
            select: {
                rooms: true,
            },
        },
    };
    // =======================
    // Execute paginated query
    // =======================
    const result = yield (0, pagination_1.paginate)({
        model: connector_1.default.hotel,
        page,
        limit,
        where,
        select,
        sortBy,
        sortOrder,
    });
    return result;
});
exports.getHotels = getHotels;
const getMyHotels = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = payload;
    const where = Object.assign(Object.assign({ ownerId: payload.ownerId }, (query.rating && { rating: query.rating })), (query.status && { status: query.status.toUpperCase() }));
    const select = {
        id: true,
        name: true,
        description: true,
        amenities: true,
        location: true,
        photos: true,
        status: true,
        _count: {
            select: {
                rooms: true,
            },
        },
    };
    const result = yield (0, pagination_1.paginate)({
        model: connector_1.default.hotel,
        where,
        select,
        sortBy: query.sortBy || "createdAt",
        sortOrder: query.sortOrder || "desc",
        page: query.page,
        limit: query.limit,
    });
    return result;
});
const getHotelDetails = (hotelId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield connector_1.default.hotel.findUnique({
        where: { id: hotelId },
        select: {
            id: true,
            ownerId: true,
            name: true,
            description: true,
            amenities: true,
            location: true,
            photos: true,
            status: true,
            rooms: {
                select: {
                    id: true,
                    type: true,
                    beds: true,
                    price: true,
                    photos: true,
                    availableFrom: true,
                    availableTo: true,
                },
            },
            createdAt: true,
            updatedAt: true,
        },
    });
});
const updateHotel = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield connector_1.default.hotel.update({
        where: { id: payload.hotelId },
        data: payload.data,
        select: {
            id: true,
            ownerId: true,
            name: true,
            description: true,
            amenities: true,
            location: true,
            photos: true,
            status: true,
        },
    });
});
const deleteHotel = (hotelId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield connector_1.default.$transaction((tran) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield tran.hotel.delete({
            where: { id: hotelId },
            select: {
                id: true,
                ownerId: true,
                name: true,
                description: true,
                amenities: true,
                location: true,
                photos: true,
                status: true,
            },
        });
        yield tran.room.deleteMany({ where: { hotelId: hotelId } });
        return result;
    }));
});
const updateHotelStatus = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield connector_1.default.hotel.update({
        where: { id: payload.hotelId },
        data: payload.data,
        select: {
            id: true,
            name: true,
            status: true,
        },
    });
});
exports.hotelRepository = {
    getHotelById,
    createHotel,
    getHotels: exports.getHotels,
    getMyHotels,
    getHotelDetails,
    updateHotel,
    deleteHotel,
    updateHotelStatus,
};
