
# SmartBus Tracking & Ticketing System

A modern React application for college bus transportation management with real-time tracking, digital ticketing, and enhanced user experience.

## 🚀 Features

### Core Functionality
- **Real-time Bus Tracking** with live ETA predictions
- **Digital Ticketing System** with QR codes and secure payments
- **Smart Route Planning** with AI-powered suggestions
- **User Profile Management** with trip history and statistics
- **College-Specific Branding** and personalization

### Advanced Features
- **Dark/Light Theme** with accent color customization
- **Responsive Design** optimized for all devices
- **Offline Support** with service worker integration
- **Performance Optimized** with lazy loading and code splitting
- **Accessibility Compliant** with WCAG AA standards

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Routing**: React Router v6
- **State Management**: Context API with useReducer
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Testing**: Jest, React Testing Library
- **UI Components**: Shadcn/ui, Radix UI

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (buttons, cards, etc.)
│   └── ...             # Feature-specific components
├── contexts/           # React Context providers
├── hooks/              # Custom React hooks
├── pages/              # Route components
├── utils/              # Helper functions and utilities
├── __tests__/          # Test files
└── App.tsx            # Main application component
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Modern web browser with ES6+ support

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd smartbus-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run test         # Run unit tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

## 🏗️ Architecture Overview

### State Management
The application uses a centralized state management approach with React Context:

- **AppContext**: Global application state (user, college, booking data)
- **EnhancedThemeContext**: Theme and accent color management
- **Local State**: Component-specific state for UI interactions

### Performance Optimizations
- **Lazy Loading**: Route components are loaded on-demand
- **Code Splitting**: Bundle splitting for optimal loading
- **Memoization**: React.memo and useMemo for expensive components
- **Error Boundaries**: Graceful error handling and recovery

### College Integration
The app supports multi-college deployment with:
- Dynamic branding (colors, logos, contact info)
- College-specific routing and features
- Academic calendar integration
- Campus-aware notifications

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Structure
- **Unit Tests**: Individual component and hook testing
- **Integration Tests**: Feature workflow testing
- **Mock Data**: Consistent test data generators
- **Test Utilities**: Custom render functions with providers

### Writing Tests
```typescript
import { render, screen } from '../utils/testUtils';
import { createMockUser } from '../utils/testUtils';

test('should display user name', () => {
  const mockUser = createMockUser({ name: 'John Doe' });
  render(<UserProfile user={mockUser} />);
  expect(screen.getByText('John Doe')).toBeInTheDocument();
});
```

## 🎨 Theming & Customization

### Theme System
The app supports comprehensive theming:

```typescript
// Theme context usage
const { theme, accentColor, toggleTheme, setAccentColor } = useEnhancedTheme();

// College branding
const { state } = useApp();
const college = state.college;
```

### CSS Variables
Dynamic theming uses CSS variables:
```css
:root {
  --accent-primary: #EF4444;
  --accent-secondary: #F87171;
  --brand-primary: var(--college-primary);
}
```

### Responsive Design
Mobile-first approach with Tailwind breakpoints:
- `sm:` - 640px and up
- `md:` - 768px and up  
- `lg:` - 1024px and up
- `xl:` - 1280px and up

## 🔧 API Integration

### API Hooks
```typescript
// Using custom API hooks
const { routes, loading, error, fetchRoutes } = useBusRoutes();
const { createBooking, cancelBooking } = useBookingApi();

// Making API calls
useEffect(() => {
  fetchRoutes({ college: user.collegeId });
}, [user.collegeId]);
```

### Error Handling
Centralized error handling with:
- Global error boundary
- API error interceptors  
- User-friendly error messages
- Retry mechanisms

## 📱 PWA Features

### Service Worker
- Offline route caching
- Background sync for bookings
- Push notifications for bus updates

### App Manifest
- Install prompt for mobile users
- Custom app icons and splash screens
- Standalone app experience

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Environment Variables
Create `.env.local` for local development:
```
VITE_API_BASE_URL=https://api.smartbus.example.com
VITE_COLLEGE_ID=tech-university
```

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🤝 Contributing

### Development Workflow
1. Create feature branch from `main`
2. Make changes with tests
3. Run linting and type checks
4. Submit pull request with description

### Code Standards
- TypeScript strict mode enabled
- ESLint + Prettier for formatting
- Conventional commit messages
- 80%+ test coverage required

### Component Guidelines
- Use functional components with hooks
- Implement proper TypeScript interfaces
- Include JSDoc comments for complex logic
- Follow accessibility best practices

## 📋 Roadmap

### Upcoming Features
- [ ] Real-time WebSocket integration
- [ ] Advanced analytics dashboard  
- [ ] Multi-language support
- [ ] Native mobile app (React Native)
- [ ] Integration with campus ID systems

### Performance Targets
- [ ] Lighthouse score 95+
- [ ] First Contentful Paint < 2s
- [ ] Time to Interactive < 3s
- [ ] Bundle size < 500KB gzipped

## 📞 Support

For questions and support:
- **Documentation**: [Wiki](./docs)
- **Issues**: [GitHub Issues](./issues)
- **Discussions**: [GitHub Discussions](./discussions)

---

Built with ❤️ for modern campus transportation systems.
