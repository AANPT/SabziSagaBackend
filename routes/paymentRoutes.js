import express from "express";
import {
  payCheck,
  getRazorPayKey,
  paymentVerification,
} from "../controllers/paymentController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// Buy Subscription
router.route("/payCheck/:amount").get(payCheck);

// Verify Payment and save reference in database
router.route("/paymentverification").post(isAuthenticated, paymentVerification);

// Get Razorpay key
router.route("/razorpaykey").get(getRazorPayKey);

export default router;
