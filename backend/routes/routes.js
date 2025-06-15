
const express = require('express');
const Route = require('../models/Route');
const { authorize } = require('../middleware/auth');

const router = express.Router();

// Search routes
router.get('/search', async (req, res) => {
  try {
    const { collegeId, from, to, date } = req.query;
    
    let query = { status: 'active' };
    
    // Filter by college if user is not admin
    if (req.user.role !== 'admin') {
      query.collegeId = req.user.collegeId;
    } else if (collegeId) {
      query.collegeId = collegeId;
    }

    const routes = await Route.find(query)
      .populate('collegeId', 'name code')
      .sort({ createdAt: -1 });

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

// Get route by ID
router.get('/:id', async (req, res) => {
  try {
    const route = await Route.findById(req.params.id).populate('collegeId');
    
    if (!route) {
      return res.status(404).json({
        success: false,
        message: 'Route not found'
      });
    }

    // Check access permissions
    if (req.user.role !== 'admin' && !route.collegeId.equals(req.user.collegeId)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      data: route
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get live route data
router.get('/:id/live', async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);
    
    if (!route) {
      return res.status(404).json({
        success: false,
        message: 'Route not found'
      });
    }

    res.json({
      success: true,
      data: {
        routeId: route._id,
        currentLocation: route.realTimeData.currentLocation,
        lastUpdated: route.realTimeData.lastUpdated,
        estimatedArrival: route.realTimeData.estimatedArrival,
        occupancy: route.realTimeData.occupancy,
        status: route.status
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Create new route (admin/organization only)
router.post('/', authorize('admin', 'organization'), async (req, res) => {
  try {
    const routeData = {
      ...req.body,
      collegeId: req.user.role === 'admin' ? req.body.collegeId : req.user.collegeId
    };

    const route = new Route(routeData);
    await route.save();

    res.status(201).json({
      success: true,
      message: 'Route created successfully',
      data: route
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Update route
router.put('/:id', authorize('admin', 'organization'), async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);
    
    if (!route) {
      return res.status(404).json({
        success: false,
        message: 'Route not found'
      });
    }

    // Check permissions
    if (req.user.role !== 'admin' && !route.collegeId.equals(req.user.collegeId)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    Object.assign(route, req.body);
    await route.save();

    res.json({
      success: true,
      message: 'Route updated successfully',
      data: route
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Update real-time data
router.patch('/:id/live', authorize('admin', 'organization'), async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);
    
    if (!route) {
      return res.status(404).json({
        success: false,
        message: 'Route not found'
      });
    }

    route.realTimeData = {
      ...route.realTimeData,
      ...req.body,
      lastUpdated: new Date()
    };

    await route.save();

    // Emit real-time update to connected clients
    const io = req.app.get('io');
    io.to(`college-${route.collegeId}`).emit('bus-location', {
      routeId: route._id,
      ...route.realTimeData
    });

    res.json({
      success: true,
      message: 'Real-time data updated',
      data: route.realTimeData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
