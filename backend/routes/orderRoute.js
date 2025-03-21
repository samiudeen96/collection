import express from "express";
import {
  allOrder,
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  updateStatus,
  userOrders,
  verifyRzp,
  verifyStripe,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js"
import userAuth from "../middleware/userAuth.js"

const orderRouter = express.Router();

// user route
orderRouter.post("/cod", userAuth, placeOrder);
orderRouter.post("/stripe", userAuth, placeOrderStripe);
orderRouter.post("/razorpay", userAuth, placeOrderRazorpay);

// admin features
orderRouter.post("/list", adminAuth, allOrder);
orderRouter.post("/status", adminAuth, updateStatus);

// user features
orderRouter.post("/userorders", userAuth, userOrders);

// verify payment
orderRouter.post("/verifyStripe", userAuth, verifyStripe)
orderRouter.post('/verifyRzp', userAuth, verifyRzp)

export default orderRouter;
