
const express = require('express');
const User = require('../models/User');
const College = require('../models/College');
const Route = require('../models/Route');
const Booking = require('../models/Booking');
const { authorize } = require('../middleware/auth');

const router = express.Router();

// Admin only routes
router.use(authorize('admin'));

// Dashboard stats
router.get('/dashboard', async (req, res) => {
  try {
    const [
      totalUsers,
      totalColleges,
      totalRoutes,
      totalBookings,
      recentBookings
    ] = await Promise.all([
      User.countDocuments({ isActive: true }),
      College.countDocuments({ isActive: true }),
      Route.countDocuments({ status: 'active' }),
      Booking.countDocuments(),
      Booking.find()
        .populate('userId', 'name email')
        .populate('routeId', 'name')
        .populate('collegeId', 'name')
        .sort({ createdAt: -1 })
        .limit(10)
    ]);

    const stats = {
      totalUsers,
      totalColleges,
      totalRoutes,
      totalBookings,
      recentBookings
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// User management
router.get('/users', async (req, res) => {
  try {
    const { page = 1, limit = 20, role, college } = req.query;
    
    let query = {};
    if (role) query.role = role;
    if (college) query.collegeId = college;

    const users = await User.find(query)
      .populate('collegeId', 'name code')
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await User.countDocuments(query);

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Toggle user status
router.patch('/users/:id/toggle-status', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.json({
      success: true,
      message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully`,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Analytics
router.get('/analytics', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    let dateFilter = {};
    if (startDate && endDate) {
      dateFilter = {
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        }
      };
    }

    const [
      bookingStats,
      revenueStats,
      popularRoutes
    ] = await Promise.all([
      Booking.aggregate([
        { $match: dateFilter },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            count: { $sum: 1 },
            revenue: { $sum: '$totalAmount' }
          }
        },
        { $sort: { _id: 1 } }
      ]),
      Booking.aggregate([
        { $match: dateFilter },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: '$totalAmount' },
            averageBookingValue: { $avg: '$totalAmount' }
          }
        }
      ]),
      Booking.aggregate([
        { $match: dateFilter },
        {
          $group: {
            _id: '$routeId',
            bookings: { $sum: 1 },
            revenue: { $sum: '$totalAmount' }
          }
        },
        { $sort: { bookings: -1 } },
        { $limit: 10 },
        {
          $lookup: {
            from: 'routes',
            localField: '_id',
            foreignField: '_id',
            as: 'route'
          }
        }
      ])
    ]);

    res.json({
      success: true,
      data: {
        bookingStats,
        revenueStats: revenueStats[0] || { totalRevenue: 0, averageBookingValue: 0 },
        popularRoutes
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
