"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = require("../modules/Auth/auth.routes");
const user_routes_1 = require("../modules/User/user.routes");
const hotel_routes_1 = require("../modules/Hotel/hotel.routes");
const room_routes_1 = require("../modules/Room/room.routes");
const booking_routes_1 = require("../modules/Booking/booking.routes");
const payment_routes_1 = require("../modules/Payment/payment.routes");
const admin_routes_1 = require("../modules/Admin/admin.routes");
const review_routes_1 = require("../modules/Review/review.routes");
const routers = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/auth",
        route: auth_routes_1.authRoutes,
    },
    {
        path: "/users",
        route: user_routes_1.userRoutes,
    },
    {
        path: "/hotels",
        route: hotel_routes_1.hotelRoutes,
    },
    {
        path: "/",
        route: room_routes_1.roomRoutes,
    },
    {
        path: "/bookings",
        route: booking_routes_1.bookingRoutes,
    },
    {
        path: "/payments",
        route: payment_routes_1.paymentRoutes,
    },
    {
        path: "/admin",
        route: admin_routes_1.adminRoutes,
    },
    {
        path: "/",
        route: review_routes_1.reviewRoutes,
    },
];
moduleRoutes.forEach((route) => routers.use(route.path, route.route));
exports.default = routers;
