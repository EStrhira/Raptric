const { Resend } = require('resend');
const cors = require('cors');
const Joi = require('joi');

// Initialize Resend with API key from environment
const resend = new Resend(process.env.RESEND_API_KEY);

// CORS configuration
const corsHandler = cors({ origin: true });

// Email validation schemas
const contactFormSchema = Joi.object({
  name: Joi.string().required().min(2).max(100),
  email: Joi.string().email().required(),
  message: Joi.string().required().min(10).max(1000),
  phone: Joi.string().optional().pattern(/^[+]?[\d\s-()]+$/),
});

const orderConfirmationSchema = Joi.object({
  orderId: Joi.string().required(),
  userEmail: Joi.string().email().required(),
  userName: Joi.string().required().min(2).max(100),
  orderItems: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      quantity: Joi.number().integer().min(1).required(),
      price: Joi.number().min(0).required(),
      image: Joi.string().optional()
    })
  ).required(),
  totalAmount: Joi.number().min(0).required(),
  shippingAddress: Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    postalCode: Joi.string().required(),
    country: Joi.string().required()
  }).required(),
  estimatedDelivery: Joi.string().required(),
  paymentMethod: Joi.string().required()
});

const welcomeEmailSchema = Joi.object({
  userEmail: Joi.string().email().required(),
  userName: Joi.string().required().min(2).max(100),
  loginMethod: Joi.string().valid('email', 'google').required()
});

// Email templates
const emailTemplates = {
  contactForm: (data) => ({
    subject: `New Contact Form Submission from ${data.name}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contact Form Submission</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #00a652; color: white; padding: 20px; text-align: center; }
          .content { padding: 30px 20px; background: #f9f9f9; }
          .field { margin-bottom: 20px; }
          .label { font-weight: bold; color: #00a652; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>eSthira Electric Bikes</h1>
            <p>New Contact Form Submission</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Name:</div>
              <div>${data.name}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div>${data.email}</div>
            </div>
            ${data.phone ? `
            <div class="field">
              <div class="label">Phone:</div>
              <div>${data.phone}</div>
            </div>
            ` : ''}
            <div class="field">
              <div class="label">Message:</div>
              <div>${data.message.replace(/\n/g, '<br>')}</div>
            </div>
            <div class="field">
              <div class="label">Submitted:</div>
              <div>${new Date().toLocaleString()}</div>
            </div>
          </div>
          <div class="footer">
            <p>This email was sent from the eSthira Electric Bikes website</p>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  orderConfirmation: (data) => ({
    subject: `Order Confirmation #${data.orderId}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Confirmation</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #00a652; color: white; padding: 20px; text-align: center; }
          .content { padding: 30px 20px; background: #f9f9f9; }
          .order-info { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .product { border-bottom: 1px solid #eee; padding: 15px 0; }
          .product:last-child { border-bottom: none; }
          .product-name { font-weight: bold; }
          .product-details { color: #666; font-size: 14px; }
          .total { font-size: 18px; font-weight: bold; color: #00a652; text-align: right; margin: 20px 0; }
          .shipping-info { background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>eSthira Electric Bikes</h1>
            <p>Order Confirmation</p>
          </div>
          <div class="content">
            <h2>Thank you for your order, ${data.userName}!</h2>
            <p>Your order has been confirmed and is being processed.</p>
            
            <div class="order-info">
              <h3>Order Information</h3>
              <p><strong>Order ID:</strong> ${data.orderId}</p>
              <p><strong>Payment Method:</strong> ${data.paymentMethod}</p>
              <p><strong>Order Date:</strong> ${new Date().toLocaleDateString()}</p>
            </div>

            <h3>Order Items</h3>
            ${data.orderItems.map(item => `
              <div class="product">
                <div class="product-name">${item.name}</div>
                <div class="product-details">
                  Quantity: ${item.quantity} | Price: ₹${item.price.toLocaleString()}
                </div>
              </div>
            `).join('')}
            
            <div class="total">
              Total Amount: ₹${data.totalAmount.toLocaleString()}
            </div>

            <div class="shipping-info">
              <h3>Shipping Information</h3>
              <p>${data.userName}</p>
              <p>${data.shippingAddress.street}</p>
              <p>${data.shippingAddress.city}, ${data.shippingAddress.state} ${data.shippingAddress.postalCode}</p>
              <p>${data.shippingAddress.country}</p>
              <p><strong>Estimated Delivery:</strong> ${data.estimatedDelivery}</p>
            </div>

            <p>We'll send you updates when your order ships.</p>
          </div>
          <div class="footer">
            <p>Thank you for choosing eSthira Electric Bikes!</p>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  welcomeEmail: (data) => ({
    subject: 'Welcome to eSthira Electric Bikes!',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to eSthira</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #00a652; color: white; padding: 30px 20px; text-align: center; }
          .content { padding: 30px 20px; background: #f9f9f9; }
          .feature { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .cta-button { display: inline-block; background: #00a652; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to eSthira!</h1>
            <p>Your journey into electric mobility starts here</p>
          </div>
          <div class="content">
            <h2>Hi ${data.userName},</h2>
            <p>Welcome to the eSthira family! We're excited to have you join our community of electric bike enthusiasts.</p>
            
            <p>You've successfully ${data.loginMethod === 'google' ? 'signed in with Google' : 'created an account'} and can now:</p>
            
            <div class="feature">
              <h3>🚴 What You Can Do Now</h3>
              <ul>
                <li>Browse our premium electric bikes</li>
                <li>Save your favorite models</li>
                <li>Track your orders</li>
                <li>Get exclusive member benefits</li>
              </ul>
            </div>

            <div class="feature">
              <h3>⚡ Why Choose eSthira?</h3>
              <ul>
                <li>Premium quality electric bikes</li>
                <li>Industry-leading warranty</li>
                <li>Expert customer support</li>
                <li>Pan-India delivery</li>
              </ul>
            </div>

            <div style="text-align: center;">
              <a href="https://esthira.com" class="cta-button">Start Shopping</a>
            </div>

            <p>If you have any questions, our support team is here to help you at every step of your electric bike journey.</p>
            
            <p>Happy riding!</p>
            <p><strong>The eSthira Team</strong></p>
          </div>
          <div class="footer">
            <p>eSthira Electric Bikes | Premium Electric Mobility Solutions</p>
            <p>You're receiving this email because you created an account on esthira.com</p>
          </div>
        </div>
      </body>
      </html>
    `
  })
};

// Utility function to send emails
async function sendEmail(to, subject, html) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'eSthira Electric Bikes <noreply@esthira.com>',
      to: [to],
      subject: subject,
      html: html
    });

    if (error) {
      console.error('Resend API error:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    return { success: true, messageId: data.id };
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
}

module.exports = {
  resend,
  corsHandler,
  contactFormSchema,
  orderConfirmationSchema,
  welcomeEmailSchema,
  emailTemplates,
  sendEmail
};
