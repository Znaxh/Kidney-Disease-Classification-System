# 🚀 Deployment Guide: Vercel + Railway

## Overview
- **Frontend (React)**: Deploy to Vercel (Free)
- **Backend (FastAPI)**: Deploy to Railway (Free tier: $5/month credit)

## 🚂 Step 1: Deploy Backend to Railway

### 1.1 Prepare Your Repository
```bash
# Make sure your code is committed to GitHub
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### 1.2 Deploy to Railway
1. **Go to [Railway.app](https://railway.app)**
2. **Sign up/Login** with GitHub
3. **Click "New Project"**
4. **Select "Deploy from GitHub repo"**
5. **Choose your repository**
6. **Select the Backend folder** (or root if Backend is in root)

### 1.3 Configure Railway
1. **Set Environment Variables** in Railway dashboard:
   ```
   LANG=en_US.UTF-8
   LC_ALL=en_US.UTF-8
   PORT=8080
   ```

2. **Railway will automatically**:
   - Detect Python project
   - Install dependencies from requirements.txt
   - Run the start command from railway.json

### 1.4 Get Your Backend URL
- After deployment, Railway will give you a URL like:
  `https://your-app-name.railway.app`
- **Copy this URL** - you'll need it for the frontend!

## 🌐 Step 2: Deploy Frontend to Vercel

### 2.1 Update Environment Variables
1. **Edit `Frontend/.env.production`**:
   ```env
   VITE_API_URL=https://your-actual-railway-url.railway.app
   ```
   Replace with your actual Railway backend URL!

### 2.2 Deploy to Vercel
1. **Go to [Vercel.com](https://vercel.com)**
2. **Sign up/Login** with GitHub
3. **Click "New Project"**
4. **Import your GitHub repository**
5. **Configure project**:
   - **Framework Preset**: Vite
   - **Root Directory**: `Frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 2.3 Set Environment Variables in Vercel
1. **Go to Project Settings → Environment Variables**
2. **Add**:
   ```
   VITE_API_URL = https://your-railway-backend-url.railway.app
   ```

### 2.4 Deploy
- **Click "Deploy"**
- Vercel will build and deploy your frontend
- You'll get a URL like: `https://your-app.vercel.app`

## 🔗 Step 3: Connect Frontend to Backend

### 3.1 Update CORS in Backend
Your FastAPI backend is already configured to allow requests from any origin, but you can make it more secure:

```python
# In Backend/app.py, update CORS origins:
allow_origins=[
    "https://your-app.vercel.app",  # Your Vercel domain
    "http://localhost:5173",       # Local development
    "*"  # Remove this in production
]
```

### 3.2 Test the Connection
1. **Open your Vercel URL**
2. **Check if the API status shows "Connected"**
3. **Try uploading an image**

## 💰 Cost Breakdown

### Vercel (Frontend) - FREE ✅
- **Hobby Plan**: Free forever
- **100GB bandwidth/month**
- **Custom domains included**
- **Automatic HTTPS**

### Railway (Backend) - $5 FREE CREDIT/MONTH 💳
- **Free tier**: $5 credit monthly
- **Your usage**: ~$2-4/month (estimated)
- **512MB RAM, 1GB storage**
- **Perfect for this project size**

**Total Monthly Cost: $0-3** (depending on usage)

## 🚀 Quick Deploy Commands

### One-time Setup:
```bash
# 1. Push to GitHub
git add .
git commit -m "Ready for deployment"
git push origin main

# 2. Deploy Backend to Railway
# - Go to railway.app
# - Connect GitHub
# - Deploy Backend folder

# 3. Deploy Frontend to Vercel  
# - Go to vercel.com
# - Connect GitHub
# - Deploy Frontend folder
# - Set VITE_API_URL environment variable
```

## 🔧 Troubleshooting

### Backend Issues:
- **Build fails**: Check requirements.txt and Python version
- **Module not found**: Ensure `pip install -e .` runs in start command
- **Port issues**: Railway automatically sets PORT environment variable

### Frontend Issues:
- **API connection fails**: Check VITE_API_URL in Vercel environment variables
- **Build fails**: Ensure all dependencies are in package.json
- **CORS errors**: Check backend CORS configuration

### Common Solutions:
```bash
# Check Railway logs
railway logs

# Redeploy Vercel
vercel --prod

# Test API connection
curl https://your-backend.railway.app/health
```

## 🎯 Production Checklist

- [ ] Backend deployed to Railway
- [ ] Frontend deployed to Vercel
- [ ] Environment variables set correctly
- [ ] API connection working
- [ ] Image upload and prediction working
- [ ] Custom domain configured (optional)
- [ ] SSL certificates active (automatic)

## 🌟 Benefits of This Setup

1. **Cost Effective**: Free/very cheap
2. **Scalable**: Both platforms auto-scale
3. **Fast**: Global CDN for frontend
4. **Reliable**: 99.9% uptime
5. **Easy Updates**: Git push = auto deploy
6. **Professional**: Custom domains and SSL

Your app will be live and accessible worldwide! 🌍✨
