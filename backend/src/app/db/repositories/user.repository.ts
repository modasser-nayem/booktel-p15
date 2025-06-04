import { Prisma } from "@prisma/client";
import { TSignupUser } from "../../modules/Auth/auth.interface";
import prisma from "../connector";

const findUserByEmail = async (
  email: string,
  password?: boolean,
): Promise<{
  id: string;
  email: string;
  name: string;
  password?: string;
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
  getUsers,
};
