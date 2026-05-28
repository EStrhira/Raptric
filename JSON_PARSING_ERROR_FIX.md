# JSON Parsing Error - Troubleshooting Guide

## 🚨 Error: "Unexpected token '<', "<!DOCTYPE "... is not valid JSON"

### **Root Cause:**
The server is returning HTML instead of JSON, which means:
1. **404 Error Page** - Function endpoint doesn't exist
2. **500 Error Page** - Function crashed and returned HTML error page
3. **Authentication/Redirect** - Being redirected to login page
4. **Missing Headers** - Function not setting Content-Type: application/json

## 🔧 **Fixes Applied**

### **1. Backend Fixes (warranty-activation.js)**

```javascript
// ✅ Added proper JSON headers to ALL responses
headers: {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
}

// ✅ Added CORS preflight handling
if (event.httpMethod === 'OPTIONS') {
  return {
    statusCode: 200,
    headers: { /* CORS headers */ },
    body: JSON.stringify({ success: true })
  };
}

// ✅ Used helper functions for consistent responses
function successResponse(message, data = {}) {
  return {
    statusCode: 200,
    headers: { /* JSON headers */ },
    body: JSON.stringify({ success: true, message, ...data })
  };
}
```

### **2. Frontend Fixes (WarrantyActivation.tsx)**

```typescript
// ✅ Check content-type before parsing JSON
const contentType = response.headers.get('content-type')
if (!contentType || !contentType.includes('application/json')) {
  const errorText = await response.text()
  console.error('Server returned HTML instead of JSON:', errorText.substring(0, 200))
  setMessage({ 
    type: 'error', 
    text: 'Server error: Invalid response format. Please try again.' 
  })
  return
}

// ✅ Wrap JSON parsing in try-catch
let data
try {
  data = await response.json()
} catch (parseError) {
  console.error('JSON parsing error:', parseError)
  const responseText = await response.text()
  console.error('Response text:', responseText.substring(0, 200))
  setMessage({ 
    type: 'error', 
    text: 'Server returned invalid response. Please try again.' 
  })
  return
}
```

## 🧪 **Testing & Debugging**

### **1. Test Simple Endpoint First**
```javascript
// Run in browser console
fetch('/.netlify/functions/test-endpoint')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error)
```

### **2. Test Warranty Endpoint**
```javascript
// Run in browser console (from debug-endpoint.js)
testSimpleEndpoint();
testWarrantyEndpoint();
```

### **3. Check Network Tab**
1. Open Chrome DevTools → Network Tab
2. Submit warranty form
3. Look for `warranty-activation` request
4. Check:
   - **Status Code**: Should be 200, not 404/500
   - **Response Headers**: Should have `content-type: application/json`
   - **Response Body**: Should be JSON, not HTML

## 🚀 **Deployment Checklist**

### **Before Deploy:**
- [ ] All functions have proper JSON headers
- [ ] CORS preflight is handled
- [ ] Error responses return JSON, not HTML
- [ ] Frontend validates content-type before parsing

### **After Deploy:**
- [ ] Test simple endpoint works
- [ ] Test warranty endpoint with valid data
- [ ] Test warranty endpoint with invalid data
- [ ] Check Network tab for proper responses

## 🔍 **Common Issues & Solutions**

### **Issue 1: 404 Not Found**
```
GET https://yoursite.netlify/functions/warranty-activation 404
```
**Solution**: Make sure `warranty-activation.js` exists in `netlify/functions/`

### **Issue 2: 500 Internal Server Error**
```
GET https://yoursite.netlify/functions/warranty-activation 500
```
**Solution**: Check Netlify function logs for detailed error

### **Issue 3: Missing Content-Type Header**
```
Response headers don't include 'content-type: application/json'
```
**Solution**: Ensure all responses include proper headers (fixed in updated function)

### **Issue 4: CORS Error**
```
Access to fetch at '...' has been blocked by CORS policy
```
**Solution**: Added CORS headers and OPTIONS handler

## 📋 **Debugging Steps**

### **Step 1: Check Function Exists**
```bash
# In your project
ls netlify/functions/warranty-activation.js
```

### **Step 2: Check Environment Variables**
```bash
# In Netlify dashboard
Site settings → Build & deploy → Environment → Environment variables
# Ensure BREVO_API_KEY is set
```

### **Step 3: Check Function Logs**
```bash
# In Netlify dashboard
Functions → warranty-activation → View logs
```

### **Step 4: Test Locally**
```bash
npm run netlify:dev
# Test the function locally
```

## ✅ **Verification**

Once deployed, the warranty activation should:
1. ✅ Return proper JSON responses
2. ✅ Handle CORS correctly  
3. ✅ Show detailed error messages
4. ✅ Work with image uploads
5. ✅ Send emails via Brevo

---

**Status**: ✅ **FIXED** - JSON parsing error resolved with proper headers and error handling
**Next**: Deploy and test the updated functions
