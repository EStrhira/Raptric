const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');
const Joi = require('joi');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Email transporter setup
let transporter;

// Initialize email service
async function initializeEmailService() {
  try {
    if (process.env.SENDGRID_API_KEY) {
      // Use SendGrid
      const nodemailerSendgrid = require('nodemailer-sendgrid');
      transporter = nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          api_key: process.env.SENDGRID_API_KEY,
        },
      });
      console.log('✅ SendGrid email service initialized');
    } else if (process.env.SMTP_HOST) {
      // Use SMTP (Gmail, Outlook, etc.)
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT) || 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
      console.log('✅ SMTP email service initialized');
    } else {
      throw new Error('No email service configured. Please set SENDGRID_API_KEY or SMTP credentials.');
    }
    
    // Verify connection
    await transporter.verify();
    console.log('✅ Email service connection verified');
  } catch (error) {
    console.error('❌ Email service initialization failed:', error);
    process.exit(1);
  }
}

// Validation schemas
const contactSchema = Joi.object({
  name: Joi.string().required().min(2).max(100).trim(),
  email: Joi.string().email().required().trim(),
  message: Joi.string().required().min(10).max(2000).trim(),
  phone: Joi.string().optional().pattern(/^[+]?[\d\s\-\(\)]+$/).max(20),
  subject: Joi.string().optional().max(200).trim()
});

const orderConfirmationSchema = Joi.object({
  userEmail: Joi.string().email().required().trim(),
  userName: Joi.string().required().min(2).max(100).trim(),
  orderId: Joi.string().required().max(50).trim(),
  orderItems: Joi.array().items(
    Joi.object({
      name: Joi.string().required().max(200),
      quantity: Joi.number().integer().min(1).required(),
      price: Joi.number().min(0).required(),
      image: Joi.string().uri().optional()
    })
  ).required().min(1),
  totalAmount: Joi.number().min(0).required(),
  shippingAddress: Joi.object({
    street: Joi.string().required().max(200),
    city: Joi.string().required().max(100),
    state: Joi.string().required().max(100),
    postalCode: Joi.string().required().max(20),
    country: Joi.string().required().max(100)
  }).required(),
  estimatedDelivery: Joi.string().required().max(100),
  paymentMethod: Joi.string().required().max(50)
});

const welcomeEmailSchema = Joi.object({
  userEmail: Joi.string().email().required().trim(),
  userName: Joi.string().required().min(2).max(100).trim(),
  loginMethod: Joi.string().valid('email', 'google', 'facebook').required()
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
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #00a652, #008040); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
          .field { margin-bottom: 20px; padding: 15px; background: white; border-radius: 5px; border-left: 4px solid #00a652; }
          .label { font-weight: bold; color: #00a652; margin-bottom: 5px; }
          .value { color: #555; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">⚡ eSthira Electric Bikes</div>
          <h2>New Contact Form Submission</h2>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">👤 Name:</div>
            <div class="value">${data.name}</div>
          </div>
          <div class="field">
            <div class="label">📧 Email:</div>
            <div class="value">${data.email}</div>
          </div>
          ${data.phone ? `
          <div class="field">
            <div class="label">📱 Phone:</div>
            <div class="value">${data.phone}</div>
          </div>
          ` : ''}
          ${data.subject ? `
          <div class="field">
            <div class="label">📋 Subject:</div>
            <div class="value">${data.subject}</div>
          </div>
          ` : ''}
          <div class="field">
            <div class="label">💬 Message:</div>
            <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
          </div>
          <div class="field">
            <div class="label">📅 Submitted:</div>
            <div class="value">${new Date().toLocaleString()}</div>
          </div>
        </div>
        <div class="footer">
          <p>This email was sent from the eSthira Electric Bikes website</p>
          <p>${process.env.WEBSITE_URL || 'https://esthira.com'}</p>
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
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #00a652, #008040); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
          .order-info { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #00a652; }
          .product { border-bottom: 1px solid #eee; padding: 15px 0; }
          .product:last-child { border-bottom: none; }
          .product-name { font-weight: bold; color: #00a652; }
          .product-details { color: #666; font-size: 14px; }
          .total { font-size: 18px; font-weight: bold; color: #00a652; text-align: right; margin: 20px 0; padding: 15px; background: white; border-radius: 5px; }
          .shipping-info { background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">⚡ eSthira Electric Bikes</div>
          <h1>Order Confirmation</h1>
        </div>
        <div class="content">
          <h2>Thank you for your order, ${data.userName}!</h2>
          <p>Your order has been confirmed and is being processed.</p>
          
          <div class="order-info">
            <h3>📦 Order Information</h3>
            <p><strong>Order ID:</strong> ${data.orderId}</p>
            <p><strong>Payment Method:</strong> ${data.paymentMethod}</p>
            <p><strong>Order Date:</strong> ${new Date().toLocaleDateString()}</p>
          </div>

          <h3>🛍️ Order Items</h3>
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
            <h3>🚚 Shipping Information</h3>
            <p><strong>${data.userName}</strong></p>
            <p>${data.shippingAddress.street}</p>
            <p>${data.shippingAddress.city}, ${data.shippingAddress.state} ${data.shippingAddress.postalCode}</p>
            <p>${data.shippingAddress.country}</p>
            <p><strong>Estimated Delivery:</strong> ${data.estimatedDelivery}</p>
          </div>

          <p>We'll send you updates when your order ships.</p>
        </div>
        <div class="footer">
          <p>Thank you for choosing eSthira Electric Bikes!</p>
          <p>${process.env.WEBSITE_URL || 'https://esthira.com'}</p>
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
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #00a652, #008040); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
          .feature { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #00a652; }
          .cta-button { display: inline-block; background: #00a652; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">⚡ eSthira Electric Bikes</div>
          <h1>Welcome to eSthira!</h1>
          <p>Your journey into electric mobility starts here</p>
        </div>
        <div class="content">
          <h2>Hi ${data.userName},</h2>
          <p>Welcome to the eSthira family! We're excited to have you join our community of electric bike enthusiasts.</p>
          
          <p>You've successfully ${data.loginMethod === 'google' ? 'signed in with Google' : data.loginMethod === 'facebook' ? 'signed in with Facebook' : 'created an account'} and can now:</p>
          
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
            <a href="${process.env.WEBSITE_URL || 'https://esthira.com'}" class="cta-button">Start Shopping</a>
          </div>

          <p>If you have any questions, our support team is here to help you at every step of your electric bike journey.</p>
          
          <p>Happy riding!</p>
          <p><strong>The eSthira Team</strong></p>
        </div>
        <div class="footer">
          <p>eSthira Electric Bikes | Premium Electric Mobility Solutions</p>
          <p>You're receiving this email because you created an account on ${process.env.WEBSITE_URL || 'esthira.com'}</p>
        </div>
      </body>
      </html>
    `
  })
};

// Utility function to send emails
async function sendEmail(to, subject, html) {
  try {
    const mailOptions = {
      from: `${process.env.FROM_NAME || 'eSthira Electric Bikes'} <${process.env.FROM_EMAIL || 'noreply@esthira.com'}>`,
      to: Array.isArray(to) ? to : [to],
      subject: subject,
      html: html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
}

// API Routes

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'eSthira Email Service'
  });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    // Validate input
    const { error, value } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: error.details.map(d => d.message)
      });
    }

    const { name, email, message, phone, subject } = value;

    // Send email to admin
    const emailTemplate = emailTemplates.contactForm({ 
      name, 
      email, 
      message, 
      phone, 
      subject: subject || 'Contact Form Submission' 
    });
    
    await sendEmail(process.env.ADMIN_EMAIL, emailTemplate.subject, emailTemplate.html);

    console.log(`📧 Contact form email sent from ${email}`);
    
    res.status(200).json({
      success: true,
      message: 'Contact form submitted successfully'
    });

  } catch (error) {
    console.error('❌ Contact form error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit contact form',
      message: error.message
    });
  }
});

// Order confirmation endpoint
app.post('/api/order-confirmation', async (req, res) => {
  try {
    // Validate input
    const { error, value } = orderConfirmationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: error.details.map(d => d.message)
      });
    }

    const { userEmail, userName, orderId, orderItems, totalAmount, shippingAddress, estimatedDelivery, paymentMethod } = value;

    // Send order confirmation email to user
    const emailTemplate = emailTemplates.orderConfirmation({
      orderId,
      userEmail,
      userName,
      orderItems,
      totalAmount,
      shippingAddress,
      estimatedDelivery,
      paymentMethod
    });

    await sendEmail(userEmail, emailTemplate.subject, emailTemplate.html);

    console.log(`📧 Order confirmation email sent to ${userEmail} for order ${orderId}`);
    
    res.status(200).json({
      success: true,
      message: 'Order confirmation email sent successfully'
    });

  } catch (error) {
    console.error('❌ Order confirmation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send order confirmation',
      message: error.message
    });
  }
});

// Welcome email endpoint
app.post('/api/welcome', async (req, res) => {
  try {
    // Validate input
    const { error, value } = welcomeEmailSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: error.details.map(d => d.message)
      });
    }

    const { userEmail, userName, loginMethod } = value;

    // Send welcome email to user
    const emailTemplate = emailTemplates.welcomeEmail({
      userEmail,
      userName,
      loginMethod
    });

    await sendEmail(userEmail, emailTemplate.subject, emailTemplate.html);

    console.log(`📧 Welcome email sent to ${userEmail}`);
    
    res.status(200).json({
      success: true,
      message: 'Welcome email sent successfully'
    });

  } catch (error) {
    console.error('❌ Welcome email error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send welcome email',
      message: error.message
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('❌ Unhandled error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : error.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    message: `Cannot ${req.method} ${req.path}`
  });
});

// Start server
async function startServer() {
  try {
    await initializeEmailService();
    
    app.listen(PORT, () => {
      console.log(`🚀 eSthira Email Service running on port ${PORT}`);
      console.log(`📧 Available endpoints:`);
      console.log(`   POST /api/contact - Contact form submissions`);
      console.log(`   POST /api/order-confirmation - Order confirmations`);
      console.log(`   POST /api/welcome - Welcome emails`);
      console.log(`   GET  /api/health - Health check`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('👋 SIGINT received, shutting down gracefully');
  process.exit(0);
});

// Start the server
startServer();

module.exports = app;
