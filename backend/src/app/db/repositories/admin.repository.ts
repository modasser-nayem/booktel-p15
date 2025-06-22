import { Booking, BookingStatus, Prisma } from "@prisma/client";
import { AdminStats } from "../../modules/Admin/admin.interface";
import { PaginationQuery } from "../../types/pagination";
import prisma from "../connector";
import { paginate } from "../../utils/pagination";

const getStats = async (): Promise<AdminStats> => {
  const [
    totalUsers,
    totalHotels,
    totalBookings,
    totalRevenueResult,
    pendingHotels,
    pendingBookings,
  ] = await prisma.$transaction([
    prisma.user.count(),
    prisma.hotel.count(),
    prisma.booking.count(),
    prisma.booking.aggregate({
      where: {
        status: "BOOKED",
      },
      _sum: {
        totalPrice: true,
      },
    }),
    prisma.hotel.count({
      where: {
        status: "PENDING",
      },
    }),
    prisma.booking.count({
      where: {
        status: "PENDING",
      },
    }),
  ]);

  return {
    totalUsers,
    totalHotels,
    totalBookings,
    totalRevenue: totalRevenueResult._sum?.totalPrice ?? 0,
    pendingHotels,
    pendingBookings,
  };
};

const getBookings = async (
  query: PaginationQuery & { status?: BookingStatus },
) => {
  const { page, limit, sortBy, sortOrder, status } = query;

  const where: Prisma.BookingWhereInput = {};

  if (status) {
    where.status = status;
  }

  const select: Prisma.BookingSelect = {
    id: true,
    fromDate: true,
    toDate: true,
    totalPrice: true,
    status: true,
    createdAt: true,
    room: {
      select: {
        id: true,
        beds: true,
        type: true,
        photos: true,
      },
    },
  };

  const result = await paginate<Booking[]>({
    model: prisma.booking,
    where,
    page,
    limit,
    sortBy,
    sortOrder,
    select,
  });

  return result;
};

export const adminRepository = {
  getStats,
  getBookings,
};
