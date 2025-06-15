
# SmartBus Backend API

A comprehensive Node.js/Express/MongoDB backend for the SmartBus college transportation system with real-time features.

## Features

- **Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (Admin, Organization, Student)
  - Secure password hashing

- **Real-time Updates**
  - Socket.io integration for live bus tracking
  - Real-time notifications
  - Live occupancy updates

- **Core Functionality**
  - User management with college association
  - Route management and scheduling
  - Booking system with QR codes
  - College administration
  - Analytics and reporting

## Installation

1. Clone and navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start MongoDB (locally or use MongoDB Atlas)

5. Run the server:
```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/refresh` - Refresh token
- `POST /api/auth/logout` - Logout

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users/profile/stats` - Get user statistics
- `GET /api/users` - Get all users (admin/org)

### Routes
- `GET /api/routes/search` - Search routes
- `GET /api/routes/:id` - Get route details
- `GET /api/routes/:id/live` - Get live tracking data
- `POST /api/routes` - Create route (admin/org)
- `PUT /api/routes/:id` - Update route
- `PATCH /api/routes/:id/live` - Update real-time data

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/user/:userId` - Get user bookings
- `GET /api/bookings/:id` - Get booking details
- `DELETE /api/bookings/:id` - Cancel booking
- `GET /api/bookings` - Get all bookings (admin/org)

### Colleges
- `GET /api/colleges` - Get all colleges (admin)
- `GET /api/colleges/:id` - Get college details
- `GET /api/colleges/:id/routes` - Get college routes
- `POST /api/colleges` - Create college (admin)
- `PUT /api/colleges/:id` - Update college

### Admin
- `GET /api/admin/dashboard` - Dashboard statistics
- `GET /api/admin/users` - User management
- `PATCH /api/admin/users/:id/toggle-status` - Toggle user status
- `GET /api/admin/analytics` - Analytics data

## WebSocket Events

### Client to Server
- `join-room` - Join college/admin room
- `bus-location-update` - Update bus location (drivers)

### Server to Client
- `bus-location` - Real-time bus location updates

## Database Schema

### User
- Authentication and profile information
- Role-based permissions
- College association

### College
- Institution details
- Branding configuration
- Settings and preferences

### Route
- Route information and stops
- Schedule and timing
- Real-time tracking data
- Bus details

### Booking
- Booking details and status
- Payment information
- QR code generation

## Deployment

### Environment Variables
```env
MONGODB_URI=mongodb://localhost:27017/smartbus
JWT_SECRET=your-secret-key
PORT=5000
FRONTEND_URL=http://localhost:5173
```

### Production Deployment
1. Set up MongoDB Atlas or dedicated MongoDB server
2. Configure environment variables
3. Deploy to platforms like:
   - Heroku
   - Railway
   - DigitalOcean
   - AWS EC2

### Docker Deployment
```bash
# Build image
docker build -t smartbus-backend .

# Run container
docker run -p 5000:5000 --env-file .env smartbus-backend
```

## Security Features

- Helmet.js for security headers
- Rate limiting
- Input validation with Joi
- Password hashing with bcrypt
- JWT token authentication
- Role-based access control

## Testing

```bash
npm test
```

## API Documentation

Detailed API documentation is available at `/api/docs` when running in development mode.
