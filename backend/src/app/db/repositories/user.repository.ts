import { Prisma, Role } from "@prisma/client";
import { TSignupUser } from "../../modules/Auth/auth.interface";
import prisma from "../connector";
import { TUpdateUserRole } from "../../modules/User/user.interface";

const findUserByEmail = async (
  email: string,
  password?: boolean,
): Promise<{
  id: string;
  email: string;
  name: string;
  password?: string;
  role: Role;
} | null> => {
  const select: Prisma.UserSelect = {};

  if (password) {
    select.password = true;
  }

  return await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      ...select,
    },
  });
};

const findUSerById = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

const createNewUser = async (data: TSignupUser) => {
  return await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

const updatePassword = async (data: {
  userId: string;
  newPassword: string;
}) => {
  return await prisma.user.update({
    where: { id: data.userId },
    data: {
      password: data.newPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
};

const updateUserProfile = async (data: {
  id: string;
  name?: string;
  email?: string;
}) => {
  const updateData = { name: data.name, email: data.email };

  const result = await prisma.user.update({
    where: { id: data.id },
    data: updateData,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

const getAllUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

const updateUserRole = async ({
  userId,
  data,
}: {
  userId: string;
  data: TUpdateUserRole;
}) => {
  return await prisma.user.update({
    where: { id: userId },
    data: data,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

const deleteUser = async (userId: string) => {
  return await prisma.user.delete({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

const getUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
    },
  });
};

export const userRepository = {
  findUserByEmail,
  findUSerById,
  createNewUser,
  updatePassword,
  updateUserProfile,
  getAllUsers,
  updateUserRole,
  deleteUser,
  getUsers,
};
