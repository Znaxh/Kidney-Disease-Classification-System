# 🔐 Environment Variables Setup

## 🚨 Security Notice
**NEVER commit `.env.production` or any file containing real API URLs/secrets to Git!**

## 📋 Setup Instructions

### For Development
The `.env.development` file is already configured and safe to use.

### For Production Deployment

1. **Copy the template**:
   ```bash
   cp .env.production.template .env.production
   ```

2. **Edit `.env.production`** with your actual values:
   ```bash
   # Replace with your actual Railway backend URL
   VITE_API_URL=https://your-actual-railway-url.up.railway.app
   ```

3. **For Vercel Deployment**:
   - Go to your Vercel project dashboard
   - Navigate to Settings → Environment Variables
   - Add: `VITE_API_URL` = `https://your-railway-url.up.railway.app`

## 🔒 Security Best Practices

- ✅ Use environment variables for all sensitive data
- ✅ Keep `.env.production` in `.gitignore`
- ✅ Use Vercel's environment variables for production
- ❌ Never commit real API URLs to Git
- ❌ Never share `.env.production` files

## 🚀 Deployment

The app will automatically use:
- **Development**: `http://localhost:8080` (from `.env.development`)
- **Production**: Vercel environment variables or fallback to localhost
