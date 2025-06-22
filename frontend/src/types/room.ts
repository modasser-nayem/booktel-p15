export type RoomType = "SINGLE" | "DOUBLE" | "SUITE" | "DELUXE";

export type CreateRoom = {
   type: RoomType;
   price: number;
   beds: number;
   photos: string[];
   availableFrom: string;
   availableTo: string;
};

export type Room = {
   id: string;
   hotelId: string;
   type: RoomType;
   price: number;
   beds: number;
   photos: string[];
   availableFrom: string;
   availableTo: string;
};
