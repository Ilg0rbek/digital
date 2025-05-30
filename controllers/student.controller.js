const Student = require('../models/student.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateTokens = (studentId) => {
  const accessToken = jwt.sign(
    { id: studentId },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { id: studentId },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ 
        success: false,
        message: 'Bu email allaqachon ro\'yxatdan o\'tgan' 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = new Student({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    await student.save();

    const { accessToken, refreshToken } = generateTokens(student._id);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000 
    });

    res.status(201).json({
      success: true,
      message: 'Muvaffaqiyatli ro\'yxatdan o\'tildi',
      data: {
        student: {
          id: student._id,
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email
        },
        accessToken
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Ro\'yxatdan o\'tishda xatolik yuz berdi',
      error: error.message
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Foydalanuvchi topilmadi'
      });
    }

    const isPasswordValid = await bcrypt.compare(password, student.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Noto\'g\'ri parol'
      });
    }

    const { accessToken, refreshToken } = generateTokens(student._id);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    student.lastLogin = new Date();
    await student.save();

    res.json({
      success: true,
      message: 'Muvaffaqiyatli kirdingiz',
      data: {
        student: {
          id: student._id,
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email
        },
        accessToken
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Kirishda xatolik yuz berdi',
      error: error.message
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token topilmadi'
      });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    
    const student = await Student.findById(decoded.id);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Foydalanuvchi topilmadi'
      });
    }

    const tokens = generateTokens(student._id);

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json({
      success: true,
      message: 'Token yangilandi',
      data: {
        accessToken: tokens.accessToken
      }
    });

  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Yaroqsiz refresh token',
      error: error.message
    });
  }
};

const logout = async (req, res) => {
  try {
    // Clear refresh token cookie
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    });

    res.json({
      success: true,
      message: 'Muvaffaqiyatli chiqdingiz'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Chiqishda xatolik yuz berdi',
      error: error.message
    });
  }
};

module.exports = {
  register, login, refreshToken, logout
}