import { TAddRoom, TUpdateRoom } from "../../modules/Room/room.interface";
import prisma from "../connector";
import { hotelRepository } from "./hotel.repository";

const getRoomById = async (roomId: string) => {
  return await prisma.room.findUnique({ where: { id: roomId } });
};

const getHotelById = async (hotelId: string) => {
  return await hotelRepository.getHotelById(hotelId);
};

const addRoom = async (data: TAddRoom) => {
  return await prisma.room.create({
    data: data,
  });
};

const getListOfRoom = async (hotelId: string) => {
  return await prisma.room.findMany({ where: { hotelId: hotelId } });
};

const getRoomDetails = async (roomId: string) => {
  return await prisma.room.findUnique({ where: { id: roomId } });
};

const updateRoom = async (payload: { roomId: string; data: TUpdateRoom }) => {
  return await prisma.room.update({
    where: { id: payload.roomId },
    data: payload.data,
  });
};

const deleteRoom = async (roomId: string) => {
  return await prisma.room.delete({ where: { id: roomId } });
};

export const roomRepository = {
  getRoomById,
  getHotelById,
  addRoom,
  getListOfRoom,
  getRoomDetails,
  updateRoom,
  deleteRoom,
};
