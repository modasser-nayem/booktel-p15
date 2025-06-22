import config from "../../config";
import { bookingRepository } from "../../db/repositories/booking.repository";
import AppError from "../../errors/AppError";
import Stripe from "stripe";
import logger from "../../utils/logger";

const stripe = new Stripe(config.STRIPE_SECRET_KEY, {
  apiVersion: "2025-05-28.basil",
});

const checkout = async (payload: { bookingId: string }) => {
  const booking = await bookingRepository.findBookingById(payload.bookingId);

  if (!booking) {
    throw new AppError(404, "Booking not found!");
  }

  if (booking.status === "CANCELLED") {
    throw new AppError(400, "Cancelled booking can't be paid for");
  }

  const alreadyPaid = await bookingRepository.findPaymentByBookId(booking.id);

  if (alreadyPaid) {
    throw new AppError(400, "Booking already paid");
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `Booking ID: ${booking.id}`,
          },
          unit_amount: Math.round(booking.totalPrice * 100),
        },
        quantity: 1,
      },
    ],
    success_url: `${config.FRONTEND_URL}/checkout/success`,
    cancel_url: `${config.FRONTEND_URL}/checkout/cancel`,
    metadata: {
      bookingId: booking.id,
    },
  });

  return { url: session.url, sessionId: session.id };
};

const webhook = async (payload: { signature: string; body: Buffer }) => {
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      payload.body,
      payload.signature,
      config.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err: unknown) {
    logger.error("[webhook] Stripe signature error:", err);
    throw new AppError(400, "Webhook signature verification failed");
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const bookingId = session?.metadata?.bookingId;

    if (!bookingId) throw new AppError(400, "Booking ID not found in metadata");

    await bookingRepository.createPayment({
      bookingId,
      amount: session.amount_total ? session.amount_total / 100 : 0,
      method: "stripe",
      status: "SUCCESS",
    });

    await bookingRepository.updateBookingStatus(bookingId, "BOOKED");
    logger.info("Stripe session completed: ", session.id);
  }

  return { received: true };
};

const getPaymentDetails = async (paymentId: string) => {
  const payment = await bookingRepository.findPaymentById(paymentId);

  if (!payment) {
    throw new AppError(404, "Payment not found");
  }
  return payment;
};

export const paymentService = { checkout, webhook, getPaymentDetails };
