const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/user.model');

exports.getUserForView = async (req, res, next) => {
  try {
    // Get token from cookie
    const token = req.cookies.token;
    
    if (token) {
      try {
        const decoded = jwt.verify(token, config.get('JWT_SECRET'));
        const user = await User.findById(decoded.userId).select('-password');
        
        if (user) {
          // Make user data available to all views
          res.locals.user = {
            id: user._id,
            firstname: user.firstName,
            lastname: user.lastName,
            email: user.email,
            role: user.role
          };
        }
      } catch (error) {
        console.error('Token verification error:', error);
        // Token is invalid, clear it
        res.clearCookie('token');
      }
    }
    next();
  } catch (error) {
    console.error('View middleware error:', error);
    next(error);
  }
}; 