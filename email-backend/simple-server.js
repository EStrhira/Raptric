const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic email transporter
let transporter;

async function initializeEmailService() {
  try {
    // Try Gmail first
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      transporter = nodemailer.createTransporter({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT) || 587,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
      console.log('✅ Gmail SMTP configured');
    } else {
      throw new Error('Email service not configured. Please set SMTP credentials.');
    }
    
    // Test connection
    await transporter.verify();
    console.log('✅ Email service connection verified');
  } catch (error) {
    console.error('❌ Email service initialization failed:', error.message);
    console.log('📧 To configure email service:');
    console.log('1. Set SMTP_HOST=smtp.gmail.com');
    console.log('2. Set SMTP_USER=your_email@gmail.com');
    console.log('3. Set SMTP_PASS=your_gmail_app_password');
    console.log('4. Restart server');
  }
}

// Simple email template
function createEmailTemplate(type, data) {
  const templates = {
    contact: {
      subject: `New Contact Form from ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #00a652; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <h2>⚡ eSthira Electric Bikes</h2>
            <h3>New Contact Form Submission</h3>
          </div>
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
            ${data.subject ? `<p><strong>Subject:</strong> ${data.subject}</p>` : ''}
            <p><strong>Message:</strong></p>
            <p style="background: white; padding: 15px; border-left: 4px solid #00a652;">${data.message}</p>
            <p><small>Sent: ${new Date().toLocaleString()}</small></p>
          </div>
        </div>
      `
    },
    welcome: {
      subject: 'Welcome to eSthira Electric Bikes!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #00a652; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <h2>⚡ eSthira Electric Bikes</h2>
            <h1>Welcome ${data.userName}!</h1>
          </div>
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <p>Thank you for joining the eSthira family! We're excited to have you as part of our electric bike community.</p>
            <p>You've successfully created an account and can now:</p>
            <ul>
              <li>Browse our premium electric bikes</li>
              <li>Save your favorite models</li>
              <li>Track your orders</li>
              <li>Get exclusive member benefits</li>
            </ul>
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://esthira.com" style="background: #00a652; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">Start Shopping</a>
            </div>
            <p>Happy riding!</p>
            <p><strong>The eSthira Team</strong></p>
          </div>
        </div>
      `
    }
  };
  
  return templates[type] || templates.contact;
}

// Send email function
async function sendEmail(to, subject, html) {
  try {
    const mailOptions = {
      from: `"eSthira Electric Bikes" <${process.env.SMTP_USER}>`,
      to: to,
      subject: subject,
      html: html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Email sending failed:', error.message);
    throw new Error(`Failed to send email: ${error.message}`);
  }
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'eSthira Email Service',
    configured: !!transporter
  });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message, phone, subject } = req.body;
    
    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Name, email, and message are required'
      });
    }

    if (!email.includes('@')) {
      return res.status(400).json({
        success: false,
        error: 'Valid email is required'
      });
    }

    // Send email to admin
    const template = createEmailTemplate('contact', { name, email, message, phone, subject });
    await sendEmail(process.env.ADMIN_EMAIL || 'info.esthira@gmail.com', template.subject, template.html);

    console.log(`📧 Contact form email sent from ${email}`);
    
    res.status(200).json({
      success: true,
      message: 'Contact form submitted successfully'
    });

  } catch (error) {
    console.error('❌ Contact form error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to submit contact form',
      message: error.message
    });
  }
});

// Welcome email endpoint
app.post('/api/welcome', async (req, res) => {
  try {
    const { userEmail, userName, loginMethod } = req.body;
    
    // Basic validation
    if (!userEmail || !userName) {
      return res.status(400).json({
        success: false,
        error: 'User email and name are required'
      });
    }

    if (!userEmail.includes('@')) {
      return res.status(400).json({
        success: false,
        error: 'Valid user email is required'
      });
    }

    // Send welcome email
    const template = createEmailTemplate('welcome', { userName, userEmail });
    await sendEmail(userEmail, template.subject, template.html);

    console.log(`📧 Welcome email sent to ${userEmail}`);
    
    res.status(200).json({
      success: true,
      message: 'Welcome email sent successfully'
    });

  } catch (error) {
    console.error('❌ Welcome email error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to send welcome email',
      message: error.message
    });
  }
});

// Start server
async function startServer() {
  await initializeEmailService();
  
  app.listen(PORT, () => {
    console.log(`🚀 eSthira Email Service running on port ${PORT}`);
    console.log(`📧 Available endpoints:`);
    console.log(`   POST /api/contact - Contact form submissions`);
    console.log(`   POST /api/welcome - Welcome emails`);
    console.log(`   GET  /api/health - Health check`);
    
    if (!transporter) {
      console.log(`\n⚠️  EMAIL SERVICE NOT CONFIGURED!`);
      console.log(`📧 To configure email service:`);
      console.log(`1. Edit .env file:`);
      console.log(`   SMTP_HOST=smtp.gmail.com`);
      console.log(`   SMTP_USER=your_email@gmail.com`);
      console.log(`   SMTP_PASS=your_gmail_app_password`);
      console.log(`2. Restart server`);
    } else {
      console.log(`\n✅ Email service configured and ready!`);
    }
  });
}

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 Server shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('👋 Server shutting down gracefully');
  process.exit(0);
});

startServer();
