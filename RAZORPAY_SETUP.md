# 💳 Razorpay Payment Verification Setup

## 🔧 Required Environment Variables

Add these to your `.env` file (local development) and Netlify Dashboard (production):

```env
# Razorpay Configuration
REACT_APP_RAZORPAY_API_KEY=your_razorpay_api_key_here
RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here
```

## 🚀 Netlify Setup Steps

### 1. Add Environment Variables in Netlify Dashboard
1. Go to Netlify Dashboard → Your Site → Site settings → Build & deploy → Environment
2. Add the following variables:
   - `REACT_APP_RAZORPAY_API_KEY`: Your Razorpay API key
   - `RAZORPAY_KEY_SECRET`: Your Razorpay key secret

### 2. Deploy Functions
The `verify-payment.js` function will be automatically deployed when you push to GitHub.

## 🔍 How It Works

### Payment Flow:
1. User clicks payment button
2. Razorpay modal opens with payment options
3. User completes payment
4. Razorpay returns payment details
5. Frontend sends details to `/.netlify/functions/verify-payment`
6. Netlify function verifies signature using HMAC-SHA256
7. Function returns success/failure status
8. Frontend shows success/error message

### Security Features:
- ✅ Server-side signature verification
- ✅ HMAC-SHA256 cryptographic verification
- ✅ Environment variable protection
- ✅ Error handling and validation
- ✅ Request method validation (POST only)

## 🛠️ Testing

### Local Testing:
```bash
# Start local development
npm start

# Test payment with test credentials
# Use Razorpay test keys for development
```

### Production Testing:
1. Deploy to Netlify
2. Add real Razorpay credentials
3. Test with actual payment

## 🔧 Troubleshooting

### Common Issues:

**404 Error:**
- ✅ Fixed: Changed endpoint from `/api/verify-payment` to `/.netlify/functions/verify-payment`

**Signature Verification Failed:**
- Check if `RAZORPAY_KEY_SECRET` is set correctly
- Ensure Razorpay keys match (test vs live)

**Function Not Working:**
- Verify `netlify.toml` has functions directory configured
- Check Netlify function logs for errors

## 📝 API Endpoints

### Verify Payment Function:
```
POST /.netlify/functions/verify-payment
Content-Type: application/json

Body:
{
  "razorpay_order_id": "order_123",
  "razorpay_payment_id": "pay_123",
  "razorpay_signature": "signature_hash"
}
```

### Response:
```json
{
  "success": true,
  "message": "Payment verified successfully"
}
```

---

**🎉 Your payment verification is now properly configured and secure!**
