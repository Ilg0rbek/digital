const jwt = require('jsonwebtoken');
const config = require('config');

exports.auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Avtorizatsiya talab qilinadi' });
    }

    const decoded = jwt.verify(token, config.get('JWT_SECRET'));
    req.user = decoded;
    next();
  } catch (error) {
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
    req.user = decoded;
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
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ 
      message: 'Loyiha yuklash uchun tizimga kiring',
      requireLogin: true 
    });
  }
}; 