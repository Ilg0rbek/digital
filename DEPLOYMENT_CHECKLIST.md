# Deployment Checklist

## Before Deployment

### 1. Stop All Local Instances
```bash
# Kill any running Node.js processes
pkill -f "node.*main.js"
# or
pkill -f "node.*app.js"
```

### 2. Check File Upload Limits
- ✅ Express body parser limit: 100MB
- ✅ Multer file size limit: 100MB
- ✅ Server configuration allows large uploads

### 3. Telegram Bot Configuration
- ✅ BOT_TOKEN is set in config/default.json
- ✅ TELEGRAM_CHANNEL_ID is configured
- ✅ Bot is added as admin to the channel

### 4. Database Configuration
- ✅ MongoDB connection string is correct
- ✅ Database is accessible from deployment server

## Deployment Steps

### 1. Upload Files
```bash
# Upload all files except node_modules and .git
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Environment Variables
```bash
# Make sure config/default.json has correct values
```

### 4. Start Server
```bash
node main.js
# or
npm start
```

## Common Issues & Solutions

### 1. Telegram Bot 409 Conflict
**Problem**: Multiple bot instances running
**Solution**: 
- Stop all local instances before deploying
- Use the restart script: `node restart-server.js`

### 2. File Upload 413 Error
**Problem**: File too large
**Solution**: 
- Check server file size limits
- Ensure Express and Multer limits are set to 100MB

### 3. JSON Parsing Error
**Problem**: Server returns HTML instead of JSON
**Solution**: 
- Check server error handling
- Ensure API routes return JSON responses

### 4. JavaScript Errors
**Problem**: DOM elements not found
**Solution**: 
- Check if elements exist before adding event listeners
- Use null checks in JavaScript

## Testing After Deployment

1. ✅ Test user registration/login
2. ✅ Test project submission with files
3. ✅ Test Telegram notifications
4. ✅ Test project approval/rejection
5. ✅ Test file uploads (various sizes)

## Monitoring

- Check server logs for errors
- Monitor Telegram bot status
- Test file upload functionality regularly 