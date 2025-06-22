export type UserRole = "HOTEL_OWNER" | "CUSTOMER" | "ADMIN";

export type SignupUser = {
   name: string;
   email: string;
   role: "HOTEL_OWNER" | "CUSTOMER";
   password: string;
   confirmPassword: string;
};

export interface LoginUser {
   email: string;
   password: string;
}

export type ResetPassword = {
   token: string;
   newPassword: string;
   confirmPassword: string;
};

export type User = {
   id: string;
   name: string;
   email: string;
   role: UserRole;
   createdAt: string;
   updatedAt: string;
};

export interface AdminStats {
   totalUsers: number;
   totalHotels: number;
   totalBookings: number;
   totalRevenue: number;
   pendingHotels: number;
   pendingBookings: number;
}
