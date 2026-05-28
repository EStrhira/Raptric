const Razorpay = require("razorpay");

exports.handler = async (event) => {
  try {
    console.log("=== CREATE ORDER START ===");

    const { amount } = JSON.parse(event.body);
    console.log("Amount received:", amount);

    // ✅ Check env variables - Updated variable names
    if (!process.env.RAZORPAY_KEY_ID && !process.env.RAZORPAY_KEY_SECRET) {
      // Try alternative variable names
      const keyId = process.env.RAZORPAY_KEY_ID || process.env.RAZORPAY_API_KEY;
      const keySecret = process.env.RAZORPAY_KEY_SECRET || process.env.RAZORPAY_API_SECRET;
      
      if (!keyId || !keySecret) {
        throw new Error("Missing Razorpay environment variables. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET");
      }
      
      process.env.RAZORPAY_KEY_ID = keyId;
      process.env.RAZORPAY_KEY_SECRET = keySecret;
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    console.log("Order created:", order);

    return {
      statusCode: 200,
      body: JSON.stringify(order),
    };

  } catch (error) {
    console.error("❌ ORDER CREATION ERROR:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Order creation failed",
        message: error.message,
      }),
    };
  }
};