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
exports.roomController = void 0;
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const room_service_1 = require("./room.service");
const addRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_service_1.roomService.addRoom(Object.assign(Object.assign({}, req.body), { hotelId: req.params.id }));
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "New Room Successfully added",
        data: result,
    });
});
const getListOfRoomForHotel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_service_1.roomService.getListOfRoomForHotel(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Successfully retrieved list of room",
        data: result,
    });
});
const getRoomDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_service_1.roomService.getRoomDetails(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Successfully retrieved room details",
        data: result,
    });
});
const updateRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_service_1.roomService.updateRoom({
        roomId: req.params.id,
        data: req.body,
    });
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Room information successfully updated",
        data: result,
    });
});
const deleteRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_service_1.roomService.deleteRoom(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Room successfully deleted",
        data: result,
    });
});
exports.roomController = {
    addRoom,
    getListOfRoomForHotel,
    getRoomDetails,
    updateRoom,
    deleteRoom,
};
