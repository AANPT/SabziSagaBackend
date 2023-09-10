import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import User from "../models/User.js";
import ErrorHandler from "../utils/errorHandler.js";
import { instance } from "../server.js";
import crypto from "crypto";
import Payment from "../models/Payment.js";

export const payCheck = catchAsyncError(async (req, res, next) => {
  // const user = await User.findById(req.user._id);

  const { amount } = req.params; // The amount to pay for the vegetable product

  if (!amount || amount <= 0) {
    return next(new ErrorHandler("Invalid amount", 400));
  }

  let total = amount * 100;
  // Create a Razorpay order
  const orderOptions = {
    amount: total, // Razorpay expects the amount in paisa (multiplying by 100)
    currency: "INR", // Change to the appropriate currency code if needed
    receipt: "vegetable_order_" + Date.now(), // A unique identifier for the order
  };

  try {
    const order = await instance.orders.create(orderOptions);

    res.status(201).json({
      success: true,
      orderId: order.id,
      // amount: order.amount,
    });
  } catch (err) {
    return next(new ErrorHandler("Failed to create a Razorpay order", 500));
  }
});

export const getRazorPayKey = catchAsyncError(async (req, res, next) => {
  res.status(200).json({
    success: true,
    key: process.env.RAZORPAY_API_KEY,
  });
});

export const paymentVerification = catchAsyncError(async (req, res, next) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here

    // await Payment.create({
    //   razorpay_order_id,
    //   razorpay_payment_id,
    //   razorpay_signature,
    // });

    // if (!isAuthentic)
    //   return res.redirect(`${process.env.FRONTEND_URL}/paymentfail`);

    // // database comes here
    // await Payment.create({
    //   razorpay_signature,
    //   razorpay_payment_id,
    //   razorpay_subscription_id,
    // });

    res.redirect(
      `${process.env.FRONTEND_URL}/paymentsuccess?reference=${razorpay_payment_id}`
    );
  } else {
    res.status(400).json({
      success: false,
    });
  }
});
