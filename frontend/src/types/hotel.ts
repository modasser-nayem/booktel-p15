import { RoomType } from "./room";

export type HotelStatus = "PENDING" | "APPROVED" | "REJECTED";

export type CreateHotel = {
   name: string;
   description: string;
   location: string;
   amenities: string[];
   photos: string[];
};

export type TGetAllHotels = {
   id: string;
   name: string;
   description: string;
   amenities: string[];
   location: string;
   photos: string[];
   status: string;
   _count: {
      rooms: number;
   };
}[];

export type HotelFilters = {
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
   page?: number;
   limit?: number;
};

export type TGetAllHotelsByOwner = TGetAllHotels;

export type TGetHotelDetails = {
   id: string;
   ownerId: string;
   name: string;
   description: string;
   amenities: string[];
   location: string;
   photos: string[];
   status: HotelStatus;
   rooms: {
      select: {
         id: string;
         type: RoomType;
         beds: number;
         price: number;
         photos: string[];
         availableFrom: string;
         availableTo: string;
      };
   };
   createdAt: string;
   updatedAt: string;
};

export type Hotel = {
   id: string;
   name: string;
   description: string;
   location: string;
   amenities: string[];
   photos: string[];
   ownerId: string;
   status: "PENDING" | "APPROVED" | "REJECTED";
   createdAt: string;
   updatedAt: string;
};
