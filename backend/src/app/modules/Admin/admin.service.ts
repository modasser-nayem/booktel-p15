import { BookingStatus } from "@prisma/client";
import { adminRepository } from "../../db/repositories/admin.repository";
import { PaginationQuery } from "../../types/pagination";
import { AdminStats } from "./admin.interface";

const getStats = async (): Promise<AdminStats> => {
  return await adminRepository.getStats();
};

const getBookings = async (
  query: PaginationQuery & { status?: BookingStatus },
) => {
  return await adminRepository.getBookings(query);
};

export const adminService = {
  getStats,
  getBookings,
};
