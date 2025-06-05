import {
  TCreateHotel,
  TUpdateHotel,
  TUpdateHotelStatus,
} from "../../modules/Hotel/hotel.interface";
import prisma from "../connector";

const getHotelById = async (id: string) => {
  return await prisma.hotel.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      description: true,
      ownerId: true,
      status: true,
    },
  });
};

const createHotel = async (payload: { data: TCreateHotel }) => {
  return await prisma.hotel.create({
    data: payload.data,
    select: {
      id: true,
      name: true,
      description: true,
      ownerId: true,
      amenities: true,
      location: true,
      photos: true,
      status: true,
    },
  });
};

const listOfApprovedHotel = async (query: {}) => {
  const hotels = await prisma.hotel.findMany({
    where: { status: "APPROVED" },
    select: {
      id: true,
      name: true,
      ownerId: true,
      amenities: true,
      location: true,
      photos: true,
      createdAt: true,
      _count: { select: { rooms: true } },
    },
  });

  return hotels.map(
    ({
      id,
      name,
      ownerId,
      amenities,
      location,
      photos,
      _count,
      createdAt,
    }) => ({
      id,
      name,
      ownerId,
      amenities,
      location,
      photos,
      room: _count.rooms,
      createdAt,
    }),
  );
};

const listOfAllHotel = async (query: {}) => {
  const hotels = await prisma.hotel.findMany({
    select: {
      id: true,
      name: true,
      ownerId: true,
      amenities: true,
      location: true,
      photos: true,
      status: true,
      createdAt: true,
      _count: { select: { rooms: true } },
    },
  });

  return hotels.map(
    ({
      id,
      name,
      ownerId,
      amenities,
      location,
      photos,
      status,
      _count,
      createdAt,
    }) => ({
      id,
      name,
      ownerId,
      amenities,
      location,
      photos,
      status,
      room: _count.rooms,
      createdAt,
    }),
  );
};

const listOfMyHotel = async (payload: { ownerId: string; query: {} }) => {
  const hotels = await prisma.hotel.findMany({
    where: { ownerId: payload.ownerId },
    select: {
      id: true,
      name: true,
      ownerId: true,
      amenities: true,
      location: true,
      photos: true,
      status: true,
      createdAt: true,
      _count: { select: { rooms: true } },
    },
  });

  return hotels.map(
    ({
      id,
      name,
      ownerId,
      amenities,
      location,
      photos,
      status,
      _count,
      createdAt,
    }) => ({
      id,
      name,
      ownerId,
      amenities,
      location,
      photos,
      status,
      room: _count.rooms,
      createdAt,
    }),
  );
};

const getHotelDetails = async (hotelId: string) => {
  return await prisma.hotel.findUnique({
    where: { id: hotelId },
    select: {
      id: true,
      ownerId: true,
      name: true,
      description: true,
      amenities: true,
      location: true,
      photos: true,
      status: true,
      rooms: true,
    },
  });
};

const updateHotel = async (payload: {
  hotelId: string;
  data: TUpdateHotel;
}) => {
  return await prisma.hotel.update({
    where: { id: payload.hotelId },
    data: payload.data,
    select: {
      id: true,
      ownerId: true,
      name: true,
      description: true,
      amenities: true,
      location: true,
      photos: true,
      status: true,
    },
  });
};

const deleteHotel = async (hotelId: string) => {
  return await prisma.$transaction(async (tran) => {
    const result = await tran.hotel.delete({
      where: { id: hotelId },
      select: {
        id: true,
        ownerId: true,
        name: true,
        description: true,
        amenities: true,
        location: true,
        photos: true,
        status: true,
      },
    });

    await tran.room.deleteMany({ where: { hotelId: hotelId } });

    return result;
  });
};

const updateHotelStatus = async (payload: {
  hotelId: string;
  data: TUpdateHotelStatus;
}) => {
  return await prisma.hotel.update({
    where: { id: payload.hotelId },
    data: payload.data,
    select: {
      id: true,
      name: true,
      status: true,
    },
  });
};

export const hotelRepository = {
  getHotelById,
  createHotel,
  listOfApprovedHotel,
  listOfAllHotel,
  listOfMyHotel,
  getHotelDetails,
  updateHotel,
  deleteHotel,
  updateHotelStatus,
};
