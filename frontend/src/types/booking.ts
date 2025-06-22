import { PaymentStatus } from ".";
import { RoomType } from "./room";

export type BookingStatus = "PENDING" | "BOOKED" | "CANCELLED";

export type CreateBooking = {
   roomId: string;
   fromDate: string;
   toDate: string;
};

export type TGetBookingsForAdmin = {
   id: string;
   fromDate: string;
   toDate: string;
   totalPrice: number;
   status: BookingStatus;
   createdAt: string;
   room: {
      id: string;
      beds: number;
      type: RoomType;
      photos: string[];
   };
}[];

export type TGetBookings = TGetBookingsForAdmin;

export type TGetBookingDetails = {
   id: string;
   fromDate: string;
   toDate: string;
   totalPrice: number;
   status: BookingStatus;
   createdAt: string;
   room: {
      id: string;
      beds: number;
      type: RoomType;
      photos: string[];
      price: string;
      hotelId: string;
   };
   payment: {
      id: string;
      status: PaymentStatus;
      createdAt: string;
   } | null;
};

export type BookingFilters = {
   status?: BookingStatus;
   page?: number;
   limit?: number;
   sortOrder?: "asc" | "desc";
   fromDate?: string;
   toDate?: string;
};
