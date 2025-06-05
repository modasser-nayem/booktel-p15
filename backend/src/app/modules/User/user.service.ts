import { JwtPayload } from "jsonwebtoken";
import { userRepository } from "../../db/repositories/user.repository";
import AppError from "../../errors/AppError";
import { TUpdateProfile, TUpdateUserRole } from "./user.interface";

const getProfile = async (payload: { user: JwtPayload }) => {
  const user = await userRepository.findUSerById(payload.user.id);

  if (!user) {
    throw new AppError(404, "User not found!");
  }

  return user;
};

const updateProfile = async (payload: {
  user: JwtPayload;
  data: TUpdateProfile;
}) => {
  const user = await userRepository.findUSerById(payload.user.id);

  if (!user) {
    throw new AppError(404, "invalid user_id");
  }

  return await userRepository.updateUserProfile({
    id: user.id,
    name: payload.data.name,
    email: payload.data.email,
  });
};

const getAllUsers = async (payload: {}) => {
  return await userRepository.getAllUsers();
};

const getUserDetails = async (payload: { userId: string }) => {
  const user = await userRepository.findUSerById(payload.userId);

  if (!user) {
    throw new AppError(404, "invalid user_id");
  }

  return user;
};

const updateUserRole = async (payload: {
  userId: string;
  data: TUpdateUserRole;
}) => {
  const user = await userRepository.findUSerById(payload.userId);

  if (!user) {
    throw new AppError(404, "invalid user_id");
  }

  return await userRepository.updateUserRole(payload);
};

const deleteUser = async (payload: { userId: string }) => {
  const user = await userRepository.findUSerById(payload.userId);

  if (!user) {
    throw new AppError(404, "invalid user_id");
  }

  return await userRepository.deleteUser(user.id);
};

export const userService = {
  getProfile,
  updateProfile,
  getAllUsers,
  getUserDetails,
  updateUserRole,
  deleteUser,
};
