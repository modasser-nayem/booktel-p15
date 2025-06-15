import { z } from "zod";
import { bookingSchemaValidation } from "./booking.validation";

export type TBookARoom = z.infer<typeof bookingSchemaValidation.bookARoom> & {
  userId: string;
};
