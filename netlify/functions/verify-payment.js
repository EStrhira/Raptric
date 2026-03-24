const crypto = require("crypto");

exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      body: JSON.stringify({ error: 'Method not allowed' }) 
    };
  }

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = JSON.parse(event.body);

    // Validate required fields - order_id can be empty for direct payments
    if (!razorpay_payment_id || !razorpay_signature) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          success: false, 
          error: 'Missing required fields: razorpay_payment_id, razorpay_signature' 
        }),
      };
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;
    
    // Check if secret is configured
    if (!secret) {
      console.error('RAZORPAY_KEY_SECRET not configured');
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          success: false, 
          error: 'Server configuration error' 
        }),
      };
    }

    // For Razorpay signature verification:
    // - For order payments: body = "order_id|payment_id"
    // - For direct payments: body = "payment_id" (no order_id)
    const body = (razorpay_order_id && razorpay_order_id !== '') 
      ? razorpay_order_id + "|" + razorpay_payment_id
      : razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body.toString())
      .digest("hex");

    console.log('Payment verification attempt:', {
      razorpay_order_id,
      razorpay_payment_id,
      bodyForSignature: body,
      expectedSignature: expectedSignature,
      receivedSignature: razorpay_signature,
      secretLength: secret ? secret.length : 0,
      bodyLength: body.length
    });

    if (expectedSignature === razorpay_signature) {
      return {
        statusCode: 200,
        body: JSON.stringify({ 
          success: true,
          message: 'Payment verified successfully'
        }),
      };
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          success: false, 
          error: 'Invalid signature',
          debug: {
            body: body,
            expectedSignature: expectedSignature,
            receivedSignature: razorpay_signature
          }
        }),
      };
    }
  } catch (err) {
    console.error('Payment verification error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false, 
        error: 'Internal server error',
        details: err.message 
      }),
    };
  }
};