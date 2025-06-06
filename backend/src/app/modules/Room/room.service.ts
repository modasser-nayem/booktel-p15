import { roomRepository } from "../../db/repositories/room.repository";
import AppError from "../../errors/AppError";
import { TAddRoom, TUpdateRoom } from "./room.interface";

const addRoom = async (data: TAddRoom) => {
  if (!(await roomRepository.getHotelById(data.hotelId))) {
    throw new AppError(404, "invalid hotel_id");
  }

  return await roomRepository.addRoom(data);
};

const getListOfRoomForHotel = async (hotelId: string) => {
  if (!(await roomRepository.getHotelById(hotelId))) {
    throw new AppError(404, "invalid hotel_id");
  }

  return await roomRepository.getListOfRoom(hotelId);
};

const getRoomDetails = async (roomId: string) => {
  if (!(await roomRepository.getRoomById(roomId))) {
    throw new AppError(404, "invalid room_id");
  }

  return await roomRepository.getRoomById(roomId);
};

const updateRoom = async (payload: { roomId: string; data: TUpdateRoom }) => {
  if (!(await roomRepository.getRoomById(payload.roomId))) {
    throw new AppError(404, "invalid room_id");
  }

  return await roomRepository.updateRoom(payload);
};

const deleteRoom = async (roomId: string) => {
  if (!(await roomRepository.getRoomById(roomId))) {
    throw new AppError(404, "invalid room_id");
  }

  return await roomRepository.deleteRoom(roomId);
};

export const roomService = {
  addRoom,
  getListOfRoomForHotel,
  getRoomDetails,
  updateRoom,
  deleteRoom,
};
