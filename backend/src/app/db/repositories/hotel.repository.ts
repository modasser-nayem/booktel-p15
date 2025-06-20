import { Hotel } from "@prisma/client";
import {
  TCreateHotel,
  TGetHotelsQuery,
  TGetMyHotelsQuery,
  TUpdateHotel,
  TUpdateHotelStatus,
} from "../../modules/Hotel/hotel.interface";
import { paginate } from "../../utils/pagination";
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

export const getHotels = async (query: TGetHotelsQuery) => {
  const {
    location,
    status,
    roomType,
    priceMin,
    priceMax,
    amenities,
    checkIn,
    checkOut,
    sortBy,
    sortOrder,
    page = 1,
    limit = 10,
  } = query;

  // =======================
  // Dynamic WHERE conditions
  // =======================
  const where: any = {
    ...(location && { location: { contains: location, mode: "insensitive" } }),
    ...(status && { status: status.toUpperCase() }), // assuming HotelStatus enum values
    ...(amenities && {
      amenities: {
        hasSome: amenities, // array includes some values
      },
    }),
    ...((priceMin || priceMax) && {
      rooms: {
        some: {
          ...(roomType && { type: roomType.toUpperCase() }),
          price: {
            ...(priceMin && { gte: priceMin }),
            ...(priceMax && { lte: priceMax }),
          },
          ...(checkIn &&
            checkOut && {
              availableFrom: { lte: new Date(checkIn) },
              availableTo: { gte: new Date(checkOut) },
            }),
        },
      },
    }),
  };

  // =======================
  // SELECT Fields
  // =======================
  const select = {
    id: true,
    name: true,
    description: true,
    amenities: true,
    location: true,
    photos: true,
    status: true,
    _count: {
      select: {
        rooms: true,
      },
    },
  };

  // =======================
  // Execute paginated query
  // =======================
  const result = await paginate<Hotel>({
    model: prisma.hotel,
    page,
    limit,
    where,
    select,
    sortBy,
    sortOrder,
  });

  return result;
};

const getMyHotels = async (payload: {
  ownerId: string;
  query: TGetMyHotelsQuery;
}) => {
  const { query } = payload;

  const where = {
    ownerId: payload.ownerId,
    ...(query.rating && { rating: query.rating }),
    ...(query.status && { status: query.status.toUpperCase() }),
  };

  const select = {
    id: true,
    name: true,
    description: true,
    amenities: true,
    location: true,
    photos: true,
    status: true,
    _count: {
      select: {
        rooms: true,
      },
    },
  };

  const result = await paginate<Hotel>({
    model: prisma.hotel,
    where,
    select,
    sortBy: query.sortBy || "createdAt",
    sortOrder: query.sortOrder || "desc",
    page: query.page,
    limit: query.limit,
  });

  return result;
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
      createdAt: true,
      updatedAt: true,
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
  getHotels,
  getMyHotels,
  getHotelDetails,
  updateHotel,
  deleteHotel,
  updateHotelStatus,
};
