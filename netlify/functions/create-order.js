const Razorpay = require('razorpay');

exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      body: JSON.stringify({ error: 'Method not allowed' }) 
    };
  }

  try {
    const { amount, currency = 'INR', receipt, notes } = JSON.parse(event.body);

    // Validate required fields
    if (!amount) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          success: false, 
          error: 'Missing required field: amount' 
        }),
      };
    }

    // Get Razorpay credentials
    const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key_id || !key_secret) {
      console.error('Razorpay credentials not configured');
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          success: false, 
          error: 'Server configuration error' 
        }),
      };
    }

    console.log('Creating Razorpay order:', { amount, currency, receipt });

    // Create Razorpay instance
    const razorpay = new Razorpay({
      key_id: key_id,
      key_secret: key_secret
    });

    // Create order
    const orderOptions = {
      amount: amount,
      currency: currency,
      receipt: receipt || `receipt_${Date.now()}`,
      notes: notes || {},
      payment_capture: 1
    };

    const order = await razorpay.orders.create(orderOptions);

    console.log('Order created successfully:', {
      id: order.id,
      entity: order.entity,
      amount: order.amount,
      currency: order.currency
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true,
        order: {
          id: order.id,
          entity: order.entity,
          amount: order.amount,
          currency: order.currency,
          receipt: order.receipt
        }
      }),
    };

  } catch (err) {
    console.error('Order creation error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false, 
        error: 'Order creation failed',
        details: err.error?.description || err.message 
      }),
    };
  }
};
