import { Resend } from 'resend'

// Initialize Resend with your API key
const resend = new Resend('re_drc2eo37_Gz21CpKV8f3AiNq7tTZZpksZ')

export interface EmailData {
  to: string
  subject: string
  from: string
  name: string
  email: string
  phone?: string
  message: string
}

export const sendContactEmail = async (data: EmailData) => {
  try {
    const { data: result, error } = await resend.emails.send({
      from: 'eSthira Contact Form <onboarding@resend.dev>',
      to: ['info.esthira@gmail.com'],
      subject: `New Contact Form Submission: ${data.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
          <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #00a652; margin: 0; font-size: 28px;">eSthira Raptric</h1>
              <p style="color: #666; margin: 5px 0 0;">New Contact Form Submission</p>
            </div>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #333; margin: 0 0 15px; font-size: 18px;">Contact Information</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555; width: 120px;">Name:</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #333;">${data.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Email:</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #333;">${data.email}</td>
                </tr>
                ${data.phone ? `
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Phone:</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #333;">${data.phone}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Subject:</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #333;">${data.subject}</td>
                </tr>
              </table>
            </div>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #333; margin: 0 0 15px; font-size: 18px;">Message</h2>
              <p style="color: #333; line-height: 1.6; margin: 0; white-space: pre-wrap;">${data.message}</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #666; font-size: 14px; margin: 0;">
                This email was sent from the eSthira website contact form.<br>
                You can reply directly to this email to contact the customer.
              </p>
            </div>
          </div>
        </div>
      `,
      replyTo: data.email
    })

    if (error) {
      console.error('Error sending email:', error)
      throw new Error('Failed to send email: ' + error.message)
    }

    return { success: true, message: 'Email sent successfully!' }
  } catch (error) {
    console.error('Email service error:', error)
    throw error
  }
}

// Auto-reply email to customer
export const sendAutoReplyEmail = async (customerEmail: string, customerName: string) => {
  try {
    const { data: result, error } = await resend.emails.send({
      from: 'eSthira Raptric <onboarding@resend.dev>',
      to: [customerEmail],
      subject: 'Thank you for contacting eSthira Raptric!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
          <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #00a652; margin: 0; font-size: 28px;">eSthira Raptric</h1>
              <p style="color: #666; margin: 5px 0 0;">Thank you for getting in touch!</p>
            </div>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #333; margin: 0 0 15px; font-size: 18px;">Dear ${customerName},</h2>
              <p style="color: #333; line-height: 1.6; margin: 0 0 15px;">
                Thank you for contacting eSthira Raptric! We have received your message and our team will get back to you as soon as possible.
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
                  <td style="padding: 5px 0; color: #333;">info.esthira@gmail.com</td>
                </tr>
                <tr>
                  <td style="padding: 5px 0; color: #555; font-weight: bold;">Phone:</td>
                  <td style="padding: 5px 0; color: #333;">+91 93535 21177</td>
                </tr>
                <tr>
                  <td style="padding: 5px 0; color: #555; font-weight: bold;">Address:</td>
                  <td style="padding: 5px 0; color: #333;">No. 1512, 9th Main Road, HAL 2nd Stage, Indiranagar, Bengaluru - 560008</td>
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
    })

    if (error) {
      console.error('Error sending auto-reply:', error)
      // Don't throw error for auto-reply, just log it
      return { success: false, message: 'Auto-reply failed but main email sent' }
    }

    return { success: true, message: 'Auto-reply sent successfully!' }
  } catch (error) {
    console.error('Auto-reply service error:', error)
    return { success: false, message: 'Auto-reply failed but main email sent' }
  }
}
