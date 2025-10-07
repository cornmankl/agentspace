# 🆓 AGENTSPACE - 100% FREE Deployment Options

## Platform Yang BETUL-BETUL FREE

### ⭐ Option 1: Render.com (BEST FREE OPTION)
**Cost:** $0 - Completely FREE!

**Limits:**
- Sleeps after 15 mins inactivity (wakes in ~30 seconds)
- 750 hours/month free
- 512MB RAM
- WebSocket ✅

**Why Render:**
- ✅ 100% FREE selamanya
- ✅ WebSocket support
- ✅ PostgreSQL free tier included
- ✅ Auto-deploy from GitHub
- ✅ SSL certificate free
- ✅ Custom domain support

**Setup (5 minit):**
```bash
1. Push to GitHub (already done!)
2. Go to: https://render.com
3. Sign up with GitHub
4. New → Web Service
5. Connect: cornmankl/agentspace
6. Configure:
   - Name: agentspace-backend
   - Root Directory: apps/server
   - Build: npm install && npm run build
   - Start: node dist/index.js
   - Plan: FREE
7. Add environment variables:
   - GLM_API_KEY=your-key
   - NODE_ENV=production
8. Create!
```

**For Frontend:**
```bash
1. New → Static Site
2. Connect: cornmankl/agentspace
3. Configure:
   - Name: agentspace-dashboard
   - Root Directory: apps/dashboard
   - Build: npm install && npm run build
   - Publish: dist
   - Plan: FREE
4. Add environment variables:
   - VITE_API_BASE_URL=https://your-backend.onrender.com
```

---

### ⭐ Option 2: Fly.io (Best for Always-On)
**Cost:** $0 - FREE tier

**Limits:**
- 3 shared-cpu VMs free
- 256MB RAM per VM
- 160GB bandwidth/month
- WebSocket ✅

**Why Fly.io:**
- ✅ Always-on (no sleep!)
- ✅ WebSocket support
- ✅ Better performance than Render
- ✅ Global edge network
- ✅ Free SSL

**Setup:**
```bash
# Install Fly CLI
curl -L https://fly.io/install.sh | sh

# Login
fly auth login

# Deploy backend
cd /home/daddybo/agentspace/apps/server
fly launch
# Answer prompts (select free tier)

# Deploy frontend
cd /home/daddybo/agentspace/apps/dashboard
fly launch
```

---

### ⭐ Option 3: Koyeb (Simple & Fast)
**Cost:** $0 - FREE tier

**Limits:**
- 512MB RAM
- 2.5GB disk
- WebSocket ✅

**Why Koyeb:**
- ✅ Simple setup
- ✅ No sleep (always-on)
- ✅ WebSocket support
- ✅ Auto-scale
- ✅ Free SSL

**Setup:**
```bash
1. Go to: https://koyeb.com
2. Sign up with GitHub
3. Create Service → GitHub
4. Select: cornmankl/agentspace
5. Configure paths and build commands
6. Deploy!
```

---

### ⭐ Option 4: Replit (Easiest Setup)
**Cost:** $0 - FREE tier

**Limits:**
- Sleeps after inactivity
- Limited resources
- WebSocket ✅

**Why Replit:**
- ✅ Zero configuration
- ✅ IDE included
- ✅ Easy to setup
- ✅ Good for demos

**Setup:**
```bash
1. Go to: https://replit.com
2. Import from GitHub
3. Paste: https://github.com/cornmankl/agentspace
4. Click Run!
```

---

### ⭐ Option 5: Cyclic.sh (Serverless)
**Cost:** $0 - FREE tier

**Limits:**
- Serverless architecture
- Limited WebSocket support
- 10,000 requests/month

**Why Cyclic:**
- ✅ Easy deployment
- ✅ Auto-scale
- ✅ GitHub integration
- ⚠️ WebSocket limited

**Setup:**
```bash
1. Go to: https://cyclic.sh
2. Connect GitHub
3. Select repository
4. Deploy!
```

---

## 📊 FREE Platforms Comparison

| Platform | Cost | WebSocket | Sleep | RAM | Best For |
|----------|------|-----------|-------|-----|----------|
| **Render.com** | FREE | ✅ | Yes (15min) | 512MB | Full-stack apps |
| **Fly.io** | FREE | ✅ | No | 256MB | Always-on apps |
| **Koyeb** | FREE | ✅ | No | 512MB | Simple deploy |
| **Replit** | FREE | ✅ | Yes | Limited | Demos |
| **Cyclic.sh** | FREE | ⚠️ Limited | No | Serverless | API only |
| **Railway** | $5 credit | ✅ | No | 512MB | Best features |

---

## 🏆 MY RECOMMENDATIONS

### For AGENTSPACE (with WebSocket):

#### 🥇 BEST FREE: Render.com
```
✅ Pros:
- 100% FREE forever
- WebSocket full support
- Easy setup
- Free PostgreSQL
- SSL included

⚠️ Cons:
- Sleeps after 15 mins
- Takes ~30s to wake up
```

#### 🥈 BEST ALWAYS-ON: Fly.io
```
✅ Pros:
- No sleep (always running!)
- Better performance
- Global edge
- WebSocket support

⚠️ Cons:
- Slightly more complex setup
- Limited free RAM (256MB)
```

#### 🥉 EASIEST: Replit
```
✅ Pros:
- Zero config needed
- IDE included
- Perfect for demos

⚠️ Cons:
- Sleeps after inactivity
- Limited resources
```

---

## 🚀 Step-by-Step: Render.com (RECOMMENDED FREE)

### Part 1: Deploy Backend

1. **Go to Render Dashboard**
   ```
   https://dashboard.render.com/
   ```

2. **Create New Web Service**
   - Click "New +" → Web Service
   - Connect GitHub (authorize if needed)
   - Select repository: `cornmankl/agentspace`

3. **Configure Backend**
   ```
   Name: agentspace-backend
   Region: Singapore (closest to you)
   Branch: main
   Root Directory: apps/server
   Runtime: Node
   Build Command: npm install && npm run build
   Start Command: node dist/index.js
   Plan: Free
   ```

4. **Add Environment Variables**
   Click "Advanced" → Add Environment Variables:
   ```
   NODE_ENV=production
   PORT=10000
   GLM_API_KEY=your-api-key-here
   GLM_API_URL=https://api.z.ai/api/coding/paas/v4
   DATA_DIR=/app/data
   CORS_ORIGINS=https://agentspace-dashboard.onrender.com
   ```

5. **Create Web Service**
   - Click "Create Web Service"
   - Wait 5-10 minutes for first deploy
   - Get your URL: `https://agentspace-backend.onrender.com`

### Part 2: Deploy Frontend

1. **Create Static Site**
   - Click "New +" → Static Site
   - Select same repository: `cornmankl/agentspace`

2. **Configure Frontend**
   ```
   Name: agentspace-dashboard
   Branch: main
   Root Directory: apps/dashboard
   Build Command: npm install && npm run build
   Publish Directory: dist
   Plan: Free
   ```

3. **Add Environment Variables**
   ```
   VITE_API_BASE_URL=https://agentspace-backend.onrender.com/api
   VITE_WS_URL=wss://agentspace-backend.onrender.com
   ```

4. **Create Static Site**
   - Click "Create Static Site"
   - Wait 5 minutes for build
   - Get your URL: `https://agentspace-dashboard.onrender.com`

### Part 3: Update Backend CORS

1. Go back to backend service
2. Update `CORS_ORIGINS` environment variable
3. Add your frontend URL
4. Manual deploy to apply changes

### Part 4: Test Everything

1. Visit: `https://agentspace-backend.onrender.com/health`
   - Should return: `{"status":"ok"}`

2. Visit: `https://agentspace-dashboard.onrender.com`
   - Should load dashboard

3. Test agent creation
4. Test chat functionality
5. Done! ✅

---

## 💡 Tips for FREE Tier

### Prevent Sleep (Render.com)

**Method 1: UptimeRobot (Free)**
```bash
1. Go to: https://uptimerobot.com
2. Add New Monitor
3. Type: HTTP(s)
4. URL: https://agentspace-backend.onrender.com/health
5. Interval: 5 minutes
6. This will ping your app and keep it awake!
```

**Method 2: Cron-Job.org (Free)**
```bash
1. Go to: https://cron-job.org
2. Create Account
3. Add Cronjob
4. URL: https://agentspace-backend.onrender.com/health
5. Schedule: Every 5 minutes
```

### Optimize Cold Start

Add this to your `apps/server/src/index.ts`:
```typescript
// Warm-up endpoint
app.get('/ping', (req, res) => {
  res.send('pong');
});

// Faster startup
app.set('trust proxy', 1);
```

---

## 🔥 Quick Deploy Scripts

### Render.com (render.yaml)
```yaml
services:
  # Backend
  - type: web
    name: agentspace-backend
    env: node
    rootDir: apps/server
    buildCommand: npm install && npm run build
    startCommand: node dist/index.js
    plan: free
    healthCheckPath: /health
    envVars:
      - key: NODE_ENV
        value: production
      - key: GLM_API_KEY
        sync: false

  # Frontend
  - type: web
    name: agentspace-dashboard
    env: static
    rootDir: apps/dashboard
    buildCommand: npm install && npm run build
    staticPublishPath: dist
    plan: free
```

### Fly.io (fly.toml for backend)
```toml
app = "agentspace"
primary_region = "sin"

[build]
  [build.args]
    NODE_VERSION = "20"

[env]
  PORT = "8080"
  NODE_ENV = "production"

[[services]]
  internal_port = 8080
  protocol = "tcp"

  [[services.ports]]
    port = 80
    handlers = ["http"]

  [[services.ports]]
    port = 443
    handlers = ["tls", "http"]
```

---

## 🎯 Cost Comparison

| Platform | Monthly | Limitations | Best Use |
|----------|---------|-------------|----------|
| **Render** | $0 | Sleeps 15min | Development |
| **Fly.io** | $0 | 256MB RAM | Production |
| **Railway** | $5 credit | After credit used | Best features |
| **Koyeb** | $0 | 512MB RAM | Simple apps |
| **Replit** | $0 | Sleeps | Demos |
| **VPS (DigitalOcean)** | $4-6 | None | Full control |

---

## 🚨 Common FREE Tier Issues

### Issue 1: App Sleeping
**Solution:** Use UptimeRobot to keep it awake

### Issue 2: Slow Cold Start
**Solution:** 
- Optimize build size
- Use warm-up endpoint
- Accept 30s wake time

### Issue 3: Out of Memory
**Solution:**
- Optimize code
- Reduce dependencies
- Upgrade to paid tier

### Issue 4: Request Limits
**Solution:**
- Cache responses
- Optimize API calls
- Use CDN for static files

---

## ✅ Final Recommendation for FREE

### For AGENTSPACE:

**🥇 Best Overall: Render.com**
- FREE forever
- Easy setup
- WebSocket support
- Good for demos & small projects

**🥈 If Need Always-On: Fly.io**
- No sleep
- Better performance
- Slightly harder setup

**🥉 Quickest Setup: Replit**
- Import GitHub repo
- Click Run
- Done!

---

## 📝 Quick Start Commands

### Render.com (via render.yaml)
```bash
# Add render.yaml to root
# Push to GitHub
# Connect in Render dashboard
# Auto-deploy!
```

### Fly.io
```bash
curl -L https://fly.io/install.sh | sh
fly auth login
cd /home/daddybo/agentspace/apps/server
fly launch --now
```

### Replit
```bash
# Just import GitHub URL in browser:
https://replit.com/github/cornmankl/agentspace
```

---

## 🎉 Summary

**FREE Options Available:**
1. ✅ Render.com - 100% FREE
2. ✅ Fly.io - 100% FREE (better performance)
3. ✅ Koyeb - 100% FREE
4. ✅ Replit - 100% FREE
5. ✅ Cyclic.sh - 100% FREE (limited WebSocket)

**All support your AGENTSPACE app!**

**My Pick: Start with Render.com (easiest FREE option)**

Then upgrade to Fly.io or Railway if you need better performance.

---

**Ready to deploy for FREE? Choose Render.com and follow the guide above! 🚀**
