
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const routeRoutes = require('./routes/routes');
const bookingRoutes = require('./routes/bookings');
const collegeRoutes = require('./routes/colleges');
const adminRoutes = require('./routes/admin');
const supportRoutes = require('./routes/support');

// Import middleware
const { authMiddleware } = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CORS_ORIGINS?.split(',') || ["http://localhost:5173", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }
});

// Rate limiting configurations
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  }
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 login attempts per windowMs
  message: {
    success: false,
    message: 'Too many login attempts, please try again later.'
  }
});

const bookingLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 3, // limit each IP to 3 booking attempts per minute
  message: {
    success: false,
    message: 'Too many booking attempts, please slow down.'
  }
});

// Middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

app.use(compression());

// Enhanced Morgan logging
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = process.env.CORS_ORIGINS?.split(',') || [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://your-domain.com'
    ];
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-College-ID']
};

app.use(cors(corsOptions));

// Apply rate limiting
app.use('/api/', generalLimiter);
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);
app.use('/api/bookings', bookingLimiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Database connection with better error handling
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/smartbus', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Set up database indexes for performance
    const collections = ['users', 'routes', 'bookings', 'colleges'];
    for (const collection of collections) {
      console.log(`Setting up indexes for ${collection}...`);
    }
    
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

connectDB();

// Handle MongoDB connection events
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Socket.io connection handling with enhanced features
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Join room based on user role/college
  socket.on('join-room', (data) => {
    console.log('User joining room:', data);
    
    if (data.collegeId) {
      socket.join(`college-${data.collegeId}`);
      console.log(`User ${socket.id} joined college room: college-${data.collegeId}`);
    }
    
    if (data.role === 'admin') {
      socket.join('admin-room');
      console.log(`Admin ${socket.id} joined admin room`);
    }
    
    if (data.userId) {
      socket.join(`user-${data.userId}`);
      console.log(`User ${socket.id} joined personal room: user-${data.userId}`);
    }
  });

  // Handle bus location updates
  socket.on('bus-location-update', (data) => {
    console.log('Bus location update:', data);
    
    // Broadcast to college room
    socket.to(`college-${data.collegeId}`).emit('bus-location', {
      routeId: data.routeId,
      location: data.location,
      timestamp: new Date(),
      speed: data.speed,
      direction: data.direction,
      nextStop: data.nextStop,
      estimatedArrival: data.estimatedArrival
    });
  });

  // Handle booking notifications
  socket.on('booking-created', (data) => {
    console.log('New booking created:', data);
    
    // Notify administrators
    socket.to('admin-room').emit('new-booking', data);
    
    // Notify college organization
    socket.to(`college-${data.collegeId}`).emit('booking-update', data);
  });

  // Handle support ticket updates
  socket.on('support-ticket', (data) => {
    console.log('Support ticket:', data);
    
    // Notify administrators
    socket.to('admin-room').emit('new-support-ticket', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });

  socket.on('error', (error) => {
    console.error('Socket error:', error);
  });
});

// Make io accessible to routes
app.set('io', io);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    version: process.env.npm_package_version || '1.0.0',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', authMiddleware, userRoutes);
app.use('/api/routes', routeRoutes); // Some routes might be public
app.use('/api/bookings', authMiddleware, bookingRoutes);
app.use('/api/colleges', collegeRoutes); // Some routes might be public
app.use('/api/admin', authMiddleware, adminRoutes);
app.use('/api/support', authMiddleware, supportRoutes);

// Catch 404 and forward to error handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Error handling middleware (should be last)
app.use(errorHandler);

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Process terminated');
    mongoose.connection.close();
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  server.close(() => {
    console.log('Process terminated');
    mongoose.connection.close();
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 CORS origins: ${process.env.CORS_ORIGINS || 'localhost origins'}`);
});

module.exports = { app, io };
