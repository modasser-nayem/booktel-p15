import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { adminService } from "./admin.service";

const getStats = async (req: Request, res: Response) => {
  const result = await adminService.getStats();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin statistics retrieved successfully.",
    data: result,
  });
};

const getBookings = async (req: Request, res: Response) => {
  const result = await adminService.getBookings(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin bookings retrieved successfully.",
    data: result,
  });
};

export const adminController = { getStats, getBookings };
