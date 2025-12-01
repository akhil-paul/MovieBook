# 🚀 Deployment Guide for Render.com

This guide will help you deploy the MovieBook application to Render.com for **FREE**.

## 📋 Prerequisites

- GitHub account
- Render.com account (free - sign up at https://render.com)
- Your MovieBook code pushed to GitHub

---

## 🎯 Quick Deployment Steps

### 1️⃣ Push Code to GitHub

```bash
cd /home/akhil-paul/Projects/MovieBook

# Initialize git (if not done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Prepare for Render deployment"

# Add remote and push
git remote add origin https://github.com/YOUR_USERNAME/MovieBook.git
git branch -M main
git push -u origin main
```

---

### 2️⃣ Deploy PostgreSQL Database (Optional but Recommended)

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"PostgreSQL"**
3. Configure:
   - **Name**: `moviebook-db`
   - **Database**: `moviebook`
   - **Region**: Choose closest to you
   - **Instance Type**: **Free**
4. Click **"Create Database"**
5. **Copy the "Internal Database URL"** - you'll need this for the backend

---

### 3️⃣ Deploy Backend API

1. In Render Dashboard, click **"New +"** → **"Web Service"**
2. Connect your GitHub account and select **MovieBook** repository
3. Configure the service:

   ```
   Name: moviebook-backend
   Region: Same as your database
   Branch: main
   Runtime: Python 3
   
   Build Command:
   pip install -r backend/requirements.txt
   
   Start Command:
   cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT
   
   Instance Type: Free
   ```

4. **Add Environment Variables**:
   - Click **"Advanced"** → **"Add Environment Variable"**
   - Add the following:
     
     | Key | Value |
     |-----|-------|
     | `DATABASE_URL` | (Paste the Internal Database URL from Step 2) |
     | `ENVIRONMENT` | `production` |

5. Click **"Create Web Service"**
6. Wait 5-10 minutes for deployment
7. **Copy your backend URL**: `https://moviebook-backend.onrender.com`
8. Test it: Visit `https://moviebook-backend.onrender.com/docs`

---

### 4️⃣ Deploy Frontend

1. In Render Dashboard, click **"New +"** → **"Static Site"**
2. Select the same **MovieBook** repository
3. Configure the static site:

   ```
   Name: moviebook-frontend
   Branch: main
   
   Build Command:
   cd frontend && npm install && npm run build
   
   Publish Directory:
   frontend/dist
   ```

4. **Add Environment Variable**:
   - Click **"Advanced"** → **"Add Environment Variable"**
   - Add:
     
     | Key | Value |
     |-----|-------|
     | `VITE_API_URL` | `https://moviebook-backend.onrender.com` |
     
     (Use your actual backend URL from Step 3)

5. Click **"Create Static Site"**
6. Wait 5-10 minutes for deployment
7. **Copy your frontend URL**: `https://moviebook-frontend.onrender.com`

---

### 5️⃣ Update Backend CORS Settings

After frontend is deployed, update the CORS configuration:

1. Go to your backend service in Render Dashboard
2. Go to **"Environment"**
3. Update `main.py` in your code to include your frontend URL:

```python
allowed_origins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "https://moviebook-frontend.onrender.com",  # Your actual frontend URL
]
```

4. Commit and push the change - Render will auto-deploy

---

## ✅ Your App is Live!

**Your deployed URLs:**
- 🎬 **Frontend**: `https://moviebook-frontend.onrender.com`
- 🔧 **Backend API**: `https://moviebook-backend.onrender.com`
- 📚 **API Docs**: `https://moviebook-backend.onrender.com/docs`

**Admin Login:**
- Email: `admin@moviebooking.com`
- Password: `admin123`

---

## 📝 Important Notes

### Free Tier Limitations

1. **Cold Starts**: Services sleep after 15 minutes of inactivity
   - First request takes 30-60 seconds to wake up
   - Subsequent requests are fast
   
2. **Database**: 
   - PostgreSQL free tier is available for 90 days
   - After that, you can migrate to another free PostgreSQL provider

3. **Auto-deployment**: 
   - Every push to `main` branch triggers auto-deployment
   - You can disable this in Render settings

### Keeping Your Service Awake

Use a free service like [UptimeRobot](https://uptimerobot.com) to ping your backend every 14 minutes:
- Add Monitor → HTTP(s)
- URL: `https://moviebook-backend.onrender.com/health`
- Monitoring Interval: 14 minutes

---

## 🔧 Troubleshooting

### Backend won't start?
- Check logs in Render Dashboard
- Verify environment variables are set correctly
- Ensure `DATABASE_URL` is correct

### Frontend shows "Network Error"?
- Verify `VITE_API_URL` environment variable is set
- Check backend is running and accessible
- Look at browser console for CORS errors

### Database connection failed?
- Check `DATABASE_URL` is the **Internal Database URL**
- Ensure backend and database are in the same region

### Changes not reflecting?
- Render auto-deploys on git push
- Manually trigger deploy from Render Dashboard if needed
- Check build logs for errors

---

## 🎯 Next Steps

1. **Custom Domain** (Optional):
   - Add your own domain in Render settings
   - Free SSL certificate included

2. **Monitoring**:
   - Set up UptimeRobot for uptime monitoring
   - Use Render's built-in metrics

3. **Scaling** (If needed later):
   - Upgrade to paid tier for:
     - No cold starts
     - More resources
     - Persistent disk storage

---

## 💰 Cost Breakdown

| Service | Free Tier | Limitations |
|---------|-----------|-------------|
| Web Service (Backend) | ✅ 750 hrs/month | Sleeps after 15 min idle |
| Static Site (Frontend) | ✅ Unlimited | None |
| PostgreSQL | ✅ 90 days | 1GB storage |
| Total Cost | **$0/month** | Perfect for demos/portfolios |

---

## 📚 Additional Resources

- [Render Documentation](https://render.com/docs)
- [FastAPI Deployment Guide](https://fastapi.tiangolo.com/deployment/)
- [Vite Production Build](https://vitejs.dev/guide/build.html)

---

**Happy Deploying! 🚀**

If you encounter any issues, check Render's logs and documentation.

