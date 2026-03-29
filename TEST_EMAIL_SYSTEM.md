# 📧 Email System Test Guide

## 🧪 **How to Test Your Email System**

### **Method 1: Browser Console Test (Easiest)**

1. **Open your website**
2. **Open Browser Console** (F12 → Console)
3. **Copy-paste this script** and press Enter:

```javascript
// Load the test script
const script = document.createElement('script');
script.src = '/test-email-system.js';
document.head.appendChild(script);

// Wait for script to load, then run tests
setTimeout(() => {
  window.testEmailSystem.runAllTests();
}, 2000);
```

### **Method 2: Manual Browser Test**

Open browser console and run each test individually:

```javascript
// Test 1: Contact Form
fetch('https://us-central1-esthira-raptric.cloudfunctions.net/sendContactEmail', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Test User',
    email: 'test@example.com',
    message: 'Test contact form message'
  })
}).then(r => r.json()).then(console.log);

// Test 2: Order Confirmation  
fetch('https://us-central1-esthira-raptric.cloudfunctions.net/sendOrderEmail', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    orderId: 'TEST-123',
    userEmail: 'customer@example.com',
    userName: 'Test Customer',
    orderItems: [{ name: 'Test Bike', quantity: 1, price: 45000 }],
    totalAmount: 45000,
    shippingAddress: {
      street: '123 Test St',
      city: 'Bangalore',
      state: 'Karnataka',
      postalCode: '560001',
      country: 'India'
    },
    estimatedDelivery: '5-7 days',
    paymentMethod: 'Credit Card'
  })
}).then(r => r.json()).then(console.log);

// Test 3: Welcome Email
fetch('https://us-central1-esthira-raptric.cloudfunctions.net/sendWelcomeEmail', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userEmail: 'newuser@example.com',
    userName: 'New User',
    loginMethod: 'email'
  })
}).then(r => r.json()).then(console.log);
```

### **Method 3: cURL Test (Advanced)**

```bash
# Test Contact Form
curl -X POST https://us-central1-esthira-raptric.cloudfunctions.net/sendContactEmail \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com", 
    "message": "Test message from email system"
  }'

# Test Order Confirmation
curl -X POST https://us-central1-esthira-raptric.cloudfunctions.net/sendOrderEmail \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "TEST-123",
    "userEmail": "customer@example.com",
    "userName": "Test Customer",
    "orderItems": [{"name": "Test Bike", "quantity": 1, "price": 45000}],
    "totalAmount": 45000,
    "shippingAddress": {
      "street": "123 Test St",
      "city": "Bangalore", 
      "state": "Karnataka",
      "postalCode": "560001",
      "country": "India"
    },
    "estimatedDelivery": "5-7 days",
    "paymentMethod": "Credit Card"
  }'

# Test Welcome Email
curl -X POST https://us-central1-esthira-raptric.cloudfunctions.net/sendWelcomeEmail \
  -H "Content-Type: application/json" \
  -d '{
    "userEmail": "newuser@example.com",
    "userName": "New User", 
    "loginMethod": "email"
  }'
```

---

## 🔍 **What to Look For**

### **✅ Success Indicators:**
```
{
  "success": true,
  "message": "Contact form submitted successfully"
}
```

### **❌ Error Indicators:**
```
{
  "success": false,
  "error": "Error message here"
}
```

### **🔍 Common Issues:**

#### **404 Error**
- **Problem**: Functions not deployed
- **Solution**: `firebase deploy --only functions`

#### **500 Error** 
- **Problem**: Backend code error
- **Solution**: Check Firebase Functions logs

#### **CORS Error**
- **Problem**: Browser blocking cross-origin request
- **Solution**: Functions need corsHandler

#### **"API key not configured"**
- **Problem**: Environment variables not set
- **Solution**: `firebase functions:config:set resend.api_key="your_key"`

---

## 📊 **Expected Test Results**

### **Test 1: Contact Form**
- **To**: info.esthira@gmail.com
- **From**: noreply@esthira.com
- **Contains**: Name, Email, Message
- **Template**: eSthira branded

### **Test 2: Order Confirmation**
- **To**: customer@example.com
- **From**: noreply@esthira.com
- **Contains**: Order details, items, shipping info
- **Template**: Professional order confirmation

### **Test 3: Welcome Email**
- **To**: newuser@example.com
- **From**: noreply@esthira.com
- **Contains**: Welcome message, features
- **Template**: Friendly onboarding

### **Test 4: Validation**
- **Expected**: Should fail with validation error
- **Purpose**: Confirms input validation works

---

## 🎯 **Success Criteria**

Your email system is working when:

✅ **All 3 email types send successfully**
✅ **Emails arrive at correct destinations**
✅ **Templates render properly**
✅ **Validation catches bad data**
✅ **No CORS or 404 errors**
✅ **Firebase Functions logs show success**

---

## 🚨 **Troubleshooting**

### **If Tests Fail:**

1. **Check Functions Status**:
   ```bash
   firebase functions:list
   ```

2. **Check Function Logs**:
   ```bash
   firebase functions:log
   ```

3. **Verify Environment Variables**:
   ```bash
   firebase functions:config:get
   ```

4. **Check Resend Dashboard**:
   - Login to resend.com
   - Check email delivery status
   - Verify API key usage

### **Common Fixes:**

#### **"Function not found"**
```bash
firebase deploy --only functions
```

#### **"API key not configured"**
```bash
firebase functions:config:set resend.api_key="re_drc2eo37_Gz21CpKV8f3AiNq7tTZZpksZ"
firebase deploy --only functions
```

#### **"CORS error"**
- Ensure corsHandler is applied to all functions
- Check that origin is set correctly

---

## 🎉 **Ready to Test!**

Choose your testing method above and run the tests. 

**Expected Results:**
- 📧 All 3 email endpoints working
- 📧 Professional templates rendering
- 📧 Proper validation and error handling
- 📧 Emails arriving at inboxes

Run the tests now and let me know what you find! 🚀
