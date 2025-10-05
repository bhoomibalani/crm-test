# Railway Deployment Guide

## Prerequisites
1. Railway account (sign up at https://railway.app)
2. GitHub account (to connect your repository)

## Step 1: Prepare Your Repository

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - PHP backend for RD Company CRM"
   git branch -M main
   git remote add origin https://github.com/yourusername/rd-company-crm-backend.git
   git push -u origin main
   ```

## Step 2: Deploy to Railway

1. **Go to Railway Dashboard:**
   - Visit https://railway.app
   - Sign in with your GitHub account

2. **Create New Project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `rd-company-crm-backend` repository
   - Select the `php-backend` folder as the root directory

3. **Add MySQL Database:**
   - In your project dashboard, click "New"
   - Select "Database" → "MySQL"
   - Railway will automatically provision a MySQL database

4. **Configure Environment Variables:**
   - Go to your project settings
   - Add these environment variables:
     ```
     MYSQL_HOST=<provided by Railway>
     MYSQL_DATABASE=<provided by Railway>
     MYSQL_USER=<provided by Railway>
     MYSQL_PASSWORD=<provided by Railway>
     ```

## Step 3: Test Your Deployment

1. **Get your Railway URL:**
   - Railway will provide a URL like: `https://your-app-name.railway.app`

2. **Test the API endpoints:**
   ```bash
   # Test verify endpoint
   curl https://your-app-name.railway.app/api/verify.php
   
   # Test login endpoint
   curl -X POST https://your-app-name.railway.app/api/simple-login.php \
   -H "Content-Type: application/json" \
   -d '{"email":"admin@rdcompany.com","password":"password123"}'
   ```

## Step 4: Update Frontend Configuration

Update your React app's API configuration:

```javascript
// src/config/api.js
export const API_CONFIG = {
  BASE_URL: "https://your-app-name.railway.app",
  // ... rest of config
};
```

## Step 5: Database Setup

The database will be automatically created when the app starts, but you may need to run the setup script:

1. **Access Railway console:**
   - Go to your project dashboard
   - Click on your service
   - Go to "Deployments" tab
   - Click on the latest deployment
   - Open the console

2. **Run database setup:**
   ```bash
   php setup.php
   ```

## Troubleshooting

### Common Issues:

1. **Database Connection Error:**
   - Check that all MySQL environment variables are set correctly
   - Verify the database service is running

2. **CORS Issues:**
   - Update CORS headers in your API files to include your Railway domain
   - Or use Railway's proxy feature

3. **Build Failures:**
   - Check the build logs in Railway dashboard
   - Ensure all required files are in the repository

### Environment Variables Reference:

Railway provides these automatically for MySQL:
- `MYSQL_HOST`
- `MYSQL_DATABASE` 
- `MYSQL_USER`
- `MYSQL_PASSWORD`
- `MYSQL_URL` (connection string)

## Production Considerations:

1. **Security:**
   - Use strong passwords
   - Enable HTTPS (Railway provides this automatically)
   - Implement rate limiting

2. **Performance:**
   - Enable PHP OPcache
   - Use connection pooling
   - Implement caching

3. **Monitoring:**
   - Set up Railway's built-in monitoring
   - Add logging for API requests
   - Monitor database performance

