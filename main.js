const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index.routes");
const path = require("path");
const cookieParser = require("cookie-parser");
const { getUserForView } = require("./middleware/view.middleware");

const app = express();

// Set view engine
app.set("view engine", "ejs");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Add user data to all views
app.use(getUserForView);

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Routes
app.use("/", mainRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    message: 'Server xatosi', 
    error: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

const PORT = config.get("PORT") ?? 4000;
const BASE_URI = config.get("BASE_URI");

async function bootstrap() {
  try {
    await mongoose.connect(config.get("DB_URI"));
    console.log(`Connect to db successfully ✅`);
    
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port: ${PORT}`);
      console.log(`Base URL: ${BASE_URI}`);
    });
  } catch (error) {
    console.error('Server error:', error.message);
    process.exit(1);
  }
}

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

bootstrap();
