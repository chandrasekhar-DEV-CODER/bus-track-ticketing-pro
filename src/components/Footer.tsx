
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Github, Twitter, Linkedin } from 'lucide-react';
import SmartBusLogo from './ui/SmartBusLogo';

const Footer = () => {
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
            <div className="space-y-3">
              <div className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
                <Phone className="h-4 w-4 mr-3 flex-shrink-0" style={{ color: 'var(--accent-primary)' }} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
                <Mail className="h-4 w-4 mr-3 flex-shrink-0" style={{ color: 'var(--accent-primary)' }} />
                <span>support@smartbus.com</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
                <MapPin className="h-4 w-4 mr-3 flex-shrink-0" style={{ color: 'var(--accent-primary)' }} />
                <span>123 Transit Ave, Smart City</span>
              </div>
            </div>
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
          </div>
          
          {/* Support & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Connect</h3>
            <div className="space-y-3 mb-6">
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
