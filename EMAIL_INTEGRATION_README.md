# Email Integration with Netlify Functions

This project includes a complete email integration system using Netlify Functions and Brevo (Sendinblue) API.

## 🚀 Features Implemented

### 1. Contact Form Integration
- **Responsive contact form** with validation
- **Real-time validation** for email format and required fields
- **Loading states** with spinner animation
- **Success/error messaging** with proper styling
- **API integration** with Netlify Functions

### 2. Order Email System
- **sendOrderEmail()** function for order confirmations
- **handleRazorpaySuccess()** for payment success callbacks
- **Netlify Functions** for serverless email sending
- **Brevo SDK** integration for email delivery

### 3. Netlify Functions
- **contact.js** - Handles contact form submissions
- **order.js** - Handles order confirmation emails
- **Environment variables** for API keys (BREVO_API_KEY)

## 📁 File Structure

```
src/
├── pages/
│   └── Contact.tsx              # Updated responsive contact form
├── components/
│   └── CheckoutExample.tsx      # Example checkout integration
├── utils/
│   └── emailService.ts          # Email utility functions
└── constants/
    └── businessInfo.ts          # Business configuration

netlify/
└── functions/
    ├── contact.js                # Contact form handler
    └── order.js                 # Order confirmation handler
```

## 🔧 Setup Instructions

### 1. Install Dependencies
```bash
npm install sib-api-v3-sdk
```

### 2. Environment Variables
Set these in your Netlify dashboard:
- `BREVO_API_KEY` - Your Brevo API key

### 3. Business Configuration
Update `src/constants/businessInfo.ts` with your business details:
- Business name
- Contact email
- Phone numbers
- Address information

## 📧 Usage Examples

### Contact Form
```typescript
// The contact form is already integrated in Contact.tsx
// It automatically sends emails to your business address
```

### Order Email Integration
```typescript
import { sendOrderEmail, handleRazorpaySuccess } from '../utils/emailService'

// Send order confirmation
await sendOrderEmail({
  customerEmail: 'customer@example.com',
  orderId: 'ORD-123456',
  product: 'Premium E-Bike'
})

// Handle Razorpay success
await handleRazorpaySuccess(
  'customer@example.com',
  'ORD-123456',
  'Premium E-Bike'
)
```

## 🎨 UI Features

### Contact Form
- **Responsive Design**: Mobile-first approach
- **Form Validation**: Real-time email and field validation
- **Loading States**: Spinner animation during submission
- **Error Handling**: User-friendly error messages
- **Success Feedback**: Confirmation message on success
- **Dark Theme**: Consistent with site design

### Button States
- **Normal**: Green background with hover effects
- **Loading**: Gray background with spinner
- **Disabled**: Not clickable, clear visual feedback

## 🔐 Security Features

- **No API Keys Exposed**: All sensitive data in environment variables
- **Input Validation**: Client-side and server-side validation
- **CORS Headers**: Proper cross-origin request handling
- **Error Handling**: Secure error response handling

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1024px
- **Mobile**: 480px - 768px
- **Small Mobile**: Below 480px

## 🚀 Deployment

The project is configured for Netlify deployment:

```bash
# Build for production
npm run build

# Deploy to Netlify
netlify deploy --prod
```

## 📧 Customization

### Update Business Information
Edit `src/constants/businessInfo.ts`:
```typescript
export const BUSINESS_INFO = {
  name: 'Your Business Name',
  contact: {
    email: 'contact@yourbusiness.com',
    phone: '+1234567890',
    phoneFormatted: '+1 234-567-890'
  },
  address: {
    // ... your address details
  }
}
```

### Customize Email Templates
Edit `netlify/functions/contact.js` and `netlify/functions/order.js` to customize email content and styling.

## 🔍 Testing

### Local Development
```bash
# Start Netlify functions locally
npm run netlify:dev

# Test contact form
# Navigate to /contact and submit form
```

### Production Testing
Deploy to Netlify and test:
1. Contact form submission
2. Order email triggers
3. Error handling scenarios

## 📊 Monitoring

Monitor your Netlify function logs and Brevo dashboard for:
- Email delivery status
- Error rates
- Performance metrics
- Usage statistics

## 🛠️ Troubleshooting

### Common Issues
1. **Environment Variables**: Ensure BREVO_API_KEY is set
2. **CORS Errors**: Check netlify.toml configuration
3. **Email Delivery**: Verify Brevo API credentials
4. **Build Errors**: Check all TypeScript interfaces

### Debug Mode
Add console logging to functions for debugging:
```javascript
console.log('Processing contact form submission:', { name, email, message });
```

---

**Ready to use!** 🎉

This integration provides a complete, production-ready email system for your e-bike business with modern UI and robust error handling.
