const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/user.model');

exports.auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Avtorizatsiya talab qilinadi' });
    }

    const decoded = jwt.verify(token, config.get('JWT_SECRET'));
    
    // Find user and attach to request
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: 'Foydalanuvchi topilmadi' });
    }

    req.user = {
      _id: user._id,
      userId: user._id,
      email: user.email,
      role: user.role
    };
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ message: 'Avtorizatsiya talab qilinadi' });
  }
};

exports.checkTestAccess = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        message: 'Test ishlash uchun tizimga kiring',
        requireLogin: true 
      });
    }

    const decoded = jwt.verify(token, config.get('JWT_SECRET'));
    
    // Find user and attach to request
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: 'Foydalanuvchi topilmadi' });
    }

    req.user = {
      _id: user._id,
      userId: user._id,
      email: user.email,
      role: user.role
    };
    
    next();
  } catch (error) {
    res.status(401).json({ 
      message: 'Test ishlash uchun tizimga kiring',
      requireLogin: true 
    });
  }
};

exports.checkProjectAccess = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        message: 'Loyiha yuklash uchun tizimga kiring',
        requireLogin: true 
      });
    }

    const decoded = jwt.verify(token, config.get('JWT_SECRET'));
    
    // Find user and attach to request
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: 'Foydalanuvchi topilmadi' });
    }

    req.user = {
      _id: user._id,
      userId: user._id,
      email: user.email,
      role: user.role
    };
    
    next();
  } catch (error) {
    res.status(401).json({ 
      message: 'Loyiha yuklash uchun tizimga kiring',
      requireLogin: true 
    });
  }
};

exports.requireAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    
    if (!token) {
      // Store the original URL to redirect back after login
      req.session = req.session || {};
      req.session.returnTo = req.originalUrl;
      
      return res.redirect('/login?message=Bu sahifani ko\'rish uchun tizimga kiring');
    }

    const decoded = jwt.verify(token, config.get('JWT_SECRET'));
    if (!decoded) {
      return res.redirect('/login?message=Bu sahifani ko\'rish uchun tizimga kiring');
    }

    // Add user ID to request
    req.user = { 
      _id: decoded.userId,
      userId: decoded.userId 
    };
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.redirect('/login?message=Bu sahifani ko\'rish uchun tizimga kiring');
  }
}; 