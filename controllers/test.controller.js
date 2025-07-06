const Test = require('../models/test.model');
const jwt = require('jsonwebtoken');
const config = require('config');

// Test natijalarini saqlash
const submitTest = async (req, res) => {
  try {
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Test ishlash uchun tizimga kiring'
      });
    }

    const decoded = jwt.verify(token, config.get('JWT_SECRET'));
    const { testType, answers, totalScore } = req.body;

    // Test natijalarini saqlash (keyinchalik TestResult modeli yaratish mumkin)
    console.log('Test natijasi:', {
      userId: decoded.userId,
      testType,
      answers,
      totalScore,
      submittedAt: new Date()
    });

    res.json({
      success: true,
      message: 'Test natijasi muvaffaqiyatli saqlandi',
      data: {
        totalScore,
        testType
      }
    });
  } catch (error) {
    console.error('Test natijasini saqlashda xatolik:', error);
    res.status(500).json({
      success: false,
      message: 'Test natijasini saqlashda xatolik yuz berdi',
      error: error.message
    });
  }
};

module.exports = {
  submitTest
}; 