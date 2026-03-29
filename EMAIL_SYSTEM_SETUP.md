# eSthira Email System Setup Guide

This guide will help you set up the complete Resend email integration with Firebase Cloud Functions for your eSthira Electric Bikes website.

## 🚀 Quick Setup Overview

1. **Backend**: Firebase Cloud Functions with Resend SDK
2. **Frontend**: React hooks and components for email functionality
3. **Email Types**: Contact form, Order confirmation, Welcome emails
4. **Security**: API keys stored securely in backend only

---

## 📋 Prerequisites

- Firebase project with Blaze (pay-as-you-go) plan
- Resend account with API key
- Verified domain in Resend (for sending emails)
- Node.js 18+ installed locally

---

## 🔧 Backend Setup

### 1. Install Dependencies

```bash
cd functions
npm install resend cors joi
```

### 2. Set Environment Variables

#### Option A: Firebase Functions Config (Recommended)
```bash
# Set Resend API key
firebase functions:config:set resend.api_key="re_your_resend_api_key"

# Set admin email
firebase functions:config:set admin.email="info.esthira@gmail.com"

# Set from email domain
firebase functions:config:set email.from="noreply@esthira.com"
```

#### Option B: Local Environment (for development)
Create `functions/.env`:
```env
RESEND_API_KEY=re_your_resend_api_key_here
ADMIN_EMAIL=info.esthira@gmail.com
FROM_EMAIL=noreply@esthira.com
```

### 3. Deploy Cloud Functions

```bash
# Build and deploy
cd functions
npm run deploy
```

### 4. Available Email Endpoints

Once deployed, you'll have these endpoints:

- `POST /sendContactEmail` - Send contact form to admin
- `POST /sendOrderEmail` - Send order confirmation to user
- `POST /sendWelcomeEmail` - Send welcome email to new user

---

## 🎨 Frontend Setup

### 1. Install Dependencies (if not already installed)

```bash
npm install @types/node
```

### 2. Update Email Service URL

In `src/services/EmailService.ts`, update the URL:

```typescript
const EMAIL_SERVICE_URL = 'https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net';
```

Replace `YOUR_PROJECT_ID` with your actual Firebase project ID.

### 3. Use Email Components

#### Contact Form Example
```tsx
import ContactForm from '../components/ContactForm';

function ContactPage() {
  const handleSuccess = () => {
    console.log('Contact form submitted successfully');
  };

  const handleError = (error: string) => {
    console.error('Contact form error:', error);
  };

  return (
    <div>
      <h1>Contact Us</h1>
      <ContactForm onSuccess={handleSuccess} onError={handleError} />
    </div>
  );
}
```

#### Order Confirmation Example
```tsx
import { useOrderEmail } from '../hooks/useEmail';

function OrderSuccessPage({ order }) {
  const { sendOrderConfirmation, loading, error, success } = useOrderEmail();

  useEffect(() => {
    if (order && !loading && !success) {
      sendOrderConfirmation({
        orderId: order.id,
        userEmail: order.userEmail,
        userName: order.userName,
        orderItems: order.items,
        totalAmount: order.total,
        shippingAddress: order.shippingAddress,
        estimatedDelivery: order.estimatedDelivery,
        paymentMethod: order.paymentMethod
      });
    }
  }, [order]);

  return (
    <div>
      {loading && <p>Sending confirmation email...</p>}
      {success && <p>Order confirmation sent!</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
}
```

#### Welcome Email Example
```tsx
import { useWelcomeEmail } from '../hooks/useEmail';

function UserSignupComponent() {
  const { sendWelcome } = useWelcomeEmail();

  const handleSignup = async (userData) => {
    // Your signup logic here...
    
    // Send welcome email
    await sendWelcome({
      userEmail: userData.email,
      userName: userData.name,
      loginMethod: userData.method // 'email' or 'google'
    });
  };

  return <div>Signup form here...</div>;
}
```

---

## 📧 Email Templates

The system includes three pre-designed email templates:

### 1. Contact Form Email
- **To**: info.esthira@gmail.com
- **Contains**: Name, Email, Phone (optional), Message
- **Style**: eSthira branded with green theme

### 2. Order Confirmation Email
- **To**: Customer's email
- **Contains**: Order details, items, shipping info, estimated delivery
- **Style**: Professional order confirmation with branding

### 3. Welcome Email
- **To**: New user's email
- **Contains**: Welcome message, features, call-to-action
- **Style**: Friendly onboarding with brand colors

---

## 🔒 Security Features

### API Key Protection
- ✅ Resend API key stored only in backend
- ✅ Never exposed to frontend
- ✅ Environment variable protection

### Input Validation
- ✅ Joi schema validation on all inputs
- ✅ Email format validation
- ✅ Required field checks
- ✅ Length limits

### CORS Protection
- ✅ CORS enabled for your domain only
- ✅ HTTP method validation (POST only)

---

## 🛠️ Testing

### Local Testing with Firebase Emulator

```bash
# Start emulator
firebase emulators:start

# Test endpoints locally
curl -X POST http://localhost:5001/your-project/us-central1/sendContactEmail \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Test message"
  }'
```

### Frontend Testing

```typescript
// Test contact form
const { submitContactForm, loading, error, success } = useContactForm();

await submitContactForm({
  name: 'Test User',
  email: 'test@example.com',
  message: 'This is a test message'
});
```

---

## 📊 Monitoring

### View Function Logs
```bash
firebase functions:log
```

### Monitor Email Sending
- Check Firebase console logs
- Monitor Resend dashboard
- Track success/error rates

---

## 🚨 Troubleshooting

### Common Issues

#### 1. "API key not configured" Error
**Solution**: Set Resend API key in Firebase Functions config
```bash
firebase functions:config:set resend.api_key="your_key"
```

#### 2. CORS Errors
**Solution**: Ensure your frontend URL is allowed in CORS settings

#### 3. Email Not Sending
**Solution**: 
- Verify Resend API key is valid
- Check if domain is verified in Resend
- Check function logs for errors

#### 4. Frontend URL Issues
**Solution**: Update `EMAIL_SERVICE_URL` with correct project ID

### Debug Mode

Add logging to see what's happening:
```javascript
console.log('Sending email to:', userEmail);
console.log('Template data:', templateData);
```

---

## 📈 Production Best Practices

### 1. Rate Limiting
Consider adding rate limiting to prevent spam:
```javascript
// Add to your functions
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5 // limit each IP to 5 requests per windowMs
});
```

### 2. Error Monitoring
Consider using error monitoring services like Sentry.

### 3. Email Analytics
Track email open rates and engagement through Resend dashboard.

### 4. Backup Email Service
Consider having a backup email service (like SendGrid) for critical emails.

---

## 🔄 Maintenance

### Regular Tasks
- Monitor email deliverability
- Update email templates as needed
- Review function logs periodically
- Update API keys if compromised

### Scaling
- Monitor Cloud Function usage
- Consider upgrading Resend plan for higher volume
- Implement email queuing for bulk sending

---

## 📞 Support

If you encounter issues:

1. Check Firebase Functions logs
2. Verify Resend API key and domain setup
3. Test with the Firebase emulator locally
4. Check network requests in browser dev tools

For Resend-specific issues: https://resend.com/docs
For Firebase Functions issues: https://firebase.google.com/docs/functions

---

## 🎉 You're All Set!

Your eSthira website now has a complete email system with:
- ✅ Secure backend API
- ✅ Beautiful email templates
- ✅ React components and hooks
- ✅ Error handling and retries
- ✅ Production-ready security

Happy emailing! 🚀
