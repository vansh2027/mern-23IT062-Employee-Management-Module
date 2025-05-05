const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide employee name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide employee email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  role: {
    type: String,
    required: [true, 'Please provide employee role'],
    enum: ['Manager', 'Developer', 'Designer', 'HR', 'Other']
  },
  profilePic: {
    type: String,
    default: 'default.jpg'
  },
  department: {
    type: String,
    required: [true, 'Please provide department']
  },
  joiningDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
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

module.exports = mongoose.model('Employee', employeeSchema); 