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

export const userRepository = { findUserByEmail, createNewUser, getUsers };
