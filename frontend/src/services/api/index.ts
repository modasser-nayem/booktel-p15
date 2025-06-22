import api from "@/lib/axios";
import {
   AdminStats,
   ApiResponse,
   BookingFilters,
   CreateBooking,
   CreateHotel,
   CreateRoom,
   Hotel,
   HotelFilters,
   HotelStatus,
   LoginUser,
   PaginatedResponse,
   PaymentDetails,
   ResetPassword,
   Room,
   SignupUser,
   TGetAllHotels,
   TGetAllHotelsByOwner,
   TGetBookingDetails,
   TGetBookings,
   TGetBookingsForAdmin,
   TGetHotelDetails,
   TReview,
   User,
   UserRole,
} from "@/types";

// Auth service
export const authService = {
   signup: (data: SignupUser) =>
      api.post<ApiResponse<User>>("/auth/signup", data),

   login: (data: LoginUser) => api.post<ApiResponse<User>>("/auth/login", data),

   logout: () => api.post("/auth/logout"),

   forgotPassword: (email: string) => api.post("/auth/forgot", { email }),

   resetPassword: (data: ResetPassword) => api.post("/auth/reset", data),

   me: () => api.get<ApiResponse<User>>("/users/me"),
};

// User service
export const userService = {
   getProfile: () => api.get<ApiResponse<User>>("/users/me"),

   updateProfile: (data: { name?: string; email?: string }) =>
      api.put<ApiResponse<User>>("/users/me", data),

   getAllUsers: (filters?: {
      page?: number;
      limit?: number;
      role?: UserRole;
      email?: string;
   }) =>
      api.get<ApiResponse<PaginatedResponse<User[]>>>("/users", {
         params: filters,
      }),

   getUserDetails: (id: string) => api.get<ApiResponse<User>>(`/users/${id}`),

   updateUserRole: (data: { id: string; role: UserRole }) =>
      api.patch<ApiResponse<User>>(`/users/${data.id}`, { role: data.role }),

   deleteUser: (id: string) => api.delete(`/users/${id}`),
};

// Hotel service
export const hotelService = {
   createHotel: (data: CreateHotel) =>
      api.post<ApiResponse<Hotel>>("/hotels", data),

   getAllHotels: (filters?: HotelFilters) =>
      api.get<ApiResponse<PaginatedResponse<TGetAllHotels>>>("/hotels", {
         params: filters,
      }),

   getAllHotelsByOwner: (filters?: HotelFilters) =>
      api.get<ApiResponse<PaginatedResponse<TGetAllHotelsByOwner>>>("/hotels/me", {
         params: filters,
      }),

   getHotelDetails: (id: string) =>
      api.get<ApiResponse<TGetHotelDetails>>(`/hotels/${id}`),

   updateHotel: (id: string, data: Partial<CreateHotel>) =>
      api.put<ApiResponse<Hotel>>(`/hotels/${id}`, data),

   updateHotelStatus: (id: string, status: HotelStatus) =>
      api.patch<ApiResponse<{ id: string; name: string; status: HotelStatus }>>(
         `/hotels/${id}/status`,
         { status }
      ),

   deleteHotel: (id: string) => api.delete<ApiResponse<null>>(`/hotels/${id}`),
};

// Room Services
export const roomService = {
   createRoom: (hotelId: string, data: CreateRoom) =>
      api.post<ApiResponse<Room>>(`/hotels/${hotelId}/rooms`, data),

   getListOfHotelRoom: (hotelId: string) =>
      api.get<ApiResponse<PaginatedResponse<Room[]>>>(`/hotels/${hotelId}/rooms`),

   getRoomDetails: (id: string) => api.get<ApiResponse<Room>>(`/rooms/${id}`),

   updateRoom: (id: string, data: Partial<Room>) =>
      api.patch<ApiResponse<Room>>(`/rooms/${id}`, data),

   deleteRoom: (id: string) => api.delete<ApiResponse<null>>(`/rooms/${id}`),
};

// Booking Services
export const bookingService = {
   createBooking: (data: CreateBooking) =>
      api.post<ApiResponse<null>>("/bookings", data),

   getMyBookings: (filters?: BookingFilters) =>
      api.get<ApiResponse<PaginatedResponse<TGetBookings>>>("/bookings/me", {
         params: filters,
      }),

   getBookingDetails: (id: string) =>
      api.get<ApiResponse<TGetBookingDetails>>(`/bookings/${id}`),

   cancelBooking: (id: string) =>
      api.delete<ApiResponse<null>>(`/bookings/${id}`),
};

// Payment Services
export const paymentService = {
   createCheckout: (bookingId: string) =>
      api.post<ApiResponse<{ url: string | null; sessionId: string }>>(
         "/payments/checkout",
         {
            bookingId,
         }
      ),
   getPaymentStatus: (id: string) =>
      api.get<ApiResponse<PaymentDetails>>(`/payments/${id}`),
};

// Review Services
export const reviewService = {
   createReview: (
      bookingId: string,
      data: { rating: number; comment?: string }
   ) => api.post<ApiResponse<TReview>>(`/reviews/${bookingId}`, data),

   getHotelReviews: (hotelId: string) =>
      api.get<ApiResponse<PaginatedResponse<TReview[]>>>(`/hotels/${hotelId}/reviews`),
};

// Admin Services
export const adminService = {
   getStats: () => api.get<ApiResponse<AdminStats>>("/admin/stats"),

   getAllHotels: (filters?: HotelFilters) =>
      api.get<ApiResponse<PaginatedResponse<TGetAllHotels>>>("/hotels", {
         params: filters,
      }),

   getAllBookings: (filters?: BookingFilters) =>
      api.get<ApiResponse<PaginatedResponse<TGetBookingsForAdmin>>>(
         "/admin/bookings",
         {
            params: filters,
         }
      ),
};
