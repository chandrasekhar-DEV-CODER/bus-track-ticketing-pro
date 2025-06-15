
const mongoose = require('mongoose');

const stopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  coordinates: {
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    }
  },
  arrivalTime: String,
  order: {
    type: Number,
    required: true
  }
});

const routeSchema = new mongoose.Schema({
  routeId: {
    type: String,
    required: [true, 'Route ID is required'],
    unique: true
  },
  name: {
    type: String,
    required: [true, 'Route name is required']
  },
  collegeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'College',
    required: true
  },
  stops: [stopSchema],
  schedule: [{
    departureTime: {
      type: String,
      required: true
    },
    arrivalTime: {
      type: String,
      required: true
    },
    daysOfWeek: [{
      type: String,
      enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    }],
    isActive: {
      type: Boolean,
      default: true
    }
  }],
  busDetails: {
    busNumber: {
      type: String,
      required: true
    },
    capacity: {
      type: Number,
      required: true,
      min: 1
    },
    type: {
      type: String,
      enum: ['ac', 'non-ac', 'luxury'],
      default: 'non-ac'
    }
  },
  fare: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'maintenance'],
    default: 'active'
  },
  realTimeData: {
    currentLocation: {
      lat: Number,
      lng: Number
    },
    lastUpdated: Date,
    estimatedArrival: Date,
    occupancy: {
      type: Number,
      min: 0
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Route', routeSchema);
