import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { authService } from "./auth.service";

const signupUser = async (req: Request, res: Response) => {
  const result = await authService.signupUser({ data: req.body });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Account successfully created",
    data: result,
  });
};

const loginUser = async (req: Request, res: Response) => {
  const result = await authService.loginUser({ data: req.body });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully Login",
    data: result,
  });
};

const forgotPassword = async (req: Request, res: Response) => {
  const result = await authService.forgotPassword({ data: req.body });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Check your mail to reset your password",
    data: result,
  });
};

const resetPassword = async (req: Request, res: Response) => {
  const result = await authService.resetPassword({
    data: req.body,
    token: req.query?.token as string | undefined,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Password successfully updated",
    data: result,
  });
};

const getUsers = async (req: Request, res: Response) => {
  const result = await authService.getUsers();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved users",
    data: result,
  });
};

export const authController = {
  signupUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getUsers,
};
