import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { roomService } from "./room.service";

const addRoom = async (req: Request, res: Response) => {
  const result = await roomService.addRoom({
    ...req.body,
    hotelId: req.params.id,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "New Room Successfully added",
    data: result,
  });
};

const getListOfRoomForHotel = async (req: Request, res: Response) => {
  const result = await roomService.getListOfRoomForHotel(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved list of room",
    data: result,
  });
};

const getRoomDetails = async (req: Request, res: Response) => {
  const result = await roomService.getRoomDetails(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved room details",
    data: result,
  });
};

const updateRoom = async (req: Request, res: Response) => {
  const result = await roomService.updateRoom({
    roomId: req.params.id,
    data: req.body,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Room information successfully updated",
    data: result,
  });
};

const deleteRoom = async (req: Request, res: Response) => {
  const result = await roomService.deleteRoom(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Room successfully deleted",
    data: result,
  });
};

export const roomController = {
  addRoom,
  getListOfRoomForHotel,
  getRoomDetails,
  updateRoom,
  deleteRoom,
};
