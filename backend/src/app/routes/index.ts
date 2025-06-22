import { Router } from "express";
import { authRoutes } from "../modules/Auth/auth.routes";
import { userRoutes } from "../modules/User/user.routes";
import { hotelRoutes } from "../modules/Hotel/hotel.routes";
import { roomRoutes } from "../modules/Room/room.routes";
import { bookingRoutes } from "../modules/Booking/booking.routes";
import { paymentRoutes } from "../modules/Payment/payment.routes";
import { adminRoutes } from "../modules/Admin/admin.routes";
import { reviewRoutes } from "../modules/Review/review.routes";

const routers = Router();
const moduleRoutes: { path: string; route: Router }[] = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/hotels",
    route: hotelRoutes,
  },
  {
    path: "/",
    route: roomRoutes,
  },
  {
    path: "/bookings",
    route: bookingRoutes,
  },
  {
    path: "/payments",
    route: paymentRoutes,
  },
  {
    path: "/admin",
    route: adminRoutes,
  },
  {
    path: "/",
    route: reviewRoutes,
  },
];

moduleRoutes.forEach((route) => routers.use(route.path, route.route));

export default routers;
