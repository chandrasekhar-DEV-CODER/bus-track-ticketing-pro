
const express = require('express');
const User = require('../models/User');
const { authorize } = require('../middleware/auth');

const router = express.Router();

// Get current user profile
router.get('/profile', async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('collegeId');
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Update user profile
router.put('/profile', async (req, res) => {
  try {
    const allowedUpdates = ['name', 'phone', 'preferences'];
    const updates = {};
    
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updates,
      { new: true, runValidators: true }
    ).populate('collegeId');

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get user statistics
router.get('/profile/stats', async (req, res) => {
  try {
    const Booking = require('../models/Booking');
    
    const stats = await Booking.aggregate([
      { $match: { userId: req.user._id } },
      {
        $group: {
          _id: null,
          totalBookings: { $sum: 1 },
          totalSpent: { $sum: '$totalAmount' },
          completedTrips: {
            $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
          },
          cancelledBookings: {
            $sum: { $cond: [{ $eq: ['$status', 'cancelled'] }, 1, 0] }
          }
        }
      }
    ]);

    const userStats = stats[0] || {
      totalBookings: 0,
      totalSpent: 0,
      completedTrips: 0,
      cancelledBookings: 0
    };

    res.json({
      success: true,
      data: userStats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get all users (admin/organization only)
router.get('/', authorize('admin', 'organization'), async (req, res) => {
  try {
    let query = { isActive: true };
    
    // Filter by college for organization users
    if (req.user.role === 'organization') {
      query.collegeId = req.user.collegeId;
    }

    const users = await User.find(query)
      .populate('collegeId', 'name code')
      .select('-password')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
