const { Resend } = require('resend');

// Initialize Resend with API key from environment variable
const resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      body: JSON.stringify({ error: 'Method not allowed' }) 
    };
  }

  try {
    const { name, email, phone, subject, message } = JSON.parse(event.body);
    
    // Validate required fields
    if (!name || !email || !message) {
      return { 
        statusCode: 400, 
        body: JSON.stringify({ error: 'Missing required fields: name, email, message' }) 
      };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { 
        statusCode: 400, 
        body: JSON.stringify({ error: 'Invalid email address' }) 
      };
    }

    // Send email to company
    const { data, error } = await resend.emails.send({
      from: 'eSthira Contact Form <onboarding@resend.dev>',
      to: ['info@esthira.com'],
      subject: `New Contact Form Submission: ${subject || 'Contact Form Submission'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
          <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #00a652; margin: 0; font-size: 28px;">eSthira RAPTRIC</h1>
              <p style="color: #666; margin: 5px 0 0;">New Contact Form Submission</p>
            </div>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #333; margin: 0 0 15px; font-size: 18px;">Contact Information</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555; width: 120px;">Name:</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #333;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Email:</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #333;">${email}</td>
                </tr>
                ${phone ? `
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Phone:</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #333;">${phone}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Subject:</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #333;">${subject || 'Contact Form Submission'}</td>
                </tr>
              </table>
            </div>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #333; margin: 0 0 15px; font-size: 18px;">Message</h2>
              <p style="color: #333; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #666; font-size: 14px; margin: 0;">
                This email was sent from eSthira website contact form.<br>
                You can reply directly to this email to contact the customer.
              </p>
            </div>
          </div>
        </div>
      `,
      headers: {
        'Reply-To': email
      }
    });

    if (error) {
      console.error('Error sending email:', error);
      return { 
        statusCode: 500, 
        body: JSON.stringify({ error: 'Failed to send email: ' + error.message }) 
      };
    }

    // Send auto-reply to customer
    try {
      await resend.emails.send({
        from: 'eSthira RAPTRIC <onboarding@resend.dev>',
        to: [email],
        subject: 'Thank you for contacting eSthira RAPTRIC!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
            <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #00a652; margin: 0; font-size: 28px;">eSthira RAPTRIC</h1>
                <p style="color: #666; margin: 5px 0 0;">Thank you for getting in touch!</p>
              </div>
              
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h2 style="color: #333; margin: 0 0 15px; font-size: 18px;">Dear ${name},</h2>
                <p style="color: #333; line-height: 1.6; margin: 0 0 15px;">
                  Thank you for contacting eSthira RAPTRIC! We have received your message and our team will get back to you as soon as possible.
                </p>
                <p style="color: #333; line-height: 1.6; margin: 0 0 15px;">
                  While you wait, feel free to explore our premium bicycles and eBikes on our website. We offer the perfect blend of traditional cycling excellence and modern innovation.
                </p>
                <div style="text-align: center; margin: 20px 0;">
                  <a href="https://www.esthira.com" style="display: inline-block; background-color: #00a652; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                    Explore Our Products
                  </a>
                </div>
              </div>
              
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="color: #333; margin: 0 0 10px; font-size: 16px;">Our Contact Information:</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 5px 0; color: #555; font-weight: bold;">Email:</td>
                    <td style="padding: 5px 0; color: #333;">info@esthira.com</td>
                  </tr>
                  <tr>
                    <td style="padding: 5px 0; color: #555; font-weight: bold;">Phone:</td>
                    <td style="padding: 5px 0; color: #333;">+91 93802 76355</td>
                  </tr>
                  <tr>
                    <td style="padding: 5px 0; color: #555; font-weight: bold;">Address:</td>
                    <td style="padding: 5px 0; color: #333;">367, 10T Main, Vidyapeeta Main Rd, Banashankari 3rd Stage, Bengaluru - 560085</td>
                  </tr>
                </table>
              </div>
              
              <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                <p style="color: #666; font-size: 14px; margin: 0;">
                  Best regards,<br>
                  The eSthira Team
                </p>
              </div>
            </div>
          </div>
        `
      });
    } catch (autoReplyError) {
      console.error('Auto-reply failed:', autoReplyError);
      // Don't fail the request if auto-reply fails
    }

    return { 
      statusCode: 200, 
      body: JSON.stringify({ 
        success: true, 
        message: 'Email sent successfully! We will get back to you soon.' 
      }) 
    };

  } catch (error) {
    console.error('Function error:', error);
    return { 
      statusCode: 500, 
      body: JSON.stringify({ error: 'Internal server error' }) 
    };
  }
};
