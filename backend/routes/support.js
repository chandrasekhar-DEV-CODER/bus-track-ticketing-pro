
const express = require('express');
const { body, validationResult } = require('express-validator');
const { authorize } = require('../middleware/auth');

const router = express.Router();

// Mock support ticket storage (replace with proper database model)
let supportTickets = [];
let ticketCounter = 1;

// Validation middleware
const validateTicketCreation = [
  body('subject')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Subject must be between 5 and 200 characters'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high', 'urgent'])
    .withMessage('Priority must be one of: low, medium, high, urgent'),
];

// Create support ticket
router.post('/tickets', validateTicketCreation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { subject, message, priority = 'medium' } = req.body;

    const ticket = {
      id: ticketCounter++,
      subject,
      message,
      priority,
      status: 'open',
      userId: req.user._id,
      userName: req.user.name,
      userEmail: req.user.email,
      collegeId: req.user.collegeId,
      createdAt: new Date(),
      updatedAt: new Date(),
      responses: []
    };

    supportTickets.push(ticket);

    // Emit real-time notification to admins
    const io = req.app.get('io');
    io.to('admin-room').emit('new-support-ticket', {
      ticketId: ticket.id,
      subject: ticket.subject,
      priority: ticket.priority,
      userName: ticket.userName
    });

    res.status(201).json({
      success: true,
      message: 'Support ticket created successfully',
      data: ticket
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get user's support tickets
router.get('/tickets', async (req, res) => {
  try {
    let userTickets;

    if (req.user.role === 'admin') {
      // Admin can see all tickets
      userTickets = supportTickets;
    } else if (req.user.role === 'organization') {
      // Organization can see tickets from their college
      userTickets = supportTickets.filter(ticket => 
        ticket.collegeId && ticket.collegeId.toString() === req.user.collegeId.toString()
      );
    } else {
      // Students can only see their own tickets
      userTickets = supportTickets.filter(ticket => 
        ticket.userId.toString() === req.user._id.toString()
      );
    }

    // Sort by creation date (newest first)
    userTickets.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({
      success: true,
      data: userTickets
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get specific ticket
router.get('/tickets/:id', async (req, res) => {
  try {
    const ticketId = parseInt(req.params.id);
    const ticket = supportTickets.find(t => t.id === ticketId);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Support ticket not found'
      });
    }

    // Check permissions
    if (req.user.role === 'student' && ticket.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    if (req.user.role === 'organization' && 
        ticket.collegeId && ticket.collegeId.toString() !== req.user.collegeId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      data: ticket
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Update ticket (admin/organization only)
router.put('/tickets/:id', authorize('admin', 'organization'), [
  body('status')
    .optional()
    .isIn(['open', 'in-progress', 'resolved', 'closed'])
    .withMessage('Status must be one of: open, in-progress, resolved, closed'),
  body('response')
    .optional()
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Response must be between 10 and 2000 characters'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high', 'urgent'])
    .withMessage('Priority must be one of: low, medium, high, urgent'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const ticketId = parseInt(req.params.id);
    const ticket = supportTickets.find(t => t.id === ticketId);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Support ticket not found'
      });
    }

    // Check permissions for organization users
    if (req.user.role === 'organization' && 
        ticket.collegeId && ticket.collegeId.toString() !== req.user.collegeId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const { status, response, priority } = req.body;

    // Update ticket fields
    if (status) ticket.status = status;
    if (priority) ticket.priority = priority;
    ticket.updatedAt = new Date();

    // Add response if provided
    if (response) {
      ticket.responses.push({
        message: response,
        responderId: req.user._id,
        responderName: req.user.name,
        responderRole: req.user.role,
        timestamp: new Date()
      });
    }

    // Emit real-time notification to ticket creator
    const io = req.app.get('io');
    io.to(`user-${ticket.userId}`).emit('ticket-updated', {
      ticketId: ticket.id,
      status: ticket.status,
      hasNewResponse: !!response
    });

    res.json({
      success: true,
      message: 'Support ticket updated successfully',
      data: ticket
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Delete ticket (admin only)
router.delete('/tickets/:id', authorize('admin'), async (req, res) => {
  try {
    const ticketId = parseInt(req.params.id);
    const ticketIndex = supportTickets.findIndex(t => t.id === ticketId);

    if (ticketIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Support ticket not found'
      });
    }

    supportTickets.splice(ticketIndex, 1);

    res.json({
      success: true,
      message: 'Support ticket deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get support statistics (admin only)
router.get('/stats', authorize('admin'), async (req, res) => {
  try {
    const stats = {
      total: supportTickets.length,
      open: supportTickets.filter(t => t.status === 'open').length,
      inProgress: supportTickets.filter(t => t.status === 'in-progress').length,
      resolved: supportTickets.filter(t => t.status === 'resolved').length,
      closed: supportTickets.filter(t => t.status === 'closed').length,
      byPriority: {
        low: supportTickets.filter(t => t.priority === 'low').length,
        medium: supportTickets.filter(t => t.priority === 'medium').length,
        high: supportTickets.filter(t => t.priority === 'high').length,
        urgent: supportTickets.filter(t => t.priority === 'urgent').length,
      },
      avgResponseTime: '2.5 hours', // Mock data - calculate from actual response times
      satisfactionRate: '94%' // Mock data - from user feedback
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

module.exports = router;
