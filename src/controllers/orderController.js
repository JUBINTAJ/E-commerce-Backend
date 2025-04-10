import asyncHandler from "../middlewares/asyncHandler.js";
import {
  addOrderService,
  showOrderService,
  verifyPaymentService,
} from "../service/orderService.js";
import CustomError from "../utils/customError.js";
import { STATUS } from "../utils/constant.js";
import Order from "../model/orderModel.js"; 
import mongoose from "mongoose";
  
export const addOrder = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { name, paymentMethod, address } = req.body;

  const { orderId, razorpayOrderId, amount } = await addOrderService(
    name,
    paymentMethod,
    userId,
    address
  );

  res.status(200).json({
    status: STATUS.SUCCESS,
    orderId, 
    razorpayOrderId,
    amount,
  });
});

export const showOrder = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { page } = req.query;

  const { orders, pagination } = await showOrderService(userId, parseInt(page, 10) || 1);

  res.status(200).json({
    status: STATUS.SUCCESS,
    message: orders.length ? "Orders retrieved" : "No orders found",
    orders,
    pagination,
  });
});

export const verifyPayment = asyncHandler(async (req, res) => {
  const { paymentId, orderId } = req.body;
  try {
    const isPaymentVerified = await verifyPaymentService(paymentId, orderId);

    if (isPaymentVerified) {
      res.status(200).json({
        message: "Payment verified successfully",
      });
    } else {
      throw new CustomError("Payment verification failed", 400);
    }
  } catch (error) {
    console.error("Error in payment verification endpoint:", error);
    res.status(error.status || 500).json({
      message: "Something went wrong during payment verification.",
    });
  }
});
