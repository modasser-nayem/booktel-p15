import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { paymentService } from "./payment.service";

const checkout = async (req: Request, res: Response) => {
  const result = await paymentService.checkout(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Redirecting to Stripe...",
    data: result,
  });
};

const webhook = async (req: Request, res: Response) => {
  const result = await paymentService.webhook({
    signature: req.headers["stripe-signature"] as string,
    body: req.body,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Webhook received",
    data: result,
  });
};

export const paymentController = { checkout, webhook };
