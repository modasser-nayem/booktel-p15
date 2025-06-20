import { Prisma, Role, User } from "@prisma/client";
import { TSignupUser } from "../../modules/Auth/auth.interface";
import prisma from "../connector";
import {
  TGetUsersQuery,
  TUpdateUserRole,
} from "../../modules/User/user.interface";
import { paginate } from "../../utils/pagination";

const findUserByEmail = async (
  email: string,
  password?: boolean,
): Promise<{
  id: string;
  email: string;
  name: string;
  password?: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
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
      createdAt: true,
      updatedAt: true,
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
    data,
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
      role: true,
      createdAt: true,
      updatedAt: true,
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

const getAllUsers = async (query: TGetUsersQuery) => {
  const where: Prisma.UserWhereInput = {};
  if (query.role) {
    where.role = query.role as Role;
  }
  if (query.email) {
    where.email = { contains: query.email, mode: "insensitive" };
  }

  const select: Prisma.UserSelect = {
    id: true,
    email: true,
    name: true,
    role: true,
    createdAt: true,
    updatedAt: true,
  };

  const result = await paginate<User>({
    model: prisma.user,
    where,
    select,
    sortBy: query.sortBy,
    page: query.page,
    limit: query.limit,
    sortOrder: query.sortOrder,
  });

  return result;
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

export const userRepository = {
  findUserByEmail,
  findUSerById,
  createNewUser,
  updatePassword,
  updateUserProfile,
  getAllUsers,
  updateUserRole,
  deleteUser,
};
