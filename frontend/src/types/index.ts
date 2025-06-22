export * from "./user";
export * from "./response";
export * from "./hotel";
export * from "./room";
export * from "./booking";

export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED";

export type PaymentDetails = {
   id: string;
   status: PaymentStatus;
   createdAt: Date;
   bookingId: string;
   amount: number;
   method: string;
};

export type TReview = {
   id: string;
   rating: number;
   hotelId: string;
   user: {
      select: {
         id: string;
         name: string;
      };
   };
   comment: string | null;
   createdAt: string;
};

export interface AdminStats {
   totalUsers: number;
   totalHotels: number;
   totalBookings: number;
   totalRevenue: number;
   pendingHotels: number;
   pendingBookings: number;
}
