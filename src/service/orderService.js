import Cart from "../model/cartModel.js";
import Order from "../model/orderModel.js";
import ProductModel from "../model/productModels.js";
import razorpayInstance from "../config/Razorpay.js";
import CustomError from "../utils/customError.js";

export const addOrderService = async (name, paymentMethod, userId, address) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart || cart.products.length === 0) {
    throw new CustomError("Cart is empty.");
  }

  let total = 0;
  const items = [];

  for (let item of cart.products) {
    const product = await ProductModel.findById(item.product);
    if (!product || product.quantity < item.quantity) {
      throw new CustomError(`Product ${product?.name || "unknown"} is out of stock`);
    }

    product.quantity -= item.quantity;
    await product.save();

    total += product.price * item.quantity;
    items.push({ productId: product._id, quantity: item.quantity });
  }

  const order = new Order({
    user: userId,
    name,
    address,
    paymentMethod,
    items,
    total,
  });

  await order.save();

  cart.products = [];
  await cart.save();

  let razorpayOrderId = null;

  if (paymentMethod === "razorpay") {
    const options = {
      amount: total * 100,
      currency: "INR",
      receipt: `receipt_order_${order._id}`,
      payment_capture: 1,
    };

    const razorpayOrder = await razorpayInstance.orders.create(options);
    order.razorpayOrderId = razorpayOrder.id;
    await order.save();
    razorpayOrderId = razorpayOrder.id;
  }

  return {
    message: "Order placed",
    orderId: order._id,
    razorpayOrderId,
    amount: total,
  };
};

export const verifyPaymentService = async (paymentId, razorpayOrderId) => {
  const order = await Order.findOne({ razorpayOrderId });
  if (!order || order.razorpayOrderId != razorpayOrderId) {
    throw new CustomError("order is not found", 400);
  }
  try {
    const paymentDetails = await razorpayInstance.payments.fetch(paymentId);
    if (paymentDetails.status === "captured") {
      order.razorpayPaymentStatus = "paid";
      order.status = "placed";
      await order.save();

      return true;
    } else {
      throw new CustomError("Payment verification failed");
    }
  } catch (error) {
    console.error("Error during payment verification:", error);
    throw new CustomError("Payment verification failed", 500);
  }
};


export const showOrderService = async (userId, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const orders = await Order.find({ user: userId })
    .sort({ date: -1 })
    .skip(skip)
    .limit(limit)
    .populate("items.productId");

  const totalOrders = await Order.countDocuments({ user: userId });

  return {
    orders,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(totalOrders / limit),
      totalOrders,
    },
  };
};
