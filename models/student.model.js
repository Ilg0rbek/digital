const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
  role: {
    type: String,
    enum: ['student', 'teacher', 'admin'],
    default: 'student'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
studentSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
studentSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
