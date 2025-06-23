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
exports.hotelService = void 0;
const hotel_repository_1 = require("../../db/repositories/hotel.repository");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const createHotel = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    payload.data.ownerId = payload.owner.id;
    return yield hotel_repository_1.hotelRepository.createHotel({ data: payload.data });
});
const getHotels = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield hotel_repository_1.hotelRepository.getHotels(payload.query);
});
const getMyHotels = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield hotel_repository_1.hotelRepository.getMyHotels({
        ownerId: payload.ownerId,
        query: payload.query,
    });
});
const getHotelDetails = (hotelId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield hotel_repository_1.hotelRepository.getHotelDetails(hotelId);
    if (!result) {
        throw new AppError_1.default(404, "invalid hotel_id");
    }
    return result;
});
const updateHotel = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const hotel = yield hotel_repository_1.hotelRepository.getHotelById(payload.hotelId);
    if (!hotel) {
        throw new AppError_1.default(404, "invalid hotel_id");
    }
    return yield hotel_repository_1.hotelRepository.updateHotel(payload);
});
const deleteHotel = (hotelId) => __awaiter(void 0, void 0, void 0, function* () {
    const hotel = yield hotel_repository_1.hotelRepository.getHotelById(hotelId);
    if (!hotel) {
        throw new AppError_1.default(404, "invalid hotel_id");
    }
    return yield hotel_repository_1.hotelRepository.deleteHotel(hotelId);
});
const updateHotelStatus = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const hotel = yield hotel_repository_1.hotelRepository.getHotelById(payload.hotelId);
    if (!hotel) {
        throw new AppError_1.default(404, "invalid hotel_id");
    }
    return yield hotel_repository_1.hotelRepository.updateHotelStatus(payload);
});
exports.hotelService = {
    createHotel,
    getHotels,
    getMyHotels,
    getHotelDetails,
    updateHotel,
    deleteHotel,
    updateHotelStatus,
};
