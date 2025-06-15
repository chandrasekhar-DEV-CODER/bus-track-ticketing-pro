
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  routeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Route',
    required: true
  },
  collegeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'College',
    required: true
  },
  bookingDate: {
    type: Date,
    required: true
  },
  travelDate: {
    type: Date,
    required: true
  },
  departureTime: {
    type: String,
    required: true
  },
  pickupStop: {
    name: String,
    coordinates: {
      lat: Number,
      lng: Number
    },
    order: Number
  },
  dropoffStop: {
    name: String,
    coordinates: {
      lat: Number,
      lng: Number
    },
    order: Number
  },
  seats: {
    type: Number,
    required: true,
    min: 1
  },
  fare: {
    type: Number,
    required: true,
    min: 0
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentId: String,
  status: {
    type: String,
    enum: ['confirmed', 'cancelled', 'completed', 'no-show'],
    default: 'confirmed'
  },
  qrCode: {
    type: String,
    required: true
  },
  cancellationReason: String,
  refundAmount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Generate booking ID before saving
bookingSchema.pre('save', function(next) {
  if (this.isNew && !this.bookingId) {
    this.bookingId = `BK${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);
