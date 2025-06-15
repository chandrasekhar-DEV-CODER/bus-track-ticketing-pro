
const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'College name is required'],
    trim: true,
    maxlength: [100, 'College name cannot exceed 100 characters']
  },
  code: {
    type: String,
    required: [true, 'College code is required'],
    unique: true,
    uppercase: true,
    maxlength: [10, 'College code cannot exceed 10 characters']
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: {
      type: String,
      default: 'India'
    }
  },
  contact: {
    phone: String,
    email: String,
    website: String
  },
  branding: {
    logo: String,
    primaryColor: {
      type: String,
      default: '#3B82F6'
    },
    secondaryColor: {
      type: String,
      default: '#1E40AF'
    }
  },
  settings: {
    maxAdvanceBookingDays: {
      type: Number,
      default: 7
    },
    cancellationDeadlineHours: {
      type: Number,
      default: 2
    },
    defaultFare: {
      type: Number,
      default: 25
    }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('College', collegeSchema);
