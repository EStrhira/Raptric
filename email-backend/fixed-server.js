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

// Create transporter with error handling
function createTransporter() {
  try {
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      throw new Error('SMTP credentials not configured');
    }

    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      debug: true, // Enable debug logging
    });

    console.log('✅ Email transporter created successfully');
    console.log(`   Host: ${process.env.SMTP_HOST}`);
    console.log(`   User: ${process.env.SMTP_USER}`);
    console.log(`   Port: ${process.env.SMTP_PORT || 587}`);
    
    return transporter;
  } catch (error) {
    console.error('❌ Failed to create transporter:', error);
    throw error;
  }
}

// Simple email template
function createEmailTemplate(type, data) {
  const templates = {
    contact: {
      subject: `New Contact Form from ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd;">
          <div style="background: #00a652; color: white; padding: 20px; text-align: center;">
            <h2>⚡ eSthira Electric Bikes</h2>
            <h3>New Contact Form Submission</h3>
          </div>
          <div style="padding: 30px; background: #f8f9fa;">
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
            ${data.subject ? `<p><strong>Subject:</strong> ${data.subject}</p>` : ''}
            <p><strong>Message:</strong></p>
            <div style="background: white; padding: 15px; border-left: 4px solid #00a652; margin: 10px 0;">${data.message}</div>
            <p><small>Sent: ${new Date().toLocaleString()}</small></p>
          </div>
        </div>
      `
    }
  };
  
  return templates[type] || templates.contact;
}

// Send email function with better error handling
async function sendEmail(transporter, to, subject, html) {
  try {
    console.log('📧 Attempting to send email...');
    console.log('   To:', to);
    console.log('   Subject:', subject);
    
    const mailOptions = {
      from: `"eSthira Electric Bikes" <${process.env.SMTP_USER}>`,
      to: to,
      subject: subject,
      html: html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully!');
    console.log('   Message ID:', info.messageId);
    console.log('   Response:', info.response);
    
    return { success: true, messageId: info.messageId, response: info.response };
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    console.error('   Error code:', error.code);
    console.error('   Error message:', error.message);
    
    return { success: false, error: error.message, code: error.code };
  }
}

// Health check
app.get('/api/health', (req, res) => {
  const configured = !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
  
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'eSthira Email Service',
    configured: configured,
    smtp: {
      host: process.env.SMTP_HOST,
      user: process.env.SMTP_USER,
      port: process.env.SMTP_PORT || 587
    }
  });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    console.log('📧 Contact form request received');
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

    // Create transporter for this request
    const transporter = createTransporter();
    
    // Send email to admin
    const template = createEmailTemplate('contact', { name, email, message, phone, subject });
    const result = await sendEmail(transporter, process.env.ADMIN_EMAIL || 'info.esthira@gmail.com', template.subject, template.html);

    console.log(`📧 Contact form processed for ${email}`);
    
    if (result.success) {
      res.status(200).json({
        success: true,
        message: 'Contact form submitted successfully',
        messageId: result.messageId
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Failed to send email',
        details: result.error,
        code: result.code
      });
    }

  } catch (error) {
    console.error('❌ Contact form error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit contact form',
      message: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 eSthira Email Service starting on port ${PORT}`);
  console.log(`📧 Configuration:`);
  console.log(`   SMTP Host: ${process.env.SMTP_HOST || 'Not set'}`);
  console.log(`   SMTP User: ${process.env.SMTP_USER || 'Not set'}`);
  console.log(`   SMTP Pass: ${process.env.SMTP_PASS ? 'Set' : 'Not set'}`);
  console.log(`   Admin Email: ${process.env.ADMIN_EMAIL || 'Not set'}`);
  console.log(`📧 Available endpoints:`);
  console.log(`   POST /api/contact - Contact form submissions`);
  console.log(`   GET  /api/health - Health check`);
  console.log(`\n🔍 Test with:`);
  console.log(`   curl http://localhost:${PORT}/api/health`);
  console.log(`   curl -X POST http://localhost:${PORT}/api/contact -H "Content-Type: application/json" -d '{"name":"Test","email":"test@example.com","message":"Test message"}'`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 Server shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('👋 Server shutting down gracefully');
  process.exit(0);
});
