
const express = require('express');
const Booking = require('../models/Booking');
const Route = require('../models/Route');
const { authorize } = require('../middleware/auth');

const router = express.Router();

// Create booking
router.post('/', async (req, res) => {
  try {
    const { routeId, travelDate, departureTime, pickupStop, dropoffStop, seats } = req.body;

    // Verify route exists and is active
    const route = await Route.findById(routeId);
    if (!route || route.status !== 'active') {
      return res.status(400).json({
        success: false,
        message: 'Route not available'
      });
    }

    // Check if user belongs to the same college as the route
    if (!route.collegeId.equals(req.user.collegeId)) {
      return res.status(403).json({
        success: false,
        message: 'You can only book routes from your college'
      });
    }

    // Calculate fare
    const totalAmount = route.fare * seats;

    // Generate QR code (simplified)
    const qrCode = `QR-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const booking = new Booking({
      userId: req.user._id,
      routeId,
      collegeId: req.user.collegeId,
      bookingDate: new Date(),
      travelDate: new Date(travelDate),
      departureTime,
      pickupStop,
      dropoffStop,
      seats,
      fare: route.fare,
      totalAmount,
      qrCode
    });

    await booking.save();

    // Populate the booking with route and user details
    await booking.populate(['routeId', 'userId']);

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get user bookings
router.get('/user/:userId?', async (req, res) => {
  try {
    const userId = req.params.userId || req.user._id;

    // Check permissions
    if (req.user.role === 'student' && userId !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    let query = { userId };
    
    // If organization user, limit to their college
    if (req.user.role === 'organization') {
      query.collegeId = req.user.collegeId;
    }

    const bookings = await Booking.find(query)
      .populate('routeId', 'name routeId busDetails')
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get booking by ID
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('routeId')
      .populate('userId', 'name email')
      .populate('collegeId', 'name');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check access permissions
    if (req.user.role === 'student' && !booking.userId.equals(req.user._id)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    if (req.user.role === 'organization' && !booking.collegeId.equals(req.user.collegeId)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Cancel booking
router.delete('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check permissions
    if (req.user.role === 'student' && !booking.userId.equals(req.user._id)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Check if booking can be cancelled
    if (booking.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Booking is already cancelled'
      });
    }

    if (booking.status === 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel completed booking'
      });
    }

    // Update booking status
    booking.status = 'cancelled';
    booking.cancellationReason = req.body.reason || 'User cancelled';
    
    // Calculate refund (simplified logic)
    const hoursUntilTravel = (booking.travelDate - new Date()) / (1000 * 60 * 60);
    if (hoursUntilTravel > 2) {
      booking.refundAmount = booking.totalAmount * 0.9; // 10% cancellation fee
    } else {
      booking.refundAmount = booking.totalAmount * 0.5; // 50% refund for late cancellation
    }

    await booking.save();

    res.json({
      success: true,
      message: 'Booking cancelled successfully',
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get all bookings (admin/organization)
router.get('/', authorize('admin', 'organization'), async (req, res) => {
  try {
    let query = {};
    
    // Filter by college for organization users
    if (req.user.role === 'organization') {
      query.collegeId = req.user.collegeId;
    }

    // Apply additional filters from query params
    if (req.query.status) {
      query.status = req.query.status;
    }
    
    if (req.query.date) {
      const date = new Date(req.query.date);
      query.travelDate = {
        $gte: new Date(date.setHours(0, 0, 0, 0)),
        $lt: new Date(date.setHours(23, 59, 59, 999))
      };
    }

    const bookings = await Booking.find(query)
      .populate('routeId', 'name routeId')
      .populate('userId', 'name email')
      .populate('collegeId', 'name')
      .sort({ createdAt: -1 })
      .limit(100);

    res.json({
      success: true,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
