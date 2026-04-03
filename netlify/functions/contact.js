const SibApiV3Sdk = require('sib-api-v3-sdk');
const BUSINESS_INFO = require('../../src/constants/businessInfo.json');

exports.handler = async (event) => {
  try {
    const { name, email, message } = JSON.parse(event.body);

    const client = SibApiV3Sdk.ApiClient.instance;
    client.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;

    const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

    await emailApi.sendTransacEmail({
      sender: { email: BUSINESS_INFO.contact.email, name: BUSINESS_INFO.name },
      to: [{ email: BUSINESS_INFO.contact.email }],
      subject: "New Contact Form Lead",
      htmlContent: `
        <h3>New Lead</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
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