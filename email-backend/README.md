# 📧 Complete Email System Setup Guide

## 🚀 **Overview**

This is a **complete, production-ready email system** for your React web application using **Node.js backend** with **modern email providers**. No Firebase required!

## 📁 **Folder Structure**

```
email-backend/
├── package.json              # Dependencies and scripts
├── server.js                  # Main server file with all API endpoints
├── .env.example              # Environment variables template
└── README.md                 # Setup instructions

src/
├── services/
│   └── CustomEmailService.ts # Frontend email service
├── hooks/
│   └── useCustomEmail.ts     # React hooks for email functionality
└── components/
    └── CustomContactForm.tsx # Contact form component
```

---

## 🔧 **Backend Setup**

### **1. Install Dependencies**

```bash
cd email-backend
npm install
```

### **2. Choose Email Provider**

#### **Option 1: SendGrid (Recommended)**
1. Sign up at [SendGrid](https://sendgrid.com)
2. Get your API key
3. Create `.env` file:
```env
SENDGRID_API_KEY=SG.your_sendgrid_api_key_here
FROM_EMAIL=noreply@esthira.com
FROM_NAME=eSthira Electric Bikes
ADMIN_EMAIL=info.esthira@gmail.com
```

#### **Option 2: Gmail SMTP (Free)**
1. Enable 2FA on your Gmail
2. Generate App Password
3. Create `.env` file:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
FROM_EMAIL=your_email@gmail.com
ADMIN_EMAIL=info.esthira@gmail.com
```

### **3. Configure Environment Variables**

Copy `.env.example` to `.env` and configure:

```env
# Email Service (Choose ONE)
SENDGRID_API_KEY=SG.your_sendgrid_api_key_here
# OR
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Basic Configuration
FROM_EMAIL=noreply@esthira.com
FROM_NAME=eSthira Electric Bikes
ADMIN_EMAIL=info.esthira@gmail.com
WEBSITE_URL=https://esthira.com

# Security
NODE_ENV=production
CORS_ORIGIN=https://esthira.com
PORT=3001
```

### **4. Start the Server**

```bash
# Development
npm run dev

# Production
npm start
```

---

## 🌐 **API Endpoints**

### **Available Endpoints:**

| Method | Endpoint | Description |
|--------|-----------|-------------|
| `POST` | `/api/contact` | Send contact form to admin |
| `POST` | `/api/order-confirmation` | Send order confirmation to customer |
| `POST` | `/api/welcome` | Send welcome email to new user |
| `GET` | `/api/health` | Check service health |

### **Request Examples:**

#### **Contact Form**
```json
POST /api/contact
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 9876543210",
  "subject": "Product Inquiry",
  "message": "I'm interested in your electric bikes"
}
```

#### **Order Confirmation**
```json
POST /api/order-confirmation
{
  "orderId": "ORD-123456",
  "userEmail": "customer@example.com",
  "userName": "Jane Smith",
  "orderItems": [
    {
      "name": "RAPTRIC Electric Bike",
      "quantity": 1,
      "price": 45000
    }
  ],
  "totalAmount": 45000,
  "shippingAddress": {
    "street": "123 Main St",
    "city": "Bangalore",
    "state": "Karnataka",
    "postalCode": "560001",
    "country": "India"
  },
  "estimatedDelivery": "5-7 business days",
  "paymentMethod": "Credit Card"
}
```

#### **Welcome Email**
```json
POST /api/welcome
{
  "userEmail": "newuser@example.com",
  "userName": "New User",
  "loginMethod": "email"
}
```

---

## ⚛️ **Frontend Integration**

### **1. Update React Environment**

Add to your `.env` file:
```env
REACT_APP_EMAIL_SERVICE_URL=http://localhost:3001
```

### **2. Use Email Components**

#### **Contact Form Example:**
```tsx
import CustomContactForm from '../components/CustomContactForm';

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
      <CustomContactForm 
        onSuccess={handleSuccess}
        onError={handleError}
      />
    </div>
  );
}
```

#### **Order Confirmation Example:**
```tsx
import { useOrderEmail } from '../hooks/useCustomEmail';

function OrderSuccessPage({ order }) {
  const { sendOrderConfirmation, loading, error, success } = useOrderEmail();

  useEffect(() => {
    if (order && !loading) {
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
  }, [order, sendOrderConfirmation]);

  return (
    <div>
      {loading && <p>Sending confirmation email...</p>}
      {success && <p>✅ Order confirmation sent!</p>}
      {error && <p>⚠️ {error}</p>}
    </div>
  );
}
```

#### **Welcome Email Example:**
```tsx
import { useWelcomeEmail } from '../hooks/useCustomEmail';

function UserSignupComponent() {
  const { sendWelcome } = useWelcomeEmail();

  const handleSignup = async (userData) => {
    // Your signup logic here...
    
    // Send welcome email
    await sendWelcome({
      userEmail: userData.email,
      userName: userData.name,
      loginMethod: userData.method
    });
  };

  return <div>Signup form here...</div>;
}
```

---

## 🎨 **Email Templates**

### **Features:**
- ✅ **Mobile Responsive** - Works on all devices
- ✅ **Professional Design** - eSthira branded with green theme
- ✅ **HTML Templates** - Rich formatting with CSS
- ✅ **Dynamic Content** - Personalized for each email type

### **Template Types:**

#### **1. Contact Form Email**
- **To**: info.esthira@gmail.com
- **Contains**: Name, Email, Phone, Subject, Message
- **Design**: Professional with eSthira branding

#### **2. Order Confirmation Email**
- **To**: Customer's email
- **Contains**: Order details, items, shipping info, delivery estimate
- **Design**: Clean order confirmation with product details

#### **3. Welcome Email**
- **To**: New user's email
- **Contains**: Welcome message, features, call-to-action
- **Design**: Friendly onboarding experience

---

## 🔒 **Security Features**

### **Input Validation:**
- ✅ **Joi Schema Validation** - All inputs validated
- ✅ **Email Format Validation** - Proper email checking
- ✅ **Length Limits** - Prevent oversized inputs
- ✅ **Required Fields** - Essential data validation

### **Rate Limiting:**
- ✅ **IP-based Rate Limiting** - Prevent spam
- ✅ **Configurable Limits** - Adjust to your needs
- ✅ **Standard Headers** - Proper rate limit headers

### **Security Headers:**
- ✅ **Helmet.js** - Security headers
- ✅ **CORS Protection** - Cross-origin protection
- ✅ **Environment Variables** - No secrets in code

---

## 🚀 **Deployment Options**

### **1. Vercel (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd email-backend
vercel

# Configure environment variables in Vercel dashboard
```

### **2. Netlify**
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Create netlify.toml
echo '[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200' > netlify.toml

# Deploy
netlify deploy --prod
```

### **3. Railway**
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

### **4. DigitalOcean App Platform**
```bash
# Install doctl
# Create app and deploy through web interface
```

---

## 📊 **Testing**

### **Test Endpoints:**

```bash
# Health Check
curl http://localhost:3001/api/health

# Contact Form
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Test message"
  }'
```

### **Test Frontend:**
```javascript
// Test in browser console
fetch('http://localhost:3001/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Test User',
    email: 'test@example.com',
    message: 'Test message'
  })
}).then(r => r.json()).then(console.log);
```

---

## 🛠️ **Troubleshooting**

### **Common Issues:**

#### **"Email service initialization failed"**
- Check API key configuration
- Verify email provider credentials
- Check network connectivity

#### **"Validation failed"**
- Check required fields
- Verify email format
- Check data types

#### **"Too many requests"**
- Wait for rate limit to reset
- Check rate limit configuration
- Verify IP-based limiting

#### **CORS Issues**
- Check CORS origin configuration
- Verify frontend URL
- Check preflight requests

### **Debug Mode:**
```bash
# Enable debug logging
DEBUG=* npm run dev
```

---

## 📈 **Production Tips**

### **Performance:**
- ✅ **Connection Pooling** - Reuse email connections
- ✅ **Caching** - Cache email templates
- ✅ **Async Processing** - Non-blocking email sending

### **Monitoring:**
- ✅ **Health Checks** - Monitor service status
- ✅ **Error Logging** - Track email failures
- ✅ **Metrics** - Monitor email volume

### **Scaling:**
- ✅ **Load Balancing** - Multiple instances
- ✅ **Queue System** - Handle high volume
- ✅ **CDN** - Static asset delivery

---

## 🎯 **You're Ready!**

Your complete email system includes:

✅ **Backend API** - Node.js server with 3 email endpoints
✅ **Frontend Integration** - React hooks and components
✅ **Email Templates** - Professional, responsive designs
✅ **Security** - Validation, rate limiting, headers
✅ **Deployment Ready** - Multiple deployment options
✅ **Production Grade** - Error handling, logging, monitoring

**Start the server and integrate with your React app!** 🚀📧
