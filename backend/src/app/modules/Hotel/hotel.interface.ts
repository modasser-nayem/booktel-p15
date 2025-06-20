import { PaginationQuery } from "./../../types/pagination";
import { z } from "zod";
import { hotelSchemaValidation } from "./hotel.validation";

export type TCreateHotel = z.infer<typeof hotelSchemaValidation.createHotel> & {
  ownerId: string;
};

export type TUpdateHotel = z.infer<typeof hotelSchemaValidation.updateHotel>;

export type TUpdateHotelStatus = z.infer<
  typeof hotelSchemaValidation.updateHotelStatus
>;

export type TGetHotelsQuery = {
  location?: string;
  rating?: number;
  status?: string;
  checkIn?: string;
  checkOut?: string;
  roomType?: string;
  priceMin?: number;
  priceMax?: number;
  amenities?: string[];
  sortBy?: "price" | "rating" | "name";
} & PaginationQuery;

export type TGetMyHotelsQuery = {
  rating?: number;
  status?: string;
} & PaginationQuery;
