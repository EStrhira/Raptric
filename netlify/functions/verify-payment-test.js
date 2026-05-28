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
    
    console.log('=== PAYMENT VERIFICATION DEBUG ===');
    console.log('Received data:', {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    });
    
    const secret = process.env.RAZORPAY_KEY_SECRET;
    console.log('Environment check:', {
      hasSecret: !!secret,
      secretLength: secret ? secret.length : 0,
      allEnvVars: Object.keys(process.env).filter(key => key.includes('RAZORPAY'))
    });

    // TEMPORARY: Bypass verification for testing
    if (!razorpay_payment_id || !razorpay_signature) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          success: false, 
          error: 'Missing required fields: razorpay_payment_id, razorpay_signature',
          debug: {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
          }
        }),
      };
    }

    // For now, just return success to test the flow
    console.log('Returning success for testing');
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true,
        message: 'Payment verified successfully (TEST MODE)',
        debug: {
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
          hasSecret: !!secret
        }
      }),
    };

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
