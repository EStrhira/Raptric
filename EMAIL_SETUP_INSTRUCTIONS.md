# 📧 Email Service Setup Instructions

## 🔍 **Current Status**
✅ **Server Running**: http://localhost:3001  
✅ **API Working**: All endpoints responding  
❌ **Email Not Sending**: SMTP_PASS still has placeholder

---

## 🚀 **Quick Fix - 3 Steps**

### **Step 1: Get Gmail App Password**
1. Go to: https://myaccount.google.com/apppasswords
2. Sign in to your Gmail account (info.esthira@gmail.com)
3. Click "Select app" → Choose "Other (Custom name)"
4. Enter: `eSthira Email Service`
5. Click "Generate"
6. **Copy the 16-character password** (example: `abcd efgh ijkl mnop`)

### **Step 2: Update .env File**
Edit `/Users/manishk/Documents/Raptric-main/email-backend/.env`:

```env
# Replace YOUR_REAL_APP_PASSWORD with your actual app password
SMTP_PASS=abcd efgh ijkl mnop  # <-- REPLACE WITH REAL PASSWORD
```

### **Step 3: Restart Server**
```bash
cd /Users/manishk/Documents/Raptric-main/email-backend
pkill -f "node simple-server.js"
node simple-server.js
```

---

## 🧪 **Test After Configuration**

### **Health Check:**
```bash
curl http://localhost:3001/api/health
```
Should show: `"configured":true`

### **Test Contact Form:**
```bash
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Your Name","email":"your_email@example.com","message":"Test message"}'
```

### **Check Gmail:**
- Check info.esthira@gmail.com inbox
- Look for email from "eSthira Electric Bikes"

---

## 📧 **Alternative: Use SendGrid**

If Gmail doesn't work, use SendGrid:

### **1. Sign Up:**
- Go to: https://sendgrid.com
- Get free account (100 emails/day)
- Get API key from Settings → API Keys

### **2. Configure:**
```env
SENDGRID_API_KEY=SG.your_sendgrid_api_key_here
FROM_EMAIL=noreply@esthira.com
```

### **3. Restart Server:**
```bash
cd email-backend
node server.js  # Use original server.js for SendGrid
```

---

## 🎯 **What You Should See**

After proper configuration:
- ✅ Health check: `"configured":true`
- ✅ Contact form: Real email sent to info.esthira@gmail.com
- ✅ Email in Gmail: Professional eSthira template
- ✅ No more "placeholder" errors

---

## 🔧 **Troubleshooting**

### **"App Password" Issues:**
- Enable 2-factor authentication on Gmail first
- Use "Other (Custom name)" not "Mail"
- Copy password exactly (no spaces)

### **"Authentication Failed" Issues:**
- Check Gmail username: `info.esthira@gmail.com`
- Verify app password is correct
- Ensure "Less secure app access" is ON in Gmail

### **"No Email Received" Issues:**
- Check Gmail spam folder
- Verify FROM email matches Gmail account
- Check SendGrid dashboard if using SendGrid

---

## 📊 **Current Test Results**

| Component | Status | Notes |
|-----------|---------|--------|
| Backend Server | ✅ Running | http://localhost:3001 |
| API Endpoints | ✅ Working | All 3 endpoints respond |
| Email Service | ❌ Not Configured | SMTP_PASS placeholder |
| Real Email Sending | ❌ Not Working | Needs real credentials |

**Next: Configure Gmail app password to enable real email sending!**
