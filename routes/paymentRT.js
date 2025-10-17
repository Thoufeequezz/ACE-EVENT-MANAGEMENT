import express from "express";
import Razorpay from "razorpay";

const router = express.Router();

// POST /create-order
router.post("/", async (req, res) => {
  try {
    // Initialize Razorpay instance
    const instance = new Razorpay({
      key_id: "rzp_test_RUU5sZSiH6upBZ",
      key_secret: process.env.RAZORPAY_SECRET_KEY,
    });

    // Order options (can be dynamic)
    const options = {
      amount: 50000, // amount in paise (₹500)
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        key1: "value3",
        key2: "value2",
      },
    };

    // Create order
    const order = await instance.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({
      success: false,
      message: "Unable to create order",
    });
  }
});

export default router;
