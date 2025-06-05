import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";
import { asyncHandler } from "../utils/asyncHandler";
import { Role } from "@prisma/client";
import jwtHelper from "../utils/jwt";
import { userRepository } from "../db/repositories/user.repository";

export const authorize = (...roles: Role[]) => {
  return asyncHandler(
    async (req: Request, _res: Response, next: NextFunction) => {
      const token = req.headers.authorization;
      if (!token) throw new AppError(401, "unauthorized access");

      const decoded = jwtHelper.verifyAccessToken(token);
      if (!decoded) throw new AppError(401, "invalid access token");

      if (!(await userRepository.findUSerById(decoded.id))) {
        throw new AppError(401, "account not found!");
      }

      if (roles.length && !roles.includes(decoded.role)) {
        throw new AppError(
          403,
          "You don't have permission to access this data!",
        );
      }

      req.user = decoded;
      next();
    },
  );
};
