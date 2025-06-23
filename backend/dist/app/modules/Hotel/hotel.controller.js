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
exports.hotelController = void 0;
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const hotel_service_1 = require("./hotel.service");
const createHotel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield hotel_service_1.hotelService.createHotel({
        owner: req.user,
        data: req.body,
    });
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Successfully Create New Hotel",
        data: result,
    });
});
const getHotels = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield hotel_service_1.hotelService.getHotels({ query: req.query });
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Successfully retrieved list of hotels",
        data: result,
    });
});
const getMyHotels = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield hotel_service_1.hotelService.getMyHotels({
        ownerId: req.user.id,
        query: req.query,
    });
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Successfully retrieved list of my hotels",
        data: result,
    });
});
const getHotelDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield hotel_service_1.hotelService.getHotelDetails(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Successfully retrieved hotel details",
        data: result,
    });
});
const updateHotel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield hotel_service_1.hotelService.updateHotel({
        hotelId: req.params.id,
        data: req.body,
    });
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Successfully update hotel information",
        data: result,
    });
});
const deleteHotel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield hotel_service_1.hotelService.deleteHotel(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Hotel successfully deleted",
        data: result,
    });
});
const updateHotelStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield hotel_service_1.hotelService.updateHotelStatus({
        hotelId: req.params.id,
        data: req.body,
    });
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Hotel status successfully updated",
        data: result,
    });
});
exports.hotelController = {
    createHotel,
    getHotels,
    getMyHotels,
    getHotelDetails,
    updateHotel,
    deleteHotel,
    updateHotelStatus,
};
