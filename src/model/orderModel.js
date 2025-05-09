import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  address: {
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    pincode: { type: String, required: true },
  },
  
  total: {
    type: Number,
    required: true,
  },
  razorpayOrderId: String,
  razorpayPaymentId: String,
  status: {
    type: String,
    enum: ["placed", "shipped", "delivered", "pending", "cancelled"],
    default: "pending",
  },
  razorpayPaymentStatus: {
    type: String,
    enum: ["paid", "failed", "pending", "captured", "refunded"],
    default: "pending",
  },
}, { timestamps: true });

const Order = mongoose.model("order", orderSchema);
export default Order;
