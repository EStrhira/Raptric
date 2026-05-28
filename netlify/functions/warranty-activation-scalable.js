const SibApiV3Sdk = require('sib-api-v3-sdk');
const AWS = require('aws-sdk');
const BUSINESS_INFO = require('../../src/constants/businessInfo.json');

// Initialize S3 for image storage
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION || 'us-east-1'
});

exports.handler = async (event) => {
  // Validate environment variables
  if (!process.env.BREVO_API_KEY) {
    return errorResponse('Server configuration error', 'Email service not properly configured');
  }

  try {
    if (event.httpMethod !== 'POST') {
      return errorResponse('Method not allowed', 'Only POST requests are accepted', 405);
    }

    const { name, phoneNumber, email, billImage, motorImage } = JSON.parse(event.body);
    
    if (!name || !phoneNumber || !email) {
      return errorResponse('Missing required fields', 'Name, phone, and email are required', 400);
    }

    // Upload images to S3 and get URLs
    const [billImageUrl, motorImageUrl] = await Promise.all([
      billImage ? uploadImageToS3(billImage, 'bill') : null,
      motorImage ? uploadImageToS3(motorImage, 'motor') : null
    ]);

    // Send email with image URLs instead of attachments
    const client = SibApiV3Sdk.ApiClient.instance;
    client.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;
    const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

    const emailContent = `
      <h3>New Warranty Activation Request</h3>
      <p><b>Customer Name:</b> ${name}</p>
      <p><b>Phone Number:</b> ${phoneNumber}</p>
      <p><b>Email Address:</b> ${email}</p>
      <p><b>Bill Image:</b> ${billImageUrl ? `<a href="${billImageUrl}" target="_blank">View Bill Image</a>` : 'Not provided'}</p>
      <p><b>Motor Image:</b> ${motorImageUrl ? `<a href="${motorImageUrl}" target="_blank">View Motor Image</a>` : 'Not provided'}</p>
      <p><b>Submission Date:</b> ${new Date().toLocaleString()}</p>
      <hr>
      <p><i>Please review the attached documents and process the warranty activation within 24-48 hours.</i></p>
    `;

    await emailApi.sendTransacEmail({
      sender: { 
        email: BUSINESS_INFO.contact.email, 
        name: BUSINESS_INFO.name 
      },
      to: [{ 
        email: BUSINESS_INFO.contact.email 
      }],
      subject: "Warranty Activation Request",
      htmlContent: emailContent
    });

    return successResponse('Warranty activation submitted successfully!', {
      billImageUrl,
      motorImageUrl
    });

  } catch (error) {
    console.error('Warranty activation error:', error);
    return errorResponse(error.message, 'Failed to submit warranty activation. Please try again.');
  }
};

// Helper function to upload image to S3
async function uploadImageToS3(base64Data, type) {
  try {
    const buffer = Buffer.from(base64Data, 'base64');
    const fileName = `${type}-${Date.now()}.jpg`;
    const key = `warranty-activations/${fileName}`;

    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: 'image/jpeg',
      ACL: 'public-read' // Make images publicly accessible
    };

    const result = await s3.upload(params).promise();
    return result.Location; // Return the public URL
  } catch (error) {
    console.error(`Error uploading ${type} image to S3:`, error);
    throw error;
  }
}

// Helper functions for responses
function successResponse(message, data = {}) {
  return {
    statusCode: 200,
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
    body: JSON.stringify({ 
      error,
      message,
      success: false
    })
  };
}
