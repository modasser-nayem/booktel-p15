import { JwtPayload } from "jsonwebtoken";
import {
  TCreateHotel,
  TGetHotelsQuery,
  TGetMyHotelsQuery,
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

const getHotels = async (payload: { query: TGetHotelsQuery }) => {
  return await hotelRepository.getHotels(payload.query);
};

const getMyHotels = async (payload: {
  ownerId: string;
  query: TGetMyHotelsQuery;
}) => {
  return await hotelRepository.getMyHotels({
    ownerId: payload.ownerId,
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
  getHotels,
  getMyHotels,
  getHotelDetails,
  updateHotel,
  deleteHotel,
  updateHotelStatus,
};
