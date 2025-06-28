const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');

// Initialize Telegram bot service
require('./services/telegramBot');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'));

// Session configuration
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(flash());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
const indexRoutes = require('./routes/index.routes');
app.use('/', indexRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    
    // Check if this is an API request
    if (req.path.startsWith('/api/')) {
        return res.status(500).json({
            success: false,
            error: err.message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
    }
    
    // For non-API requests, render error page
    res.status(500).render('error', {
        title: 'Xatolik',
        message: err.message
    });
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
    res.status(404).json({
        success: false,
        error: 'API endpoint topilmadi'
    });
});

// 404 handler for other routes
app.use('*', (req, res) => {
    res.status(404).render('error', {
        title: 'Sahifa topilmadi',
        message: 'Siz qidirayotgan sahifa mavjud emas'
    });
});

module.exports = app; 