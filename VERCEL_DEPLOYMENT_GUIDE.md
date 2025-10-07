# 🚀 AGENTSPACE - Vercel Deployment Guide

## ⚠️ Important: Deployment Limitations

### What Works on Vercel ✅
- **Frontend Dashboard** (React/Vite) - PERFECT for Vercel
- **Serverless API Functions** - Can be adapted

### What DOESN'T Work on Vercel ❌
- **WebSocket Server** - Vercel doesn't support long-running WebSocket connections
- **Stateful Backend** - Serverless functions are stateless
- **Background Processes** - No persistent processes

---

## 📋 Deployment Options

### Option 1: Frontend Only on Vercel (RECOMMENDED)
Deploy dashboard to Vercel, keep backend elsewhere.

**Best For:** Quick frontend deployment with beautiful URL

**Setup:**
```bash
# Deploy only the dashboard
cd /home/daddybo/agentspace/apps/dashboard
vercel
```

**Backend Options:**
- Railway.app (supports WebSocket)
- Render.com (free tier)
- DigitalOcean App Platform
- Your own VPS
- Heroku

---

### Option 2: Full Stack on Alternative Platforms (BEST)
Deploy everything together on platforms that support WebSocket.

**Recommended Platforms:**

#### 1. Railway.app ⭐ (BEST CHOICE)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy
railway up
```

**Why Railway:**
- ✅ WebSocket support
- ✅ Free tier ($5/month credit)
- ✅ PostgreSQL database
- ✅ Easy setup
- ✅ GitHub integration

#### 2. Render.com ⭐
```bash
# Connect GitHub repo
# Auto-deploys on push
```

**Why Render:**
- ✅ Free tier available
- ✅ WebSocket support
- ✅ PostgreSQL included
- ✅ Simple setup

#### 3. Fly.io
```bash
# Install Fly CLI
curl -L https://fly.io/install.sh | sh

# Deploy
fly launch
```

**Why Fly.io:**
- ✅ Full Docker support
- ✅ Global edge network
- ✅ WebSocket support
- ✅ Free tier

---

## 🎯 Step-by-Step: Deploy to Railway (RECOMMENDED)

### Step 1: Prepare Repository
```bash
# Push to GitHub first
cd /home/daddybo/agentspace
./git-push-complete.sh
```

### Step 2: Setup Railway
1. Go to: https://railway.app
2. Sign up with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose: cornmankl/agentspace

### Step 3: Configure Services

**Backend Service:**
```
Root Directory: apps/server
Build Command: npm install && npm run build
Start Command: node dist/index.js

Environment Variables:
- PORT=3001
- GLM_API_KEY=your-key-here
- NODE_ENV=production
```

**Frontend Service:**
```
Root Directory: apps/dashboard
Build Command: npm install && npm run build
Start Command: npx serve -s dist

Environment Variables:
- VITE_API_BASE_URL=https://your-backend.railway.app
```

### Step 4: Deploy
- Railway auto-deploys on git push
- Get URLs for both services
- Update frontend .env with backend URL

---

## 🎯 Step-by-Step: Frontend Only on Vercel

### Step 1: Create vercel.json
```json
{
  "version": 2,
  "buildCommand": "cd apps/dashboard && npm install && npm run build",
  "outputDirectory": "apps/dashboard/dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Step 2: Deploy
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd /home/daddybo/agentspace
vercel

# Follow prompts:
# - Project name: agentspace
# - Framework: Vite
# - Root directory: apps/dashboard
```

### Step 3: Configure Environment
```bash
# Set environment variable
vercel env add VITE_API_BASE_URL production
# Enter: https://your-backend-url.com
```

### Step 4: Backend Deployment
Deploy backend to Railway/Render/Fly.io separately.

---

## 📊 Platform Comparison

| Platform | WebSocket | Free Tier | PostgreSQL | Ease | Best For |
|----------|-----------|-----------|------------|------|----------|
| **Railway** | ✅ | $5/mo credit | ✅ | ⭐⭐⭐⭐⭐ | Full stack |
| **Render** | ✅ | ✅ Limited | ✅ | ⭐⭐⭐⭐ | Full stack |
| **Fly.io** | ✅ | ✅ Limited | ✅ | ⭐⭐⭐⭐ | Docker apps |
| **Vercel** | ❌ | ✅ Generous | ❌ | ⭐⭐⭐⭐⭐ | Frontend only |
| **Netlify** | ❌ | ✅ Generous | ❌ | ⭐⭐⭐⭐⭐ | Frontend only |

---

## 🔧 Quick Deploy Configurations

### Railway (railway.json)
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "node apps/server/dist/index.js",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### Render (render.yaml)
```yaml
services:
  - type: web
    name: agentspace-backend
    env: node
    buildCommand: npm install && npm run build
    startCommand: node apps/server/dist/index.js
    envVars:
      - key: NODE_ENV
        value: production
      - key: GLM_API_KEY
        sync: false

  - type: web
    name: agentspace-frontend
    env: static
    buildCommand: cd apps/dashboard && npm install && npm run build
    staticPublishPath: apps/dashboard/dist
```

### Fly.io (fly.toml)
```toml
app = "agentspace"
primary_region = "sin"

[build]
  builder = "heroku/buildpacks:20"

[[services]]
  http_checks = []
  internal_port = 3001
  protocol = "tcp"

  [[services.ports]]
    port = 80
    handlers = ["http"]

  [[services.ports]]
    port = 443
    handlers = ["tls", "http"]
```

---

## 🎨 Custom Domain Setup

### Vercel
```bash
# Add custom domain
vercel domains add yourdomain.com
```

### Railway
```
Dashboard → Settings → Domains → Add Custom Domain
```

### Render
```
Dashboard → Settings → Custom Domain → Add
```

---

## 🔐 Environment Variables to Set

### Backend
```env
NODE_ENV=production
PORT=3001
GLM_API_KEY=your-real-key
GLM_API_URL=https://api.z.ai/api/coding/paas/v4
DATA_DIR=/app/data
CORS_ORIGINS=https://your-frontend-url.com
```

### Frontend
```env
VITE_API_BASE_URL=https://your-backend-url.com/api
VITE_WS_URL=wss://your-backend-url.com
```

---

## 📝 Deployment Checklist

### Before Deploy:
- [ ] Push code to GitHub
- [ ] Test build locally: `npm run build`
- [ ] Create .env files for production
- [ ] Update CORS origins
- [ ] Test API endpoints

### After Deploy:
- [ ] Verify backend health: `/health`
- [ ] Test WebSocket connection
- [ ] Test API endpoints
- [ ] Verify frontend loads
- [ ] Test agent creation
- [ ] Test chat functionality
- [ ] Setup monitoring
- [ ] Configure domain (optional)

---

## 🚨 Common Issues & Solutions

### Issue 1: WebSocket Connection Failed
**Problem:** Vercel doesn't support WebSocket
**Solution:** Deploy backend to Railway/Render

### Issue 2: Build Failed
**Problem:** Missing dependencies
**Solution:**
```bash
# Install all dependencies in correct order
npm install
npm run build
```

### Issue 3: CORS Error
**Problem:** Frontend can't connect to backend
**Solution:** Update CORS_ORIGINS environment variable

### Issue 4: API Not Found
**Problem:** API routes not working
**Solution:** Check base URL in frontend .env

---

## 💡 Best Practice Deployment

### Development → Staging → Production

```bash
# Development (Local)
npm run dev

# Staging (Railway/Render preview)
git push origin staging

# Production (Railway/Render main)
git push origin main
```

---

## 🎯 My Recommendation

For AGENTSPACE, I recommend:

### 🥇 Option 1: Railway (Best Overall)
- Deploy both frontend & backend
- One platform for everything
- WebSocket support
- Easy setup

### 🥈 Option 2: Split Deployment
- Frontend → Vercel (free, fast)
- Backend → Render (free tier)
- Best of both worlds

### 🥉 Option 3: Fly.io (Most Control)
- Full Docker support
- Best for scaling
- More configuration options

---

## 📚 Additional Resources

- Railway Docs: https://docs.railway.app
- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- Fly.io Docs: https://fly.io/docs

---

## 🎉 Quick Start Commands

### Railway:
```bash
npm i -g @railway/cli
railway login
railway init
railway up
```

### Vercel (Frontend Only):
```bash
npm i -g vercel
cd apps/dashboard
vercel
```

### Render:
```bash
# Connect GitHub repo via dashboard
# https://dashboard.render.com
```

---

**Choose your platform and start deploying! 🚀**

For AGENTSPACE with WebSocket, **Railway or Render** are your best bets!
