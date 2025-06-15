
const express = require('express');
const College = require('../models/College');
const Route = require('../models/Route');
const { authorize } = require('../middleware/auth');

const router = express.Router();

// Get all colleges (admin only)
router.get('/', authorize('admin'), async (req, res) => {
  try {
    const colleges = await College.find({ isActive: true })
      .sort({ name: 1 });

    res.json({
      success: true,
      data: colleges
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get college by ID
router.get('/:id', async (req, res) => {
  try {
    const college = await College.findById(req.params.id);

    if (!college) {
      return res.status(404).json({
        success: false,
        message: 'College not found'
      });
    }

    // Check permissions
    if (req.user.role !== 'admin' && !college._id.equals(req.user.collegeId)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      data: college
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get college routes
router.get('/:id/routes', async (req, res) => {
  try {
    const collegeId = req.params.id;

    // Check permissions
    if (req.user.role !== 'admin' && req.user.collegeId.toString() !== collegeId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const routes = await Route.find({ 
      collegeId,
      status: 'active' 
    }).sort({ name: 1 });

    res.json({
      success: true,
      data: routes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Create college (admin only)
router.post('/', authorize('admin'), async (req, res) => {
  try {
    const college = new College(req.body);
    await college.save();

    res.status(201).json({
      success: true,
      message: 'College created successfully',
      data: college
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Update college
router.put('/:id', authorize('admin', 'organization'), async (req, res) => {
  try {
    const college = await College.findById(req.params.id);

    if (!college) {
      return res.status(404).json({
        success: false,
        message: 'College not found'
      });
    }

    // Check permissions
    if (req.user.role === 'organization' && !college._id.equals(req.user.collegeId)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    Object.assign(college, req.body);
    await college.save();

    res.json({
      success: true,
      message: 'College updated successfully',
      data: college
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
