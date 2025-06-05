import { Router } from "express";
import { authRoutes } from "../modules/Auth/auth.routes";
import { userRoutes } from "../modules/User/user.routes";
import { hotelRoutes } from "../modules/Hotel/hotel.routes";

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
];

moduleRoutes.forEach((route) => routers.use(route.path, route.route));

export default routers;
