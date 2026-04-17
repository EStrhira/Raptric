const SibApiV3Sdk = require('sib-api-v3-sdk');
const BUSINESS_INFO = require('../../src/constants/businessInfo.json');

exports.handler = async (event) => {
  try {
    const { name, phoneNumber, email, billImage, motorImage } = JSON.parse(event.body);

    const client = SibApiV3Sdk.ApiClient.instance;
    client.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;

    const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

    // Create attachment objects
    const attachments = [];
    
    if (billImage) {
      // Convert base64 to buffer for Brevo API
      const billBuffer = Buffer.from(billImage, 'base64');
      attachments.push({
        name: `bill_${Date.now()}.jpg`,
        content: billBuffer,
        contentType: 'image/jpeg'
      });
    }
    
    if (motorImage) {
      // Convert base64 to buffer for Brevo API
      const motorBuffer = Buffer.from(motorImage, 'base64');
      attachments.push({
        name: `motor_${Date.now()}.jpg`,
        content: motorBuffer,
        contentType: 'image/jpeg'
      });
    }

    await emailApi.sendTransacEmail({
      sender: { email: BUSINESS_INFO.contact.email, name: BUSINESS_INFO.name },
      to: [{ email: BUSINESS_INFO.contact.email }],
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
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true,
        message: 'Warranty activation submitted successfully!'
      }),
    };

  } catch (error) {
    console.error('Warranty activation error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: error.message,
        message: 'Failed to submit warranty activation. Please try again.'
      }),
    };
  }
};
