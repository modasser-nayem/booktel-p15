import { BookingStatus, PaymentStatus } from "@prisma/client";
import { TBookARoom } from "../../modules/Booking/booking.interface";
import prisma from "../connector";
import { roomRepository } from "./room.repository";

const getRoomById = async (roomId: string) => {
  return await roomRepository.getRoomById(roomId);
};

const findBookingById = async (bookId: string) => {
  return await prisma.booking.findUnique({
    where: { id: bookId },
    select: {
      id: true,
      userId: true,
      fromDate: true,
      toDate: true,
      totalPrice: true,
      status: true,
      createdAt: true,
    },
  });
};

const bookARoom = async (data: TBookARoom & { totalPrice: number }) => {
  return await prisma.booking.create({
    data: data,
  });
};

const isOverlappingBooking = async (payload: {
  roomId: string;
  fromDate: Date;
  toDate: Date;
}) => {
  const booking = await prisma.booking.findFirst({
    where: {
      roomId: payload.roomId,
      status: { in: ["PENDING", "BOOKED"] },
      fromDate: { lt: payload.toDate },
      toDate: { gt: payload.fromDate },
    },
  });
  return !!booking;
};

const getMyBooking = async (userId: string) => {
  return await prisma.booking.findMany({
    where: { userId },
    select: {
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
      payment: {
        select: {
          id: true,
          status: true,
          createdAt: true,
        },
      },
    },
  });
};

const getBookingDetails = async (bookId: string) => {
  return await prisma.booking.findUnique({
    where: { id: bookId },
    select: {
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
      payment: {
        select: {
          id: true,
          status: true,
          createdAt: true,
        },
      },
    },
  });
};

const cancelBooking = async (bookId: string) => {
  await prisma.booking.update({
    where: { id: bookId },
    data: { status: "CANCELLED" },
  });

  return null;
};

const cleanUnpaidBookings = async () => {
  const cutoff = new Date(Date.now() - 15 * 60 * 1000);

  await prisma.booking.deleteMany({
    where: {
      status: "PENDING",
      createdAt: { lt: cutoff },
    },
  });
};

const findPaidBooking = async (bookId: string) => {
  return await prisma.payment.findUnique({
    where: { bookingId: bookId, status: "SUCCESS" },
  });
};

const createPayment = async (payload: {
  bookingId: string;
  amount: number;
  method: string;
  status: PaymentStatus;
}) => {
  return await prisma.payment.create({
    data: { ...payload },
  });
};

const updateBookingStatus = async (bookId: string, status: BookingStatus) => {
  return await prisma.booking.update({
    where: { id: bookId },
    data: { status },
  });
};

export const bookingRepository = {
  getRoomById,
  findBookingById,
  bookARoom,
  isOverlappingBooking,
  getMyBooking,
  getBookingDetails,
  cancelBooking,
  cleanUnpaidBookings,
  findPaidBooking,
  createPayment,
  updateBookingStatus,
};
