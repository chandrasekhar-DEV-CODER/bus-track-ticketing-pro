
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  CreditCard, 
  Bell, 
  Clock, 
  Shield, 
  Smartphone,
  Star,
  ArrowRight
} from 'lucide-react';

const LandingPage = () => {
  const features = [
    {
      icon: MapPin,
      title: 'Live Tracking',
      description: 'Track your bus in real-time with accurate ETA predictions'
    },
    {
      icon: CreditCard,
      title: 'Cashless Tickets',
      description: 'Book and pay for tickets digitally with secure QR codes'
    },
    {
      icon: Bell,
      title: 'Smart Alerts',
      description: 'Get notified about bus arrivals, delays, and route changes'
    },
    {
      icon: Clock,
      title: 'Schedule Management',
      description: 'View complete bus schedules and plan your journey'
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Safe and encrypted payment processing for all transactions'
    },
    {
      icon: Smartphone,
      title: 'Mobile Friendly',
      description: 'Access from any device with our responsive web app'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      text: 'SmartBus has made my daily commute so much easier. Love the real-time tracking!',
      rating: 5
    },
    {
      name: 'Mike Chen',
      text: 'The QR code ticketing system is brilliant. No more waiting in lines!',
      rating: 5
    },
    {
      name: 'Emily Davis',
      text: 'Finally, a bus system that works in the 21st century. Highly recommended!',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Smart Bus Tracking & 
                <span className="text-yellow-400"> Ticketing</span>
              </h1>
              <p className="text-xl mb-8 text-blue-100 leading-relaxed">
                Experience the future of public transportation with real-time tracking, 
                digital ticketing, and seamless journey planning.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/book"
                  className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                >
                  Book Ticket Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/track"
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-800 transition-all duration-300"
                >
                  Track Live Bus
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <div className="bg-white rounded-2xl p-6 shadow-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-800 font-semibold">Route 42A</h3>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      On Time
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-blue-600" />
                      <span className="text-sm">Central Station → Airport</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2 text-green-600" />
                      <span className="text-sm">ETA: 5 minutes</span>
                    </div>
                  </div>
                  <div className="mt-4 bg-blue-50 rounded-lg p-3">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>75%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full w-3/4"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose SmartBus?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience modern public transportation with cutting-edge technology 
              and user-friendly features designed for your convenience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied commuters who love SmartBus
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div className="font-semibold text-gray-900">
                  {testimonial.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Commute?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Join the SmartBus revolution and experience stress-free public transportation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Get Started Now
            </Link>
            <Link
              to="/track"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              Try Live Tracking
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-lg">SB</span>
                  </div>
                </div>
                <span className="text-2xl font-bold">SmartBus</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Revolutionizing public transportation with smart technology, 
                real-time tracking, and seamless user experience.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link to="/book" className="block text-gray-400 hover:text-white transition-colors">
                  Book Ticket
                </Link>
                <Link to="/track" className="block text-gray-400 hover:text-white transition-colors">
                  Track Bus
                </Link>
                <Link to="/tickets" className="block text-gray-400 hover:text-white transition-colors">
                  My Tickets
                </Link>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                  Help Center
                </a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SmartBus. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
