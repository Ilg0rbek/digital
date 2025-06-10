const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const config = require('config');

// Register new user
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Bu email allaqachon ro\'yxatdan o\'tgan' });
    }

    // Create new user
    const user = new User({
      firstName,
      lastName,
      email,
      password
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      config.get('JWT_SECRET'),
      { expiresIn: config.get('JWT_EXPIRES_IN') }
    );

    res.status(201).json({
      message: 'Ro\'yxatdan o\'tish muvaffaqiyatli yakunlandi',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server xatosi', error: error.message });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Email yoki parol noto\'g\'ri' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email yoki parol noto\'g\'ri' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      config.get('JWT_SECRET'),
      { expiresIn: config.get('JWT_EXPIRES_IN') }
    );

    // Set token as cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    res.json({
      message: 'Kirish muvaffaqiyatli',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server xatosi', error: error.message });
  }
};

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .select('-password')
      .populate('projects');
    
    if (!user) {
      return res.status(404).json({ message: 'Foydalanuvchi topilmadi' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server xatosi', error: error.message });
  }
};

// Save test result
exports.saveTestResult = async (req, res) => {
  try {
    const { testType, score, answers } = req.body;
    const userId = req.user.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Foydalanuvchi topilmadi' });
    }

    user.testResults.push({
      testType,
      score,
      answers
    });

    await user.save();

    res.json({ message: 'Test natijasi saqlandi', testResult: user.testResults[user.testResults.length - 1] });
  } catch (error) {
    res.status(500).json({ message: 'Server xatosi', error: error.message });
  }
};

// Get user's test results
exports.getTestResults = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .select('testResults');
    
    if (!user) {
      return res.status(404).json({ message: 'Foydalanuvchi topilmadi' });
    }

    res.json(user.testResults);
  } catch (error) {
    res.status(500).json({ message: 'Server xatosi', error: error.message });
  }
};

// Add project to user
exports.addProject = async (req, res) => {
  try {
    const { projectId } = req.body;
    const userId = req.user.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Foydalanuvchi topilmadi' });
    }

    // Check if project already exists in user's projects
    if (user.projects.includes(projectId)) {
      return res.status(400).json({ message: 'Bu loyiha allaqachon qo\'shilgan' });
    }

    user.projects.push(projectId);
    await user.save();

    res.json({ message: 'Loyiha muvaffaqiyatli qo\'shildi' });
  } catch (error) {
    res.status(500).json({ message: 'Server xatosi', error: error.message });
  }
};

// Logout user
exports.logout = async (req, res) => {
  try {
    // Clear the token cookie
    res.clearCookie('token');
    
    res.json({
      message: 'Tizimdan chiqish muvaffaqiyatli',
      success: true
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Server xatosi', 
      error: error.message 
    });
  }
}; 