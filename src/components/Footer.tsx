import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Github, Twitter, Linkedin, User } from 'lucide-react';
import SmartBusLogo from './ui/SmartBusLogo';
import CollegeBranding from './CollegeBranding';
import { useEnhancedTheme } from '../contexts/EnhancedThemeContext';
import { useApp } from '../contexts/AppContext';

const Footer = () => {
  const { toggleTheme, theme } = useEnhancedTheme();
  const { state } = useApp();

  return (
    <footer className="glass-footer mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <SmartBusLogo size="md" className="mb-4" />
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md leading-relaxed">
              Revolutionizing public transportation with smart technology, 
              real-time tracking, and seamless user experience for modern commuters.
            </p>
            
            {/* College-specific info with enhanced branding */}
            <CollegeBranding variant="footer" showAlert={true} />
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Quick Links</h3>
            <div className="space-y-3">
              {[
                { name: 'Book Ticket', path: '/book-ticket' },
                { name: 'Track Bus', path: '/track-bus' },
                { name: 'My Tickets', path: '/my-tickets' },
                { name: 'Support', path: '/support' }
              ].map((link) => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  className="block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 hover-target focus-ring rounded"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            {/* College-specific links */}
            {state.college && (
              <div className="mt-6 pt-4 border-t border-white/20 dark:border-gray-700/50">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Campus Services</h4>
                <div className="space-y-2">
                  <a href="#" className="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    Campus Shuttle Map
                  </a>
                  <a href="#" className="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    Student Portal
                  </a>
                </div>
              </div>
            )}
          </div>
          
          {/* Profile & Settings */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Account</h3>
            <div className="space-y-3 mb-6">
              {state.user ? (
                <>
                  <Link 
                    to="/profile" 
                    className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 hover-target focus-ring rounded"
                  >
                    <User className="h-4 w-4 mr-2" />
                    My Profile
                  </Link>
                  <Link to="/my-tickets" className="block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 hover-target focus-ring rounded">
                    My Tickets
                  </Link>
                </>
              ) : (
                <Link to="/login" className="block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 hover-target focus-ring rounded">
                  Sign In
                </Link>
              )}
              <Link to="/support" className="block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 hover-target focus-ring rounded">
                Help Center
              </Link>
              <a href="#" className="block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 hover-target focus-ring rounded">
                Privacy Policy
              </a>
              <a href="#" className="block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 hover-target focus-ring rounded">
                Terms of Service
              </a>
            </div>
            
            {/* Theme Toggle */}
            <div className="mb-4">
              <button
                onClick={toggleTheme}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
              >
                <span className="text-sm">Theme:</span>
                <span className="text-lg">{theme === 'dark' ? '🌙' : '☀️'}</span>
              </button>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {[
                { icon: Github, href: '#', label: 'GitHub' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' }
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="glass rounded-lg p-2 text-gray-600 dark:text-gray-400 hover:text-white transition-all duration-200 hover-target focus-ring"
                  style={{
                    backgroundColor: 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 dark:border-gray-800/50 mt-8 pt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            &copy; 2024 SmartBus. All rights reserved. Built with ❤️ for modern commuters.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
