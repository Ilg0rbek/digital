const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Ism kiritish majburiy'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Familiya kiritish majburiy'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email kiritish majburiy'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Iltimos to\'g\'ri email kiriting']
  },
  password: {
    type: String,
    required: [true, 'Parol kiritish majburiy'],
    minlength: [6, 'Parol kamida 6 ta belgidan iborat bo\'lishi kerak']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
