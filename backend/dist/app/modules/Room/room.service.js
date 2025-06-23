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
exports.roomService = void 0;
const room_repository_1 = require("../../db/repositories/room.repository");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const addRoom = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const hotel = yield room_repository_1.roomRepository.getHotelById(data.hotelId);
    if (!hotel) {
        throw new AppError_1.default(404, "invalid hotel_id");
    }
    if (hotel.status !== "APPROVED") {
        throw new AppError_1.default(400, "hotel is not approved yet");
    }
    return yield room_repository_1.roomRepository.addRoom(data);
});
const getListOfRoomForHotel = (hotelId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield room_repository_1.roomRepository.getHotelById(hotelId))) {
        throw new AppError_1.default(404, "invalid hotel_id");
    }
    return yield room_repository_1.roomRepository.getListOfRoom(hotelId);
});
const getRoomDetails = (roomId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield room_repository_1.roomRepository.getRoomById(roomId))) {
        throw new AppError_1.default(404, "invalid room_id");
    }
    return yield room_repository_1.roomRepository.getRoomById(roomId);
});
const updateRoom = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield room_repository_1.roomRepository.getRoomById(payload.roomId))) {
        throw new AppError_1.default(404, "invalid room_id");
    }
    return yield room_repository_1.roomRepository.updateRoom(payload);
});
const deleteRoom = (roomId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield room_repository_1.roomRepository.getRoomById(roomId))) {
        throw new AppError_1.default(404, "invalid room_id");
    }
    return yield room_repository_1.roomRepository.deleteRoom(roomId);
});
exports.roomService = {
    addRoom,
    getListOfRoomForHotel,
    getRoomDetails,
    updateRoom,
    deleteRoom,
};
