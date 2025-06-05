/* eslint-disable @typescript-eslint/no-explicit-any */

import { JwtPayload } from "jsonwebtoken";
import {
  TCreateHotel,
  TUpdateHotel,
  TUpdateHotelStatus,
} from "./hotel.interface";
import { hotelRepository } from "../../db/repositories/hotel.repository";
import AppError from "../../errors/AppError";

const createHotel = async (payload: {
  owner: JwtPayload;
  data: TCreateHotel;
}) => {
  payload.data.ownerId = payload.owner.id;

  return await hotelRepository.createHotel({ data: payload.data });
};

const listOfApprovedHotel = async (payload: { query: any }) => {
  return await hotelRepository.listOfApprovedHotel(payload.query);
};

const listOfAllHotel = async (payload: { query: any }) => {
  return await hotelRepository.listOfAllHotel(payload.query);
};

const listOfMyHotel = async (payload: { owner: JwtPayload; query: any }) => {
  return await hotelRepository.listOfMyHotel({
    ownerId: payload.owner.id,
    query: payload.query,
  });
};

const getHotelDetails = async (hotelId: string) => {
  const result = await hotelRepository.getHotelDetails(hotelId);

  if (!result) {
    throw new AppError(404, "invalid hotel_id");
  }

  return result;
};

const updateHotel = async (payload: {
  hotelId: string;
  data: TUpdateHotel;
}) => {
  const hotel = await hotelRepository.getHotelById(payload.hotelId);

  if (!hotel) {
    throw new AppError(404, "invalid hotel_id");
  }

  return await hotelRepository.updateHotel(payload);
};

const deleteHotel = async (hotelId: string) => {
  const hotel = await hotelRepository.getHotelById(hotelId);

  if (!hotel) {
    throw new AppError(404, "invalid hotel_id");
  }

  return await hotelRepository.deleteHotel(hotelId);
};

const updateHotelStatus = async (payload: {
  hotelId: string;
  data: TUpdateHotelStatus;
}) => {
  const hotel = await hotelRepository.getHotelById(payload.hotelId);

  if (!hotel) {
    throw new AppError(404, "invalid hotel_id");
  }

  return await hotelRepository.updateHotelStatus(payload);
};

export const hotelService = {
  createHotel,
  listOfApprovedHotel,
  listOfAllHotel,
  listOfMyHotel,
  getHotelDetails,
  updateHotel,
  deleteHotel,
  updateHotelStatus,
};
