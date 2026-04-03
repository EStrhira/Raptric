const SibApiV3Sdk = require('sib-api-v3-sdk');
const BUSINESS_INFO = require('../../src/constants/businessInfo.json');

exports.handler = async (event) => {
  try {
    const { customerEmail, orderId, product } = JSON.parse(event.body);

    const client = SibApiV3Sdk.ApiClient.instance;
    client.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;

    const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

    await emailApi.sendTransacEmail({
      sender: { email: BUSINESS_INFO.contact.email, name: BUSINESS_INFO.name },
      to: [{ email: customerEmail }],
      subject: "Order Confirmed 🚀",
      htmlContent: `
        <h2>Order Confirmed</h2>
        <p>Order ID: ${orderId}</p>
        <p>Product: ${product}</p>
      `
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};