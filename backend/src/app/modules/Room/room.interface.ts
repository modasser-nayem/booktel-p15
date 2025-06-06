import { z } from "zod";
import { roomSchemaValidation } from "./room.validation";

export type TAddRoom = z.infer<typeof roomSchemaValidation.addRoom> & {
  hotelId: string;
};

export type TUpdateRoom = z.infer<typeof roomSchemaValidation.updateRoom>;
