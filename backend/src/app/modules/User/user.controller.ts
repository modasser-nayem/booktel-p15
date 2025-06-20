import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { userService } from "./user.service";
import { query } from "winston";

const getProfile = async (req: Request, res: Response) => {
  const result = await userService.getProfile({ user: req.user });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Profile successfully retrieved",
    data: result,
  });
};

const updateProfile = async (req: Request, res: Response) => {
  const result = await userService.updateProfile({
    user: req.user,
    data: req.body,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Profile successfully updated",
    data: result,
  });
};

const getAllUsers = async (req: Request, res: Response) => {
  const result = await userService.getAllUsers({ query: req.query });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved all users",
    data: result,
  });
};

const getUserDetails = async (req: Request, res: Response) => {
  const result = await userService.getUserDetails({ userId: req.params.id });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved user details",
    data: result,
  });
};

const updateUserRole = async (req: Request, res: Response) => {
  const result = await userService.updateUserRole({
    userId: req.params.id,
    data: req.body,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User role successfully updated",
    data: result,
  });
};

const deleteUser = async (req: Request, res: Response) => {
  const result = await userService.deleteUser({ userId: req.params.id });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Account successfully deleted",
    data: result,
  });
};

export const userController = {
  getProfile,
  updateProfile,
  getAllUsers,
  getUserDetails,
  updateUserRole,
  deleteUser,
};
