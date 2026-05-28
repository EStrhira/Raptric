# 📧 Email System Debug Guide

## 🔍 **Common Issues & Solutions**

### **Issue 1: Async State Bug (FIXED)**
**Problem**: Checking `success` state immediately after calling async function
```typescript
// ❌ WRONG
await submitContactForm(data)
if (success) { // Runs BEFORE async completes
```

**Solution**: Success is handled by the hook's state management
```typescript
// ✅ CORRECT  
await submitContactForm(data)
setNotification({ type: 'success', message: 'Success!' })
```

### **Issue 2: API Key Configuration (FIXED)**
**Problem**: Backend couldn't access Resend API key

**Solution**: Added fallback to Firebase Functions config
```javascript
// ✅ FIXED
const resend = new Resend(process.env.RESEND_API_KEY || functions.config().resend?.api_key);
```

### **Issue 3: Admin Email Configuration (FIXED)**
**Problem**: Hardcoded email address

**Solution**: Use Firebase Functions config
```javascript
// ✅ FIXED
const adminEmail = functions.config().admin?.email || 'info.esthira@gmail.com';
```

---

## 🧪 **Testing Steps**

### **1. Test Backend Functions**
```bash
# Test contact endpoint
curl -X POST https://us-central1-esthira-raptric.cloudfunctions.net/sendContactEmail \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Test message"
  }'
```

### **2. Check Browser Console**
Open DevTools → Console and look for:
- Network errors (404, 500, etc.)
- JavaScript errors
- Failed fetch requests

### **3. Check Network Tab**
Open DevTools → Network and look for:
- `sendContactEmail` request
- Response status (should be 200)
- Response body

---

## 🚨 **Error Messages & Solutions**

### **"Failed to fetch"**
**Causes**:
- Wrong URL (FIXED: updated to esthira-raptric)
- CORS issues
- Functions not deployed

**Solutions**:
1. Verify URL: `https://us-central1-esthira-raptric.cloudfunctions.net`
2. Deploy functions: `firebase deploy --only functions`
3. Check browser console for CORS errors

### **"API key not configured"**
**Causes**:
- Functions not deployed with config
- Environment variables not set

**Solutions**:
1. Set config: `firebase functions:config:set resend.api_key="your_key"`
2. Deploy functions: `firebase deploy --only functions`

### **"Invalid input data"**
**Causes**:
- Missing required fields
- Invalid email format
- Message too short/long

**Solutions**:
1. Check all required fields: name, email, message
2. Validate email format
3. Ensure message is 10-1000 characters

---

## 🔧 **Debug Mode**

### **Enable Console Logging**
Add to your Contact.tsx:
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  console.log('Form data:', formData)
  console.log('Validation passed')
  
  try {
    console.log('Sending email...')
    await submitContactForm({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: `${formData.subject}\n\n${formData.message}`
    })
    console.log('Email sent successfully')
  } catch (error) {
    console.error('Email error:', error)
  }
}
```

### **Check Hook State**
Add to see what's happening:
```typescript
useEffect(() => {
  console.log('Email state:', { loading, error, success })
}, [loading, error, success])
```

---

## 📊 **What Should Work Now**

### **✅ Fixed Issues:**
1. **Async State Bug** - Success handling corrected
2. **API Key Access** - Backend can access Resend key
3. **Admin Email Config** - Uses Firebase Functions config
4. **URL Correction** - Correct project ID in EmailService

### **🎯 Expected Behavior:**
1. User fills form → Validation passes
2. Submit button → Loading state shows
3. Email sends → Success notification appears
4. Form resets → Ready for new submission
5. Email arrives → info.esthira@gmail.com receives it

---

## 🚀 **Final Test**

After deploying functions:
1. Open your website
2. Fill out contact form
3. Click "Send Message"
4. Check for:
   - ✅ Loading spinner appears
   - ✅ Success message shows
   - ✅ Form resets
   - ✅ Email arrives at info.esthira@gmail.com

If all 4 happen, your email system is working perfectly! 🎉
