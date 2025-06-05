import { z } from "zod";
import { hotelSchemaValidation } from "./hotel.validation";

export type TCreateHotel = z.infer<typeof hotelSchemaValidation.createHotel> & {
  ownerId: string;
};

export type TUpdateHotel = z.infer<typeof hotelSchemaValidation.updateHotel>;

export type TUpdateHotelStatus = z.infer<
  typeof hotelSchemaValidation.updateHotelStatus
>;
