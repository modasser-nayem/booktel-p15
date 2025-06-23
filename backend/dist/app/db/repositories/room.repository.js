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
exports.roomRepository = void 0;
const connector_1 = __importDefault(require("../connector"));
const hotel_repository_1 = require("./hotel.repository");
const getRoomById = (roomId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield connector_1.default.room.findUnique({ where: { id: roomId } });
});
const getHotelById = (hotelId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield hotel_repository_1.hotelRepository.getHotelById(hotelId);
});
const addRoom = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield connector_1.default.room.create({
        data: data,
    });
});
const getListOfRoom = (hotelId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield connector_1.default.room.findMany({ where: { hotelId: hotelId } });
});
const getRoomDetails = (roomId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield connector_1.default.room.findUnique({ where: { id: roomId } });
});
const updateRoom = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield connector_1.default.room.update({
        where: { id: payload.roomId },
        data: payload.data,
    });
});
const deleteRoom = (roomId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield connector_1.default.room.delete({ where: { id: roomId } });
});
exports.roomRepository = {
    getRoomById,
    getHotelById,
    addRoom,
    getListOfRoom,
    getRoomDetails,
    updateRoom,
    deleteRoom,
};
