import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { hotelService } from "./hotel.service";

const createHotel = async (req: Request, res: Response) => {
  const result = await hotelService.createHotel({
    owner: req.user,
    data: req.body,
  });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Successfully Create New Hotel",
    data: result,
  });
};

const listOfApprovedHotel = async (req: Request, res: Response) => {
  const result = await hotelService.listOfApprovedHotel({ query: req.query });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved list of hotels",
    data: result,
  });
};

const listOfAllHotel = async (req: Request, res: Response) => {
  const result = await hotelService.listOfAllHotel({ query: req.query });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved list of hotels",
    data: result,
  });
};

const listOfMyHotel = async (req: Request, res: Response) => {
  const result = await hotelService.listOfMyHotel({
    owner: req.user,
    query: req.query,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved list of hotels",
    data: result,
  });
};

const getHotelDetails = async (req: Request, res: Response) => {
  const result = await hotelService.getHotelDetails(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved hotel details",
    data: result,
  });
};

const updateHotel = async (req: Request, res: Response) => {
  const result = await hotelService.updateHotel({
    hotelId: req.params.id,
    data: req.body,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully update hotel information",
    data: result,
  });
};

const deleteHotel = async (req: Request, res: Response) => {
  const result = await hotelService.deleteHotel(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Hotel successfully deleted",
    data: result,
  });
};

const updateHotelStatus = async (req: Request, res: Response) => {
  const result = await hotelService.updateHotelStatus({
    hotelId: req.params.id,
    data: req.body,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Hotel status successfully updated",
    data: result,
  });
};

export const hotelController = {
  createHotel,
  listOfApprovedHotel,
  listOfAllHotel,
  listOfMyHotel,
  getHotelDetails,
  updateHotel,
  deleteHotel,
  updateHotelStatus,
};
