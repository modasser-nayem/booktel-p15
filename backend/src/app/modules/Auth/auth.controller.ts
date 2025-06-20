import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { authService } from "./auth.service";
import { clearAuthCookie, setAuthCookie } from "../../utils/cookie";

const signupUser = async (req: Request, res: Response) => {
  const result = await authService.signupUser({ data: req.body });

  setAuthCookie(res, result.access_token);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Account successfully created",
    data: result.user,
  });
};

const loginUser = async (req: Request, res: Response) => {
  const result = await authService.loginUser({ data: req.body });

  setAuthCookie(res, result.access_token);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully Login",
    data: result.user,
  });
};

const logoutUser = async (req: Request, res: Response) => {
  // Clear the access token from cookie
  clearAuthCookie(res);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully Logged out",
    data: null,
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
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Password successfully updated",
    data: result,
  });
};

export const authController = {
  signupUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
};
