# Gmail SMTP Setup Guide

## 📧 Setting up Gmail SMTP for your contact form

### Step 1: Enable 2-Factor Authentication
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable "2-Step Verification" if not already enabled
3. This is required for App Passwords

### Step 2: Generate App Password
1. In the same Security section, look for "App passwords"
2. Click "App passwords" 
3. Select "Mail" as the app
4. Select your device (or "Other" and type "Omer Digital Website")
5. Google will generate a 16-character password like: `abcd efgh ijkl mnop`

### Step 3: Update Environment Variables
1. Open `.env.local` file in your project root
2. Replace `your_app_password_here` with the 16-character password (no spaces)
3. Save the file

Example:
```
GMAIL_USER=oemerdigital@gmail.com
GMAIL_APP_PASSWORD=abcdefghijklmnop
```

### Step 4: Test the Contact Form
1. Start your development server: `npm run dev`
2. Go to your contact page
3. Submit a test message
4. Check your Gmail inbox for the submission notification
5. Check if the form submitter received a confirmation email

## 🔒 Security Notes
- Never commit your `.env.local` file to version control (it's in .gitignore)
- The App Password is specific to this application
- You can revoke it anytime from your Google Account settings
- Keep your Gmail password separate and secure

## ✅ What happens when someone submits the form:
1. **Rate limiting** prevents spam (max 3 per IP every 15 minutes)
2. **Content filtering** blocks obvious spam
3. **Email to you** with all the details and sender's info
4. **Confirmation email** sent to the person who submitted
5. **Reply-to** is set to the submitter's email for easy responses

## 🚀 Production Deployment
When deploying to production (Vercel, Netlify, etc.):
1. Add the same environment variables to your hosting platform
2. Make sure to use the same Gmail App Password
3. Test the form after deployment

Your contact form is now fully functional and secure! 🎉
