const SibApiV3Sdk = require('sib-api-v3-sdk');
const BUSINESS_INFO = require('../../src/constants/businessInfo.json');

// Helper functions for responses
function successResponse(message, data = {}) {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    },
    body: JSON.stringify({ 
      success: true,
      message,
      ...data
    })
  };
}

function errorResponse(error, message, statusCode = 500) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    },
    body: JSON.stringify({ 
      success: false,
      error,
      message
    })
  };
}

exports.handler = async (event) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({ success: true })
    };
  }

  // Validate environment variables
  if (!process.env.BREVO_API_KEY) {
    console.error('BREVO_API_KEY not configured');
    return errorResponse('Server configuration error', 'Email service not properly configured');
  }

  try {
    // Validate request method
    if (event.httpMethod !== 'POST') {
      return errorResponse('Method not allowed', 'Only POST requests are accepted', 405);
    }

    // Parse and validate input
    const { name, phoneNumber, email, billImage, motorImage } = JSON.parse(event.body);
    
    if (!name || !phoneNumber || !email) {
      return errorResponse('Missing required fields', 'Name, phone, and email are required', 400);
    }

    const client = SibApiV3Sdk.ApiClient.instance;
    client.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;

    const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

    // Create attachment objects with CORRECT Brevo format
    const attachments = [];
    
    if (billImage && typeof billImage === 'string') {
      try {
        // Convert base64 to buffer, then back to base64 string for Brevo
        const billBuffer = Buffer.from(billImage, 'base64');
        attachments.push({
          name: `bill_${Date.now()}.jpg`,
          content: billBuffer.toString('base64'),  // ✅ CORRECT: Base64 string
          contentType: 'image/jpeg'
        });
      } catch (error) {
        console.error('Error processing bill image:', error);
      }
    }
    
    if (motorImage && typeof motorImage === 'string') {
      try {
        // Convert base64 to buffer, then back to base64 string for Brevo
        const motorBuffer = Buffer.from(motorImage, 'base64');
        attachments.push({
          name: `motor_${Date.now()}.jpg`,
          content: motorBuffer.toString('base64'),  // ✅ CORRECT: Base64 string
          contentType: 'image/jpeg'
        });
      } catch (error) {
        console.error('Error processing motor image:', error);
      }
    }

    const emailData = {
      sender: { 
        email: BUSINESS_INFO.contact.email, 
        name: BUSINESS_INFO.name 
      },
      to: [{ 
        email: BUSINESS_INFO.contact.email 
      }],
      subject: "Warranty Activation Request",
      htmlContent: `
        <h3>New Warranty Activation Request</h3>
        <p><b>Customer Name:</b> ${name}</p>
        <p><b>Phone Number:</b> ${phoneNumber}</p>
        <p><b>Email Address:</b> ${email}</p>
        <p><b>Bill Image:</b> ${billImage ? 'Attached' : 'Not provided'}</p>
        <p><b>Motor Image:</b> ${motorImage ? 'Attached' : 'Not provided'}</p>
        <p><b>Submission Date:</b> ${new Date().toLocaleString()}</p>
        <hr>
        <p><i>Please review the attached documents and process the warranty activation within 24-48 hours.</i></p>
      `,
      attachment: attachments
    };

    console.log('Sending email with attachments:', attachments.length);
    await emailApi.sendTransacEmail(emailData);

    return successResponse('Warranty activation submitted successfully!', {
      attachmentsSent: attachments.length
    });

  } catch (error) {
    console.error('Warranty activation error:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      body: event.body ? 'present' : 'missing'
    });
    
    return errorResponse(error.message, 'Failed to submit warranty activation. Please try again.');
  }
};
